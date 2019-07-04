import {
  Component,
  OnInit
} from '@angular/core';
import {
  OnsNavigator,
  Params
} from 'ngx-onsenui';

@Component({
  selector: 'ons-page[changePwdDetail]',
  templateUrl: './changePwdDetail.component.html',
  styleUrls: ['./changePwdDetail.component.scss']
})
export class ChangePwdDetailComponent implements OnInit {
  changePwdSuccess = true;

  /**
   * Constructor
   */
  constructor(private navi: OnsNavigator, private _params: Params) {}

  /**
   * Initialize
   */
  ngOnInit() {
    this.changePwdSuccess = this._params.data.isSuccess;
    console.log(this.navi.nativeElement);
    console.log(this.navi.nativeElement.page);
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
