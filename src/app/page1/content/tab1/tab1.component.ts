import { Component, OnInit, NgZone } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';

import { ChangePwdComponent } from '@app/changePwd/changePwd.component';
import { InquiryComponent } from '@app/inquiry/inquiry.component';
import { TransComponent } from '@app/trans/trans.component';
import { detectChanges } from '@angular/core/src/render3';
import * as ons from 'onsenui';
import { fromEvent, Subscription } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';
import { CardInfo } from '@app/model/CardInfo';

declare var hitrust:any;

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
    issuer: {
      value: "00600000",
      label: "006 合庫商銀"
    },
    mainAccount: "1234567890"
  };

  /**
   * 讀卡機事件處理
   */
  readerattached_event: Subscription;
  readerdetached_event: Subscription;
  carddetached_event: Subscription;
  cardattached_event: Subscription;
  

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
  constructor(private navi: OnsNavigator, private zone: NgZone) { }


  /**
   * Initialize
   */
  ngOnInit() {
    if(ons.isWebView()){
      ons.ready(() => {
        // deviceready event is fired
        // Call whatever Cordova APIs
        console.log("cordova ready");

        hitrust.plugins.cardReader.isReaderExisted((isExisted)=>{
          console.log(isExisted ? "Reader existed" : "Reader not existed");
          this.zone.run(()=>{
            this.isReaderExisted = isExisted;
          })

          hitrust.plugins.cardReader.isCardExisted((isExisted) => {
            console.log(isExisted ? "Card existed" : "Card not existed");
            if (isExisted) {
              this.zone.run(() => {
                this.readAccount();
                this.isCardExisted = isExisted;
              });
            }
          }, function(error){
            console.log(error);
          })

          this.registerEvent();
        }, function(error){console.log(error)});
      });
    }else{
      this.card_info.issuer.value = this.card_info.issuer.value.substring(0, 3);
      this.checkReader();
      this.checkCard();
    }

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
    if (ons.isWebView()) {
      this.unregisterEvent();
    }
    this.navi.nativeElement.pushPage(ChangePwdComponent, {
      data: this.card_info
    });
  }

  /**
   * 跳轉至查詢餘額頁面
   */
  pushInquiry(){
    if (ons.isWebView()) {
      this.unregisterEvent();
    }
    this.navi.nativeElement.pushPage(InquiryComponent, {
      data: this.card_info
    });
  }

  /**
   * 跳轉至轉帳作業頁面
   */
  pushTrans(){
    if (ons.isWebView()) {
      this.unregisterEvent();
    }
    this.navi.nativeElement.pushPage(TransComponent, {
      data: this.card_info
    });
  }

  registerEvent(){
    this.readerdetached_event = fromEvent(window, 'readerdetached').subscribe(()=>{
      console.log("readerdetached");
      this.zone.run(() => {
        this.isReaderExisted = false;
      });
    });

    this.readerattached_event = fromEvent(window, 'readerattached').subscribe(()=>{
      console.log("readerattached");
      this.zone.run(() => {
        this.isReaderExisted = true;
      });
    });

    this.carddetached_event = fromEvent(window, 'carddetached').subscribe(()=>{
      console.log("carddetached");
      this.zone.run(() => {
        this.isCardExisted = false;
      });
    });

    this.cardattached_event = fromEvent(window, 'cardattached').subscribe(()=>{
      console.log("cardattached");
      this.zone.run(() => {
        this.isCardExisted = true;
        this.readAccount();
      });
    });
  }

  unregisterEvent(){
    this.readerattached_event.unsubscribe();
    this.readerdetached_event.unsubscribe();
    this.carddetached_event.unsubscribe();
    this.cardattached_event.unsubscribe();
  }

  readAccount(){
    hitrust.plugins.cardReader.getCardInfo((cardInfo: any)=>{
      console.log("readAccount");
      console.log("cardInfo: " + cardInfo);

      //修改card model
      // card_info: CardInfo = {
      //   issuer: "",
      //   mainAccount: ""
      // };
      this.zone.run(() => {
        this.card_info.issuer.value = cardInfo.issuer.substring(0, 3);
        this.card_info.mainAccount = cardInfo.mainAccount;
      });
    })
  }




  

}
