import { Directive } from '@angular/core';

@Directive({
  selector: '[appUpperCase]',
  standalone: true
})
export class UpperCaseDirective {

  constructor() { }

}
