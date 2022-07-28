import { Component } from '@angular/core';
import { ModalButtonConfig } from "@snhuproduct/toboggan-ui-components-library";
import { CreateUserComponent } from '../../components/create-user/create-user.component';

@Component({
  selector: 'toboggan-ws-user-main-page',
  templateUrl: './user-main-page.component.html',
  styleUrls: ['./user-main-page.component.scss'],
})
export class UserMainPageComponent {
  createUserDialogTitle = "Add New User";  

  createUserComponent?: CreateUserComponent;
  createUserModalButtonsConfig: ModalButtonConfig[] = [
    {
        title: 'Cancel',
        onClick: async () => this.handleCancelCreateUserModalButton(),
        style: "secondary"
    },
    {
      title: 'Add New User',
      onClick: async () => this.handleAddNewUserModalButton(),
      style: "primary"
    }
];

  async handleCancelCreateUserModalButton(){
    return true;
  }

  async handleAddNewUserModalButton() {        
    if(!this.createUserComponent){
      return false;
    } 
    const result =  await this.createUserComponent.handleAddNewUserModalButton();
    return result;
  }

  receiveCreateUserHandle = (handle: CreateUserComponent) => {
      this.createUserComponent = handle;
  }
}

