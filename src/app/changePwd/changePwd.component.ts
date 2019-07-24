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
   * Constructor
   */
  constructor(private navi: OnsNavigator, private _param: Params, private zone: NgZone) {
    this.card_info = _param.data;
  }

  /**
   * Initialize
   */
  ngOnInit() {}

  /**
   * Pop page
   */
  popPage() {
    this.navi.nativeElement.resetToPage(this.navi.nativeElement.page, {
      pop: "slide"
    });
  }

  pushChangeDetail() {

    var alertOptions = {
      title: "",
      message: ""
    }

    if (this.old_pwd == this.new_pwd1) {

      alertOptions.message = '新舊密碼不得相同\n請重新輸入';
      ons.notification.alert(alertOptions);

    } else if (this.new_pwd1 != this.new_pwd2) {

      alertOptions.message = '兩次新密碼輸入不一致\n請確認後重新輸入';
      ons.notification.alert(alertOptions);

    } else {

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
