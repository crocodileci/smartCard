import {
  Component,
  OnInit,
  NgZone
} from '@angular/core';
import {
  OnsNavigator,
  Params
} from 'ngx-onsenui';
import {
  ChangePwdDetailComponent
} from '@app/changePwdDetail/changePwdDetail.component';
import * as ons from 'onsenui';
import { Subscription, fromEvent } from 'rxjs';

declare var hitrust: any;

@Component({
  selector: 'ons-page[changePwd]',
  templateUrl: './changePwd.component.html',
  styleUrls: ['./changePwd.component.scss']
})
export class ChangePwdComponent implements OnInit {

  /**
   * 卡片資訊
   */
  card_info = null;

  isShowKeyboard = false;
  pad_value;
  input_target="";

  old_pwd = "";
  new_pwd1 = "";
  new_pwd2 = "";

  /**
   * 讀卡機事件處理
   */
  readerattached_event: Subscription;
  readerdetached_event: Subscription;
  carddetached_event: Subscription;
  cardattached_event: Subscription;

  /**
   * 遮罩頁物件
   */
  pullOutModal;
  insertInModal;

  /**
   * Constructor
   */
  constructor(private navi: OnsNavigator, private _param: Params, private zone: NgZone) {
    this.card_info = _param.data;
  }

  /**
   * Initialize
   */
  ngOnInit() {
    //初始化遮罩頁
    this.pullOutModal = document.querySelector('ons-modal#showPullOut');
    this.insertInModal = document.querySelector('ons-modal#showInsertIn');
  }

  /**
   * Pop page
   */
  popPage() {
    this.navi.nativeElement.resetToPage(this.navi.nativeElement.page, {
      pop: "slide"
    });
  }

  pushChangeDetail() {

    //收起動態鍵盤
    this.isShowKeyboard = false;

    var alertOptions = {
      title: "",
      message: ""
    }

    if (this.old_pwd == "" || this.new_pwd1 == "" || this.new_pwd2 == ""){

      alertOptions.message = "輸入欄位不得為空";
      ons.notification.alert(alertOptions);

    } else if (this.old_pwd == this.new_pwd1) {

      alertOptions.message = '新舊密碼不得相同\n請重新輸入';
      ons.notification.alert(alertOptions);

    } else if (this.old_pwd.length < 6 || this.old_pwd.length > 12 ) {

      alertOptions.message = '卡片密碼長度有誤，請重新輸入';
      ons.notification.alert(alertOptions);

    }else if (this.new_pwd1.length < 6 || this.new_pwd1.length > 12 || this.new_pwd2.length < 6 || this.new_pwd2.length > 12) {

      alertOptions.message = '新密碼長度有誤，請重新輸入';
      ons.notification.alert(alertOptions);

    } else if (this.new_pwd1 != this.new_pwd2) {

      alertOptions.message = '兩次新密碼輸入不一致\n請確認後重新輸入';
      ons.notification.alert(alertOptions);

    } else {

      if (ons.isWebView()) {
        this.pullOutModal.show();
        this.registerEvent();
      } else {
        this.pullOutModal.show();
        setTimeout(() => {
          this.pullOutModal.hide();
          this.insertInModal.show();
          setTimeout(() => {
            this.insertInModal.hide();
            this.goToChangePwdDetailPage();
          }, 2000);

        }, 2000);
      }

    }
  }

  goToChangePwdDetailPage(){
    if (ons.isWebView()) {
      hitrust.plugins.cardReader.isCardExisted((isExisted) => {
        console.log(isExisted ? "Card existed" : "Card not existed");
        hitrust.plugins.cardReader.modifyPin(this.old_pwd, this.new_pwd1, (result: Boolean) => {
          this.navi.nativeElement.pushPage(ChangePwdDetailComponent, {
            data: {
              isSuccess: result //變更結果
            }
          });
        }, (error) => {

        });
      }, function (error) {
        console.log(error);
      })
    } else {
      this.navi.nativeElement.pushPage(ChangePwdDetailComponent, {
        data: {
          isSuccess: true //變更結果
        }
      });
    }
  }

  registerEvent() {
    this.readerdetached_event = fromEvent(window, 'readerdetached').subscribe(() => {
      console.log("readerdetached");

    });

    this.readerattached_event = fromEvent(window, 'readerattached').subscribe(() => {
      console.log("readerattached");
    });

    this.carddetached_event = fromEvent(window, 'carddetached').subscribe(() => {
      console.log("carddetached");
      this.pullOutModal.hide();
      this.insertInModal.show();
    });

    this.cardattached_event = fromEvent(window, 'cardattached').subscribe(() => {
      console.log("cardattached");
      this.insertInModal.hide();
      this.unregisterEvent();
      this.goToChangePwdDetailPage();
    });
  }

  unregisterEvent() {
    this.readerattached_event.unsubscribe();
    this.readerdetached_event.unsubscribe();
    this.carddetached_event.unsubscribe();
    this.cardattached_event.unsubscribe();
  }

  showNumKeyboard(e) {
    console.log("show keyboard");
    console.log(e);
    this.isShowKeyboard = true;
    
    //紀錄操作哪個input元件
    this.input_target = e;
    //初始化鍵盤的狀態
    this.pad_value = "";
    this[e] = "";
  }

  onClosekeyboardNum(e) {
    if (e) {
      this.isShowKeyboard = false;
    }
  }

  getkeyboardNumVal(e) {
    console.log(`getkeyboardNumVal: ${e}`)
    this.pad_value = e;

    //把結果塞回input變數中
    this.zone.run(() => {
      this[this.input_target] = e;
    });
  }

}
