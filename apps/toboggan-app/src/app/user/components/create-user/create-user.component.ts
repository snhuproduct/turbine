import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'toboggan-ws-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements AfterViewInit {
  @Input() returnHandle?: (hendle: CreateUserComponent) => void;

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
})

  constructor() {}

  ngAfterViewInit(): void {
        // provide own handle to the hosting component
        if(this.returnHandle){
            this.returnHandle(this);
        }
   }

   handleAddNewUserModalButton() {
        return this.userForm.valid;
    }

    hasRequiredError(controlName: string) {
        const control = this.userForm.get(controlName);
        if(control){
            return !control.valid && (control.dirty || control.touched);
        }
        return false;
    }
}
