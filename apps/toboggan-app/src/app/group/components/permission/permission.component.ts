/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IComponentCanDeactivate } from '../../services/pending-changes.guard';
import { permissionRadio } from './data/permissions';

@Component({
  selector: 'toboggan-ws-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit, IComponentCanDeactivate {
  groupPermissionForm!: FormGroup;
  permissions!: any[];
  constructor() {}

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.groupPermissionForm.pristine;
  }

  ngOnInit(): void {
    this.permissions = permissionRadio;
    this.groupPermissionForm = new FormGroup({
      contentobject: new FormControl('0'),
      learningexperience: new FormControl('0'),
      learningresources: new FormControl('0'),
    });
  }

  onCheckboxToggle(e: any) {}

  onSubmit() {
    console.log(this.groupPermissionForm);
  }
}
