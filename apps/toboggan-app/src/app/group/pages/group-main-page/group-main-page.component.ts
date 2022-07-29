import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalButtonConfig, ModalComponent } from '@snhuproduct/toboggan-ui-components-library';
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { AddUsersComponent } from '../../components/add-users/add-users.component';
import { CreateGroupComponent } from '../../components/create-group/create-group.component';
@Component({
  selector: 'toboggan-ws-group-main-page',
  templateUrl: './group-main-page.component.html',
  styleUrls: ['./group-main-page.component.scss'],
})
export class GroupMainPageComponent implements OnInit, AfterViewInit {
  @ViewChild(CreateGroupComponent) createGroupComponent!: CreateGroupComponent;
  @ViewChild('addUsers') addUsersTemplRef?: ElementRef;
  @ViewChild(AddUsersComponent) addUserComponent?: AddUsersComponent;
  title = 'Create user group'
  modalButtons: ModalButtonConfig[] = [
    {
      "title": "Cancel",
      "style": "secondary",
      onClick: () => {
        return true
      }
    },
    {
      "title": "Create user group",
      "style": "primary",
      onClick: () => {
        this.createGroupComponent.createGroup()
        return false
      }
    }
  ]
  addUserModalRef?: BsModalRef | null;
  addUserModalState!: ModalOptions;
  
  
  constructor(private modalService: BsModalService) { }
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
  }

  openAddUserModal() {
    this.addUserModalState = {
      initialState: {
          templateRef: this.addUsersTemplRef,
          title: 'Add user to this group',
          modalButtons: [
            {
              "title": "Cancel",
              "style": "secondary",
              onClick: () => true
            },
            {
              "title": "Add user",
              "style": "primary",
              onClick: () => {
                this.addUserComponent?.addUsertoGroup();
                return false;
              }
            }
          ]
      },
    class: 'gp-modal'
    };
    this.addUserModalRef = this.modalService.show(
      ModalComponent, 
      this.addUserModalState
    )
  }
}
