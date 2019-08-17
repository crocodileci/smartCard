import { Component, OnInit } from '@angular/core';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { transConfirmDetailComponent } from '@app/transConfirmDetail/transConfirmDetail.component';
import { TransData, TransTelegramData, TransTelegramResponseData } from '@app/model/CardInfo';
import { HttpClient } from '@angular/common/http';
import { HandShakeServiceService } from '@app/services/handshake/hand-shake-service.service';

@Component({
  selector: 'ons-page[transConfirm]',
  templateUrl: './transConfirm.component.html',
  styleUrls: ['./transConfirm.component.scss']
})

export class TransConfirmComponent implements OnInit {
  account= {
    id:"1234567890",
    bankID:741
  }

  transData: TransData = null;

  transTelegramData: TransTelegramData;

  /**
   * 回覆電文
   */
  response = {};
  

  /**
   * 轉入銀行別
   */
  transBankID = "006 合庫商銀";

  //轉出帳號
  trans_account = "";
  //卡片密碼
  card_pwd="";

  /**
   * Constructor
   */
  constructor(private navi: OnsNavigator, private _params: Params, private http:HttpClient, private handshakeService:HandShakeServiceService) { }

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
  popPage() {
    this.navi.nativeElement.popPage();
  }

  pushTransDetail(){
    console.log("pushTransDetail");

    this.transTelegramData = this.getTransTelegram(this.transData);

    let service = this.handshakeService.serverURL + this.handshakeService.communicateServiceName;
    this.http.post<TransTelegramResponseData>(service, this.transTelegramData).subscribe(res =>{
      console.log(res);
      this.transData.returnCode = res.errorCode.toString();
      this.transData.transResult = res.result;
      this.response = this.transData;
      this.navi.nativeElement.pushPage(transConfirmDetailComponent, { data: this.response });
    });
  }

  getTransTelegram(transData: TransData): TransTelegramData{

    let transTelegram:TransTelegramData = {};

    transTelegram.tx_code = "2524";
    transTelegram.issuer_account = transData.issuerAccount;
    transTelegram.issuer_id = (transData.issuerBank.value + "00000000000000").substring(0, 8);
    transTelegram.issuer_remark = "transTelegram";

    let trans_in_account = ("00000000000000" + transData.transAccount);
    console.log(`trans_in_account ${trans_in_account}`);
    transTelegram.trans_in_account = trans_in_account.substring(trans_in_account.length - 16, trans_in_account.length);

    transTelegram.trans_in_bank = (transData.transBank.value + "00000000000000").substring(0, 8);

    let trans_out_amount = ("00000000000000" + transData.amount);
    console.log(`trans_out_amount ${trans_out_amount}`);
    transTelegram.trans_out_amount = trans_out_amount.substring(trans_out_amount.length - 14, trans_out_amount.length);
    transTelegram.atm_checkcode = "";
    transTelegram.icc_no = transData.serial;
    transTelegram.tsac = transData.tac;

    return transTelegram;

  }
}
