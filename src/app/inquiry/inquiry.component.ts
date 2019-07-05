import {
  Component,
  OnInit
} from '@angular/core';
import {
  OnsNavigator, Params
} from 'ngx-onsenui';
import { InquiryDetailComponent } from '@app/inquiryDetail/inquiryDetail.component';

@Component({
  selector: 'ons-page[inquiry]',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss']
})
export class InquiryComponent implements OnInit {

  isShowKeyboard = false;

  /**
   * 卡片資訊
   */
  card_info = {
    id: "123",
    issuer: "006"
  }

  /**
   * 卡片密碼
   */
  card_pwd = "";

  /**
   * Constructor
   */
  constructor(private navi: OnsNavigator, private _param: Params) {
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
    this.navi.nativeElement.popPage();
  }

  inquiryProcess() {
    this.navi.nativeElement.pushPage(InquiryDetailComponent, {
      data: {
        isSuccess: true //變更結果
      }
    });
  }

  showNumKeyboard(){
    console.log("show keyboard");
    this.isShowKeyboard = true;
    this.card_pwd = "";
  }

  onClosekeyboardNum(e) {
    if (e) {
      this.isShowKeyboard = false;
    }
  }

  getkeyboardNumVal(e) {
    this.card_pwd = e;
  }

}
