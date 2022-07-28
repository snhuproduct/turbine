import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'toboggan-ws-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements AfterViewInit {
  @Output() changeTitle = new EventEmitter<string>();
  @Input() returnHandle?: (hendle: CreateUserComponent) => void;

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngAfterViewInit(): void {
    // provide own handle to the hosting component
    if (this.returnHandle) {
      this.returnHandle(this);
    }
  }

  handleAddNewUserModalButton() {
    this.userForm.markAllAsTouched();
    return this.userForm.valid;
  }

  hasError(controlName: string) {
    const control = this.userForm.get(controlName);
    if (control) {
      return !control.valid && (control.dirty || control.touched);
    }
    return false;
  }

  getErrorMessage(controlName: string, friendlyName: string) {
    const control = this.userForm.get(controlName);
    if (control)
      if (control.hasError('required')) {
        return friendlyName + ' is required';
      } else if (control.hasError('email')) {
        return friendlyName + ' format is invalid';
      }
    return '';
  }
}
