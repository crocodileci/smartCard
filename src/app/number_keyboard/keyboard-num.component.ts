import { Component, OnInit, ElementRef, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ht-keyboard-num',
  templateUrl: './keyboard-num.component.html',
  styleUrls: ['./keyboard-num.component.scss']
})
export class HtKeyBoardNumComponent implements OnInit {

  @Output() resultValue = new EventEmitter();
  @Output() onCloseKeyboard = new EventEmitter();
  @Input() nowValue;
  @Input() keyboardOrder: any;
  document;
  isUppercase = false;

  constructor(private elementRef: ElementRef) {
    this.document = elementRef.nativeElement.ownerDocument;
  }

  ngOnInit() {
    if (this.keyboardOrder == undefined) {
      this.keyboardOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'delete','confirm'];
    }
    if (typeof this.keyboardOrder == 'string') {
      this.keyboardOrder = this.keyboardOrder.replace(/\s+/g,"").split(",");
    }
    setTimeout(() => {
      this.document.addEventListener('click', this.closeKeyboard, false);
    })
  }

  closeKeyboard = (e) => {
    let numKeyboardEle = this.elementRef.nativeElement.querySelector('#numKeyboard');
    // let inputNumKeyboardEle = this.document.querySelector('#inputNumKeyboard');
    if (!numKeyboardEle.contains(e.srcElement.parentElement)) {
      this.confirmClick();
    }
  }

  itemClick(e) {
    this.nowValue += e;
    this.resultValue.emit(this.nowValue);
  }

  delClick() {
    this.nowValue = this.nowValue.substring(0, this.nowValue.length - 1);
    this.resultValue.emit(this.nowValue);
  }

  confirmClick() {
    this.document.removeEventListener('click', this.closeKeyboard);
    this.onCloseKeyboard.emit(true);
  }



}
