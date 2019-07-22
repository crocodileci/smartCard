import { Component, OnInit } from '@angular/core';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { TransData } from '@app/model/CardInfo';

@Component({
  selector: 'ons-page[inquiryDetail]',
  templateUrl: './inquiryDetail.component.html',
  styleUrls: ['./inquiryDetail.component.scss']
})
export class InquiryDetailComponent implements OnInit {
  response;

  transData: TransData = null;

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
