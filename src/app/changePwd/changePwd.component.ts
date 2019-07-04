import {
  Component,
  OnInit
} from '@angular/core';
import {
  OnsNavigator
} from 'ngx-onsenui';
import {
  ChangePwdDetailComponent
} from '@app/changePwdDetail/changePwdDetail.component';

@Component({
  selector: 'ons-page[changePwd]',
  templateUrl: './changePwd.component.html',
  styleUrls: ['./changePwd.component.scss']
})
export class ChangePwdComponent implements OnInit {
  olg_pwd = "";
  new_pwd1 = "";
  new_pwd2 = "";

  /**
   * Constructor
   */
  constructor(private navi: OnsNavigator) {}

  /**
   * Initialize
   */
  ngOnInit() {}

  /**
   * Pop page
   */
  popPage() {
    this.navi.nativeElement.popPage();
  }

  pushChangeDetail() {
    this.navi.nativeElement.pushPage(ChangePwdDetailComponent, {
      data: {
        isSuccess: true //變更結果
      }
    });
  }

}
