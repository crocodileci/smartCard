import { Component, OnInit, ElementRef, Output, EventEmitter, Input, NgZone } from '@angular/core';

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
  @Input() isOpen = false;
  document;
  isUppercase = false;
  isKeyboardActive = false;

  constructor(private zone: NgZone, private elementRef: ElementRef) {
    this.document = elementRef.nativeElement.ownerDocument;
  }

  ngOnInit() {
    if (this.keyboardOrder == undefined) {
      this.keyboardOrder = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).concat(['', 0, 'delete', 'confirm']);
    }
    if (typeof this.keyboardOrder == 'string') {
      this.keyboardOrder = this.keyboardOrder.replace(/\s+/g, "").split(",");
    }
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  ngOnChanges(): void {

    if (this.isOpen) {
      this.openKeyboard();
    }
  }

  ngOnDestroy() {
    this.document.removeEventListener('click', this.closeKeyboard);
  }

  openKeyboard() {
    if(!this.isKeyboardActive){
      setTimeout(() => {
        this.isKeyboardActive = true;
        this.document.addEventListener('click', this.closeKeyboard, false);
        this.keyboardOrder = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).concat(['', 0, 'delete', 'confirm']);
      }, 0);
    }
    setTimeout(() => {
    })
  }

  closeKeyboard = (e) => {
    let numKeyboardEle = this.elementRef.nativeElement.querySelector('#numKeyboard');
    let inputKeyboardEle = document.getElementById("input_for_keyboard")
    // let inputNumKeyboardEle = this.document.querySelector('#inputNumKeyboard');
    if (!numKeyboardEle.contains(e.srcElement.parentElement) && e.srcElement.contains(inputKeyboardEle)) {
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
    this.zone.run(() => {
      this.isKeyboardActive = false;
    })
    setTimeout(() => {
      this.document.removeEventListener('click', this.closeKeyboard);
      this.onCloseKeyboard.emit(true);
      // this.isOpen = false;
    }, 500);
  }



}
