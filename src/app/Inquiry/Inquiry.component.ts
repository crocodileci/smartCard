import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';

@Component({
  selector: 'ons-page[Inquiry]',
  templateUrl: './Inquiry.component.html',
  styleUrls: ['./Inquiry.component.scss']
})
export class InquiryComponent implements OnInit {

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
  popPage() {
    this.navi.nativeElement.popPage();
  }

}
