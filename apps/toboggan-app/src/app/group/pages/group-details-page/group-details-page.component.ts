/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsComponent } from '@snhuproduct/toboggan-ui-components-library';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { Observable } from 'rxjs';
import { ModalAlertService } from '../../../shared/services/modal-alert/modal-alert.service';
import { PermissionComponent } from '../../components/permission/permission.component';
import { GroupService } from '../../services/group.service';
import { IComponentCanDeactivate } from '../../services/pending-changes.guard';
import { applicationTab } from './data/applicationTab';
@Component({
  selector: 'toboggan-ws-group-details-page',
  templateUrl: './group-details-page.component.html',
  styleUrls: ['./group-details-page.component.scss'],
})
export class GroupDetailsPageComponent
  implements OnInit, IComponentCanDeactivate
{
  id: any;
  group!: IGroup;
  showAddUserModal = false;
  leftTabs = applicationTab;
  activeLeftTab = 0;

  @ViewChild(TabsComponent) tabsComponent: TabsComponent = {} as TabsComponent;
  @ViewChild(PermissionComponent) permissionComponent: PermissionComponent =
    {} as PermissionComponent;
  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private modalAlertService: ModalAlertService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getGroupDetails();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.tabsComponent.activeTabIndex == 1) {
      return this.permissionComponent.canDeactivate();
    } else {
      return true;
    }
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
    this.leftTabs.forEach((data) => {
      if (data.id === tab.id) {
        data.active = true;
      } else {
        data.active = false;
      }
    });
  }

  onTabChange(event: any) {
    if (
      event.target.innerText == 'Users' &&
      !this.permissionComponent.canDeactivate()
    ) {
      console.log('unsaved data is there');
      this.openUserConfirmationModal();
    }
  }

  openUserConfirmationModal() {
    this.modalAlertService.showModalAlert({
      type: 'warning',
      heading: `Leave this page?`,
      message: `If you leave, your changes won’t be saved. `,
      buttons: [
        {
          title: 'No, continue editing',
          onClick: () => {
            console.log('no');
            this.modalAlertService.hideModalAlert();
            this.tabsComponent.showTab(1);
          },
          style: 'secondary',
        },
        {
          title: 'Yes, leave page',
          onClick: () => {
            this.modalAlertService.hideModalAlert();
            console.log('yes ');
          },
          style: 'primary',
        },
      ],
    });
  }
}
