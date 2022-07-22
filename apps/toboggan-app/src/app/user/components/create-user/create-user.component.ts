import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'toboggan-ws-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements AfterViewInit {
  @Output() changeTitle = new EventEmitter<string>();
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
        this.changeTitle.emit("I changed title");
   }

   handleAddNewUserModalButton() {
        this.userForm.markAllAsTouched();
        return this.userForm.valid;
    }

    hasRequiredError(controlName: string) {
        console.log('has required error', controlName);
        const control = this.userForm.get(controlName);
        if(control){
            return !control.valid && (control.dirty || control.touched);
        }
        return false;
    }
}
