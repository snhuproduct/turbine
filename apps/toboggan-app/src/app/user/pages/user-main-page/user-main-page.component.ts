import { Component } from '@angular/core';
import { ModalButtonConfig } from '@snhuproduct/toboggan-ui-components-library';
import { IAlertBanner } from '@snhuproduct/toboggan-ui-components-library/lib/modal/modal-allert-banner-list/modal-alert-banner.interface';
import { CreateUserComponent } from '../../components/create-user/create-user.component';

@Component({
  selector: 'toboggan-ws-user-main-page',
  templateUrl: './user-main-page.component.html',
  styleUrls: ['./user-main-page.component.scss'],
})
export class UserMainPageComponent {
  createUserDialogTitle = 'Add New User';
  createUserComponent?: CreateUserComponent;
  createUserModalAlertBanners: IAlertBanner[] = [];
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
    if (!this.createUserComponent) {
      return false;
    }
    this.createUserModalAlertBanners = [];
    const result = await this.createUserComponent.handleAddNewUserModalButton();
    if(!result){
      this.createUserModalAlertBanners.push({
        type: 'error',
        heading: 'Add New User',
        message: 'Couldn\'t be completed.',
      });
    }
    return result;
  }

  receiveCreateUserHandle = (handle: CreateUserComponent) => {
    this.createUserComponent = handle;
  };
}
