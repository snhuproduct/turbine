/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PermissionService } from '../../../permission/services/permission.service';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { IBannerButton } from '../../../shared/services/banner/banner.types';
import { ModalAlertService } from '../../../shared/services/modal-alert/modal-alert.service';
import { IComponentCanDeactivate } from '../../services/pending-changes.guard';
import { permissionRadio } from './data/permissions';

@Component({
  selector: 'toboggan-ws-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit, IComponentCanDeactivate {
  groupPermissionForm!: FormGroup;
  // permissions!: any[];
  permissions: any = [];
  permissionsCheck!: any[];
  showPermissionModal = false;
  constructor(private modalAlertService: ModalAlertService,private bannerService: BannerService,private permissionService: PermissionService) { }
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.groupPermissionForm.pristine;
  }

  ngOnInit(): void {
    this.permissionsCheck = permissionRadio;
    this.groupPermissionForm = new FormGroup({
      contentobject: new FormControl('0'),
      learningexperience: new FormControl('0'),
      learningresources: new FormControl('0'),
    }); 
  }

  onCheckboxToggle(e: any) { }

  onSubmit() {
    if(this.groupPermissionForm.dirty){
      this.showPermissionModal=true;
    }else{
      this.dismissChanges();
    }
  }
  handleUpdatePermissionAction(evt:any){
    if(evt){
      console.log(evt);   
      this.showPermissionModal = false;
    }
  }
  dismissChanges(){
   this.modalAlertService.showModalAlert({
      type: 'warning',
      heading: `You didn't make any changes`,
      message: `If you meant to edit these permissions, go back and try again.`,
      buttons: [
        {
          title: 'Dismiss',
          onClick: () => {
            this.modalAlertService.hideModalAlert();
          },
          style: 'secondary',
        },
        {
          title: 'Dismiss',
          onClick: () => {
            this.modalAlertService.hideModalAlert();
          },
          style: 'primary',
        }
      ],
    });
  }
}
