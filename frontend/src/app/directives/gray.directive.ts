import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appGray]'
})
export class GrayDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#817677'
  }

}
