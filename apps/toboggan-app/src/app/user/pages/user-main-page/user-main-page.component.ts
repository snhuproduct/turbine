import { Component } from '@angular/core';
import { ModalButtonConfig } from "@snhuproduct/toboggan-ui-components-library";
import { CreateUserComponent } from '../../components/create-user/create-user.component';

@Component({
  selector: 'toboggan-ws-user-main-page',
  templateUrl: './user-main-page.component.html',
  styleUrls: ['./user-main-page.component.css'],
})
export class UserMainPageComponent {
  createUserComponent?: CreateUserComponent;
  createUserModalButtonsConfig: ModalButtonConfig[] = [
    {
        title: 'Cancel',
        onClick: () => this.handleCancelCreateUserModalButton(),
        style: "secondary"
    },
    {
      title: 'Add New User',
      onClick: () => this.handleAddNewUserModalButton(),
      style: "secondary"
    }
];

  constructor() {}

  ngOnInit(): void {}

  // methods for Create User Modal
  handleCancelCreateUserModalButton(){
    return true;
  }

  handleAddNewUserModalButton() {
    return true;
  }

  receiveCreateUserHandle = (handle: CreateUserComponent) => {
      this.createUserComponent = handle;
  }
}

