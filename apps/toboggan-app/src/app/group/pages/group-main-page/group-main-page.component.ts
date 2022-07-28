import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalButtonConfig } from '@snhuproduct/toboggan-ui-components-library';
import { CreateGroupComponent } from '../../components/create-group/create-group.component';
@Component({
  selector: 'toboggan-ws-group-main-page',
  templateUrl: './group-main-page.component.html',
  styleUrls: ['./group-main-page.component.css'],
})
export class GroupMainPageComponent implements OnInit {
  @ViewChild(CreateGroupComponent) createGroupComponent!: CreateGroupComponent;
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
        const createForm = this.createGroupComponent.createGroupForm;
        //createForm.markAllAsTouched();
        if(createForm.valid){
          // Do API Call...
        }
        return false
      }
    }
  ]
  constructor() { }

  ngOnInit(): void {}

}
