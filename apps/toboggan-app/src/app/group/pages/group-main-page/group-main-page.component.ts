/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { BsModalService } from 'ngx-bootstrap/modal';

export type groupActionType = {
  group: IGroup | undefined;
  addUser: boolean;
};
@Component({
  selector: 'toboggan-ws-group-main-page',
  templateUrl: './group-main-page.component.html',
  styleUrls: ['./group-main-page.component.scss'],
})
export class GroupMainPageComponent {
  @ViewChild('addUsers') addUsersTemplRef?: ElementRef;
  title = 'Create user group';
  showAddUserModal = false;
  showCreategroup = false;
  dummyGroup: IGroup = {
    id: 'group-id-1000',
    name: 'Group name -10000',
    description: 'description',
  };

  constructor(private modalService: BsModalService) {}

  openCreateGroupModal() {
    this.showCreategroup = true;
  }

  handleGroupCreateAction(event: groupActionType) {
    if (event.group) {
      this.dummyGroup = event.group;
    }
    if (event.addUser) {
      this.showAddUserModal = true;
    }
    this.showCreategroup = false;
  }
  handleAddUserToGroupAction() {
    this.showAddUserModal = false;
  }
}
