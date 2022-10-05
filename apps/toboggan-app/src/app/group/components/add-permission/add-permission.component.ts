import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PermissionService } from '../../../permission/services/permission.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { BannerService } from '../../../shared/services/banner/banner.service';

@Component({
  selector: 'toboggan-ws-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss'],
})
export class AddPermissionComponent {
  @ViewChild('addPermissionModal') addPermissionModal!: ModalComponent;
  @Output() addPermissionAction = new EventEmitter<boolean | undefined>();
  @Output() hidden = new EventEmitter();
  addPermissionForm: FormGroup = new FormGroup({
    adminApplication: new FormControl(false),
    assessmentAuthoring: new FormControl(false),
    contentAuthoring: new FormControl(false),
    contentManagement: new FormControl(false),
  });
  constructor(private permissionService: PermissionService, private bannerService: BannerService) { }
  ngAfterViewInit(): void {
    this.addPermissionModal.open();
  }
  hideModal(): void {
    this.hidden.emit();
    this.addPermissionModal.close();
  }
  addPermission(): void {
    this.permissionService
      .addPermission(
        this.addPermissionForm.value
      )
      .subscribe({
        next: (response) => {
          this.hidden.emit();
          this.addPermissionModal.close();
          this.bannerService.showBanner({
            type: 'success',
            heading: '',
            message: `Permissions for <strong>[application]</strong> have been edited.`,
            button: null,
            autoDismiss: true,
          });
        },
        error: (error) => {
          // handle error scenario
          this.addPermissionModal.modal?.content?.alertBanners.push({
            type: 'error',
            heading: 'Grant access',
            message: "couldn't be completed.",
          });
        },
      });
  }
}
