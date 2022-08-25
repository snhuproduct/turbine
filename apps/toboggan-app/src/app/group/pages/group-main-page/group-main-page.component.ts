/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  ModalButtonConfig,
  ModalComponent,
} from '@snhuproduct/toboggan-ui-components-library';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { AddUsersComponent } from '../../components/add-users/add-users.component';
import { CreateGroupComponent } from '../../components/create-group/create-group.component';
@Component({
  selector: 'toboggan-ws-group-main-page',
  templateUrl: './group-main-page.component.html',
  styleUrls: ['./group-main-page.component.scss'],
})
export class GroupMainPageComponent {
  @ViewChild(CreateGroupComponent) createGroupComponent!: CreateGroupComponent;
  @ViewChild('addUsers') addUsersTemplRef?: ElementRef;
  @ViewChild(AddUsersComponent) addUserComponent?: AddUsersComponent;
  title = 'Create user group';
  modalButtons: ModalButtonConfig[] = [
    {
      title: 'Cancel',
      style: 'secondary',
      onClick: () => this.hideModal(),
    },
    {
      title: 'Create user group',
      style: 'primary',
      onClick: async () => {
        this.createGroupComponent.createGroup();
        if (
          this.createGroupComponent.createGroupForm.valid &&
          this.createGroupComponent.createGroupForm.value?.addUser
        ) {
          this.openAddUserModal();
        }
        return false;
      },
    },
  ];
  addUserModalRef?: BsModalRef | null;
  addUserModalState!: ModalOptions;

  constructor(
    private modalService: BsModalService,
    private bannerService: BannerService
  ) {}

  async openAddUserModal() {
    this.modalService._hideModal();
    this.addUserModalState = {
      initialState: {
        templateRef: this.addUsersTemplRef,
        title: 'Add user to this group',
        modalButtons: [
          {
            title: 'Cancel',
            style: 'secondary',
            onClick: () => this.hideModal(),
          },
          {
            title: 'Add user',
            style: 'primary',
            onClick: async () => this.addUser(),
          },
        ],
      },
      class: 'gp-modal',
    };
    this.addUserModalRef = this.modalService.show(
      ModalComponent,
      this.addUserModalState
    );
  }

  _callErrorBanner() {
    this.bannerService.showBanner({
      type: 'error',
      heading: `Add user`,
      message: "to the group couldn't be completed",
      button: {
        label: 'Dismiss',
        action: (bannerId: number) => this.bannerService.hideBanner(bannerId),
      },
    });
  }

  _callSuccessBanner() {
    this.bannerService.showBanner({
      type: 'success',
      heading: `[User's Name]`,
      message: 'has been added to the [Group name]',
      button: {
        label: 'Dismiss',
        action: (bannerId: number) => this.bannerService.hideBanner(bannerId),
      },
    });
  }

  async addUser() {
    {
      const addUserStatus = await this.addUserComponent?.addUsertoGroup();
      console.log(addUserStatus);
      if (!addUserStatus) {
        if (addUserStatus === false) this._callErrorBanner();
        this.hideModal();
        return false;
      }
      this._callSuccessBanner();
      this.hideModal();
      return true;
    }
  }

  async hideModal() {
    return true;
  }
}
