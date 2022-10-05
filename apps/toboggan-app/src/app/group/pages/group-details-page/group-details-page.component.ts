/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { GroupService } from '../../services/group.service';
import { applicationTab } from './data/applicationTab';
@Component({
  selector: 'toboggan-ws-group-details-page',
  templateUrl: './group-details-page.component.html',
  styleUrls: ['./group-details-page.component.scss'],
})
export class GroupDetailsPageComponent implements OnInit {
  id: any;
  group!: IGroup;
  showAddUserModal = false;
  leftTabs = applicationTab;
  activeLeftTab = 0;
  openPermission = false;
  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getGroupDetails();
  }

  openPermissionModal(): void {
    this.openPermission = true;
  }

  getGroupDetails(): void {
    this.groupService.fetchGroupDetails(this.id).subscribe((group: IGroup) => {
      this.group = group;
    });
  }

  openAddUserToGroupModal() {
    this.showAddUserModal = true;
  }

  handleAddUserToGroupAction() {
    this.showAddUserModal = false;
  }

  changeTab(tab: any) {
    this.activeLeftTab = tab.id;
    this.leftTabs.forEach(data => {
      if (data.id === tab.id) {
        data.active = true;
      } else {
        data.active = false;
      }
    })
  }
}
