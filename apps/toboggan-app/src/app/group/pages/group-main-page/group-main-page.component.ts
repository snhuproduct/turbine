import { Component, OnInit } from '@angular/core';
import { ModalButtonConfig } from '@snhuproduct/toboggan-ui-components-library';

@Component({
  selector: 'toboggan-ws-group-main-page',
  templateUrl: './group-main-page.component.html',
  styleUrls: ['./group-main-page.component.css'],
})
export class GroupMainPageComponent implements OnInit {
  title = 'Create user group'
  action = 'create'
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
        this.action = 'group'
        this.title = "Change header";
        return false
      }
    }
  ]
  constructor() { }

  ngOnInit(): void {

  }
}
