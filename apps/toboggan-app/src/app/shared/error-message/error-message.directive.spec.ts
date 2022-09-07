import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPattern } from '@toboggan-ws/toboggan-constants';
import { ErrorMessageDirective } from './error-message.directive';

describe('ErrorMessageDirective', () => {
  it('should create an instance', () => {
    const directive = new ErrorMessageDirective();
    expect(directive).toBeTruthy();
  });

  it('hasError should return false if control name is not found in the form', () => {
    const directive = new ErrorMessageDirective();
    directive.form = new FormGroup({
      firstName: new FormControl('', [ Validators.required, 
        Validators.pattern(ValidatorPattern.nameValidation)]),
    });
    directive.controlName = 'nonExistingControlName';
    expect(directive.hasError).toBeFalsy();
  })

  it('for invalid email adddress getError should return appropriate message', () => {
    const directive = new ErrorMessageDirective();
    directive.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    directive.controlName = 'email';
    directive.form.setValue({
      'email': 'invalidemail'
    });
    expect(directive.errorMessage).toEqual('Check email format');
  })

  it('when control is valid getError should return empty string', () => {
    const directive = new ErrorMessageDirective();
    directive.form = new FormGroup({
      firstName: new FormControl('', [ Validators.required, 
        Validators.pattern(ValidatorPattern.nameValidation)]),
    });
    directive.controlName = 'firstName';
    directive.form.setValue({
      'firstName': 'John'
    });
    expect(directive.errorMessage).toEqual('');
  })

  it('when required control is empty should return appropriate error message', () => {
    const directive = new ErrorMessageDirective();
    directive.form = new FormGroup({
      firstName: new FormControl('', [ Validators.required, 
        Validators.pattern(ValidatorPattern.nameValidation)]),
    });
    directive.controlName = 'firstName';
    directive.form.setValue({
      'firstName': ''
    });
    expect(directive.errorMessage).toEqual('This field can\'t be empty');
  })

  it('when field does not follow validation pattern should return appropriate error message', () => {
    const directive = new ErrorMessageDirective();
    directive.form = new FormGroup({
      firstName: new FormControl('', [ Validators.required, 
        Validators.pattern(ValidatorPattern.nameValidation)]),
    });
    directive.controlName = 'firstName';
    directive.form.setValue({
      'firstName': 'abd&1'
    });
    expect(directive.errorMessage).toEqual('Contains invalid character(s)');
  })
});
