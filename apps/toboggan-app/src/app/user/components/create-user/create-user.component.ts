import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterstitialLoaderType } from '@snhuproduct/toboggan-ui-components-library';
import { IUser } from '@toboggan-ws/toboggan-common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'toboggan-ws-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements AfterViewInit {
  @Output() changeTitle = new EventEmitter<string>();
  @Input() returnHandle?: (hendle: CreateUserComponent) => void;
  
  isLoading = false;
  loaderType = InterstitialLoaderType

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required), 
    email: new FormControl('', [ Validators.required, Validators.email]),
})

  constructor(public userService: UserService) {

  }

  ngAfterViewInit(): void {
        // provide own handle to the hosting component
        if(this.returnHandle){
            this.returnHandle(this);
        }
   }

   async handleAddNewUserModalButton() {
        const delay = (ms: number) => {
          return new Promise( resolve => setTimeout(resolve, ms) );
        }    
        this.userForm.markAllAsTouched();
        if(this.userForm.valid){
          try{
            const userObj: IUser = this.userForm.getRawValue(); 
            this.isLoading = true;
            await delay(5000); // add delay to demo loader
            await this.userService.createUser(userObj);
            console.log('User created');
            return true;
          }
          catch(error) {
            console.log('Failed creating user', error);
            return false;
          }
          finally{
            this.isLoading = false;
          }
        }
        else{
          // don't close modal 
          return false;
        }
    }

    hasError(controlName: string){
      const control = this.userForm.get(controlName);
      if(control){
        return !control.valid && (control.dirty || control.touched);
      }
      return false;
    }

    getErrorMessage(controlName: string, friendlyName: string){
      const control = this.userForm.get(controlName);
      if(control)
        if(control.hasError('required')){
          return friendlyName + ' is required';
        }
        else if(control.hasError('email')){
          return friendlyName + ' format is invalid';
        }
        return '';
      }     
      
  }
