import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';

import { ChangePwdComponent } from '@app/changePwd/changePwd.component';
import { InquiryComponent } from '@app/inquiry/inquiry.component';
import { TransComponent } from '@app/trans/trans.component';
import { detectChanges } from '@angular/core/src/render3';

interface CardInfo {
  mainAccount: string; //卡片中的主帳號
  account?: string;     //交易要使用的帳號,一卡多帳號會與sMainAccount不同
  accountIndex?: string;  //一卡多帳號中的index
  issueNo: string;     //卡片發行行,發行銀行代碼
  remark?: string;      //卡片中的註記欄位
}

@Component({
  selector: 'ons-page[tab1]',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss']
})

export class Tab1Component implements OnInit {
  /**
   * 卡片資訊
   */
  card_info: CardInfo = {
    mainAccount: "1234567890",
    issueNo: "006",
  }

  /**
   * 讀卡機是否存在
   */
  isReaderExisted = false;

  /**
   * 卡片是否存在
   */
  isCardExisted = false;

  /**
   * Constructor
   */
  constructor(private navi: OnsNavigator) { }


  /**
   * Initialize
   */
  ngOnInit() {

    this.checkReader();
    this.checkCard();

  }

  /**
   * 模擬讀卡機行為
   */
  detectReaderTime = 500;
  detectCardTime = 1000;

  checkReader(){
    setTimeout(() => {
      this.isReaderExisted = true;
    }, this.detectReaderTime);
  }

  checkCard(){
    setTimeout(() => {
      this.isCardExisted = true;
    }, this.detectCardTime);
  }

  /**
   * 變更密碼頁面
   */
  pushChangePwd() {
    this.navi.nativeElement.pushPage(ChangePwdComponent, {
      data: this.card_info
    });
  }

  /**
   * 跳轉至查詢餘額頁面
   */
  pushInquiry(){
    this.navi.nativeElement.pushPage(InquiryComponent, {
      data: this.card_info
    });
  }

  /**
   * 跳轉至轉帳作業頁面
   */
  pushTrans(){
    this.navi.nativeElement.pushPage(TransComponent, {
      data: this.card_info
    });
  }


  

}
