import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OnsenModule } from 'ngx-onsenui';

import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { SideComponent } from './page1/side/side.component';
import { ContentComponent } from './page1/content/content.component';
import { Tab1Component } from './page1/content/tab1/tab1.component';
import { Tab2Component } from './page1/content/tab2/tab2.component';

import { ChangePwdComponent } from "./changePwd/changePwd.component";
import { InquiryComponent } from './inquiry/inquiry.component';
import { TransComponent } from './trans/trans.component';
import { ChangePwdDetailComponent } from './changePwdDetail/changePwdDetail.component';
import { TransConfirmComponent } from './transConfirm/transConfirm.component';
import { transConfirmDetailComponent } from './transConfirmDetail/transConfirmDetail.component';
import { InquiryDetailComponent } from './inquiryDetail/inquiryDetail.component';
import { HtKeyBoardNumComponent } from './number_keyboard/keyboard-num.component';

/**
 * Page components
 */
const pages = [
  HtKeyBoardNumComponent,
  Page1Component,
  Page2Component,
  ChangePwdComponent,
  ChangePwdDetailComponent,
  InquiryComponent,
  InquiryDetailComponent,
  TransComponent,
  TransConfirmComponent,
  transConfirmDetailComponent,
  SideComponent,
  ContentComponent,
  Tab1Component,
  Tab2Component,
];

@NgModule({
  declarations: [
    AppComponent,
    ...pages
  ],
  entryComponents: [
    ...pages
  ],
  imports: [
    BrowserModule,
    OnsenModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
