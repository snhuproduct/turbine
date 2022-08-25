import { Component, ViewChild } from '@angular/core';
import { ModalButtonConfig } from '@snhuproduct/toboggan-ui-components-library';
import { IUser } from '@toboggan-ws/toboggan-common';
import { CreateUserComponent } from '../../components/create-user/create-user.component';

@Component({
  selector: 'toboggan-ws-user-main-page',
  templateUrl: './user-main-page.component.html',
  styleUrls: ['./user-main-page.component.scss'],
})
export class UserMainPageComponent {
  @ViewChild('createUserModal', { static: false}) createUserModal?: CreateUserComponent;
  editingUser?: IUser;
  createUserModalButtonsConfig: ModalButtonConfig[] = [
    {
      title: 'Cancel',
      onClick: () => this.handleCancelCreateUserModalButton(),
      style: 'secondary',
    },
    {
      title: 'Add New User',
      onClick: () => this.handleAddNewUserModalButton(),
      style: 'primary',
    },
  ];

  async handleCancelCreateUserModalButton() {
    return true;
  }

  async handleAddNewUserModalButton() {
    if (!this.createUserModal) {
      return false;
    }
    const result = await this.createUserModal.handleAddNewUserModalButton();
    return result;
  }
}
