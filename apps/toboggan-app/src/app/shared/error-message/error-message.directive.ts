import { Directive, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[toboggan-ws-error-message]',
  exportAs: 'tbWsErrMsg'

})
export class ErrorMessageDirective {
  @Input() form?: FormGroup;
  @Input() controlName?: string;

  get control(): AbstractControl | null{
    if(this.form && this.controlName){
      return this.form.get(this.controlName);
    }
    return null;
  }

  get errorMessage(): string{
    const ctrl = this.control;
    if(ctrl && !ctrl.valid){
      if (ctrl.hasError('required')) {
        return 'This field can\'t be empty';
      } else if (ctrl.hasError('pattern')) {
        return 'Contains invalid character(s)';
      } else if (ctrl.hasError('email')) {
        return 'Check email format';
      } else {
        console.log(ctrl.errors);
      }
    }
    return '';
  }

  get hasError(): boolean {
    const ctrl = this.control;
    if (ctrl) {
        return !ctrl.valid && (ctrl.dirty || ctrl.touched);
    }
    return false;
  }

}
