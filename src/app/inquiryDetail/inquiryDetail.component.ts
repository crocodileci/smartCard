import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';

@Component({
  selector: 'ons-page[inquiryDetail]',
  templateUrl: './inquiryDetail.component.html',
  styleUrls: ['./inquiryDetail.component.scss']
})
export class InquiryDetailComponent implements OnInit {
  response;

  /**
   * Constructor
   */
  constructor(private navi: OnsNavigator) { }

  /**
   * Initialize
   */
  ngOnInit() {
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
