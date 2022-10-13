import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

import { PermissionService } from '../../../permission/services/permission.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { BannerService } from '../../../shared/services/banner/banner.service';

@Component({
  selector: 'toboggan-ws-update-permission',
  templateUrl: './update-permission.component.html',
  styleUrls: ['./update-permission.component.scss'],
})
export class UpdatePermissionComponent implements AfterViewInit {
  @ViewChild('updatePermissionModal') updatePermissionModal!: ModalComponent;
  @Output() updatePermissionAction = new EventEmitter<boolean | undefined>();
  @Output() hidden = new EventEmitter();

  constructor(
    private permissionService: PermissionService,
    private bannerService: BannerService
  ) {}
  rows =[
    { label: "Users",
      oldValue: "Before before", 
      newValue: "Beforeson"
    },
    { label: "User groups",
      oldValue: "before", 
      newValue: "before "
    }
  ]

  ngAfterViewInit(): void {
    this.updatePermissionModal.open();
  }
  hideModal(): void {
    this.hidden.emit();
    this.updatePermissionAction.emit(true);
    this.updatePermissionModal.close();
  }
  approveChanges(): void {
    this.permissionService.patchPermission({}).subscribe({
      next: (response) => {
        this.updatePermissionAction.emit(true);
        this.hidden.emit()
        this.updatePermissionModal.close();
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
        this.updatePermissionModal.modal?.content?.alertBanners.push({
          type: 'error',
          heading: `Edit permission`,
          message: `couldn't be completed.`,
        });
      },
    });
  }
}