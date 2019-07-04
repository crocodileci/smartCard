import { Component, OnInit } from '@angular/core';
import { OnsNavigator, Params } from 'ngx-onsenui';

interface TransData {
  issuerBankID: string;
  accountId: string;
  transBankID: string;
  transAccount: string;
  amount: string;
  tac: string;
}

@Component({
  selector: 'ons-page[transConfirmDetail]',
  templateUrl: './transConfirmDetail.component.html',
  styleUrls: ['./transConfirmDetail.component.scss']
})

export class transConfirmDetailComponent implements OnInit {
  account= {
    id:"1234567890",
    bankID:741
  }

  transData: TransData = null;
  

  /**
   * 轉入銀行別
   */
  transBankID = "006 合庫商銀";

  //轉出帳號
  trans_account = "";
  //卡片密碼
  card_pwd="";

  selectedModifier: string = '006 合庫商銀';

  /**
   * Constructor
   */
  constructor(private navi: OnsNavigator, private _params: Params) { }

  /**
   * Initialize
   */
  ngOnInit() {
    this.transData = this._params.data;
    console.log(this.transData);
  }

  /**
 * Pop page
 */
  backToMainPage() {
    // console.log("ChangePwdDetail backToMainPage");
    this.navi.nativeElement.resetToPage(this.navi.nativeElement.page, {
      pop: "slide"
    });
  }
}
