import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { FormError } from '@toboggan-ws/toboggan-constants';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'toboggan-ws-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
})
export class EditGroupComponent implements OnInit, AfterViewInit {
  editGroupForm!: FormGroup;
  mode = 'edit';

  oldGroup!: IGroup;
  modalTitle = '';
  acceptButton = '';
  cancelButton = 'Cancel';
  @Input() group!: IGroup;
  @Output() handleEditGroupClose = new EventEmitter<boolean>();
  @ViewChild('editGroupModal') editGroupModal!: ModalComponent;

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.mode = 'edit';
    this.modalTitle = 'Edit user group details';
    this.acceptButton = 'Review changes';
    this.cancelButton = 'Cancel';
    this.oldGroup = this.group;
    this.editGroupForm = new FormGroup({
      name: new FormControl(this.group.name, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$'),
      ]),
      description: new FormControl(this.group.description, [
        Validators.required,
        Validators.maxLength(300),
        this.specialCharactersValidation,
      ]),
    });
  }

  ngAfterViewInit(): void {
    this.editGroupModal.open();
  }

  getErrorMessage(controlName: string, friendlyName: string) {
    const control = this.editGroupForm.get(controlName);
    if (control)
      if (control.hasError('required')) {
        return `${friendlyName} ${FormError.isRequired}`;
      } else if (control.hasError('specialCharacters')) {
        return `${FormError.characters} ! @ # $`;
      } else if (control.hasError('pattern')) {
        return `${FormError.lettersAndNumbers}`;
      } else if (control.hasError('maxlength')) {
        return `${FormError.maxLength}`;
      }
    return '';
  }

  specialCharactersValidation(control: FormControl) {
    const value = control.value;
    const spChars = /[!@#$]+/;
    if (spChars.test(value)) {
      return {
        specialCharacters: {
          errors: true,
        },
      };
    }
    return null;
  }

  hasError(controlName: string) {
    const control = this.editGroupForm.get(controlName);
    if (control) {
      return !control.valid && (control.dirty || control.touched);
    }
    return false;
  }

  handleCancelAction() {
    if (this.mode == 'edit') {
      this.editGroupModal?.modal?.hide();
      this.handleEditGroupClose.emit();
    } else {
      this.mode = 'edit';
      this.acceptButton = 'Review changes';
      this.cancelButton = 'Cancel';
      this.modalTitle = 'Edit user group details';
    }
  }

  handleSubmit() {
    if (this.mode == 'edit') {
      this.editGroupForm.markAllAsTouched();

      if (this.editGroupForm.valid) {
        this.group = {
          id: this.group.id,
          name: this.editGroupForm.value.name,
          description: this.editGroupForm.value.description,
        };
        this.mode = 'review';
        this.acceptButton = 'Yes, approve';
        this.cancelButton = 'No, keep editing';
        this.modalTitle = 'Approve changes?';
      }
    } else {
      this.approveChanges();
    }
  }

  approveChanges() {
    const group: IGroup = {
      id: this.group.id,
      name: this.editGroupForm.value.name,
      description: this.editGroupForm.value.description,
    };
    this.groupService.updateGroup(group).subscribe({
      next: (response) => {
        // handle success
        this.editGroupModal?.modal?.hide();
        this.handleEditGroupClose.emit();
        this.groupService.onGroupUpdate(group);
      },
      error: (error) => {
        // handle error scenario
        this.editGroupModal.showBannerAlert(
          'error',
          'Edit group details',
          "couldn't be completed."
        );
      },
    });
  }
}
