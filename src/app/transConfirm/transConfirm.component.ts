import { Component, OnInit } from '@angular/core';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { transConfirmDetailComponent } from '@app/transConfirmDetail/transConfirmDetail.component';
import { TransData } from '@app/model/CardInfo';
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
    let service = this.handshakeService.serverURL + this.handshakeService.communicateServiceName;
    this.http.post<any>(service, this.transData).subscribe(res =>{
      console.log(res);
      this.response = this.transData;
      this.navi.nativeElement.pushPage(transConfirmDetailComponent, { data: this.response });
    });
  }
}
