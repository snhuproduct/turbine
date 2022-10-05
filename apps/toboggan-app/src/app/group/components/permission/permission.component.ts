/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { permissionRadio } from './data/permissions';

@Component({
  selector: 'toboggan-ws-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {
  groupPermissionForm!: FormGroup;
  permissionsCheck!: any[];
  @Input() permissions!: any[];
  constructor() { }

  ngOnInit(): void {
    this.permissionsCheck = permissionRadio;
    this.groupPermissionForm = new FormGroup({
      contentobject: new FormControl('0'),
      learningexperience: new FormControl('0'),
      learningresources: new FormControl('0'),
    });
  }

  onCheckboxToggle(e: any) {
  }

  onSubmit() {
    console.log(this.groupPermissionForm)
  }
}
