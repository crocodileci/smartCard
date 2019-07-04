import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';

import { ChangePwdComponent } from '@app/changePwd/changePwd.component';
import { InquiryComponent } from '@app/Inquiry/Inquiry.component';
import { TransComponent } from '@app/trans/trans.component';
import { detectChanges } from '@angular/core/src/render3';

@Component({
  selector: 'ons-page[tab1]',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss']
})
export class Tab1Component implements OnInit {
  isReaderExisted = false;
  isCardExisted = false;
  accountID = "1234567890";

  /**
   * Constructor
   */
  constructor(private navi: OnsNavigator) { }

  /**
   * Initialize
   */
  ngOnInit() {
    let detectReaderTime = 500;
    let detectCardTime = 1000;

    setTimeout(() => {
      this.isReaderExisted = true;
    }, detectReaderTime);

    setTimeout(() => {
      this.isCardExisted = true;
    }, detectCardTime);
  }

  /**
 * Push page
 */

  pushChangePwd() {
    this.navi.nativeElement.pushPage(ChangePwdComponent);
  }

  pushInquiry(){
    this.navi.nativeElement.pushPage(InquiryComponent);
  }

  pushTrans(){
    this.navi.nativeElement.pushPage(TransComponent);
  }


  

}
