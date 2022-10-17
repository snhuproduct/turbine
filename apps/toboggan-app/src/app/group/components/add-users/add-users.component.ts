import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGroup, IUser } from '@toboggan-ws/toboggan-common';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { UserService } from '../../../shared/services/user/user.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'toboggan-ws-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('addUser') adduserModal!: ModalComponent;
  @Output() addUserToGroupAction = new EventEmitter<boolean | undefined>();
  @Input() group!: IGroup;
  addUserForm: FormGroup = new FormGroup({
    groupId: new FormControl(''),
    user: new FormControl('', [Validators.required, Validators.email]),
  });
  users: IUser[] = [];
  userEmails: string[] = [];

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private bannerService: BannerService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }
  ngOnChanges({ group }: SimpleChanges): void {
    if (group.currentValue && !group.previousValue) {
      this.addUserForm.patchValue({
        groupId: group.currentValue.id,
      });
    }
  }

  ngAfterViewInit(): void {
    this.adduserModal.open();
  }

  getUsers(): void {
    this.userService.fetchUsers().subscribe((users: IUser[]) => {
      this.users = users;
      this.userEmails = this.users.map((user) => user.email as string);
    });
  }

  addUsertoGroup() {
    const userEmail = this.addUserForm.value.user;
    if (!this.userEmails.includes(userEmail)) {
      this.addUserForm.get('user')?.setErrors({ incorrect: true });
      return;
    }
    if (this.addUserForm.valid) {
      const user = this.users.find(
        (user) => user.email == this.addUserForm.value.user
      );
      this.groupService
        .addUsertoGroup(
          this.addUserForm.value.groupId,
          this.addUserForm.value.user
        )
        .subscribe({
          next: (response) => {
            // handle success
            console.log(response);
            this.addUserToGroupAction.emit(true);
            this.adduserModal.close();
            this.bannerService.showBanner({
              type: 'success',
              heading: '',
              message: `<strong>${user?.firstName} ${user?.lastName}</strong> has been added to ${this.group.name}.`,
              button: null,
              autoDismiss: true,
            });
          },
          error: (error: unknown) => {
            // handle error scenario
            this.adduserModal.modal?.content?.alertBanners.push({
              type: 'error',
              heading: 'Add user to group',
              message: `couldn't be completed: ${error}`,
            });
          },
        });
    }

    return false;
  }

  hideModal() {
    this.adduserModal.close();
  }

  hasError(controlName: string) {
    const control = this.addUserForm.get(controlName);
    if (control) {
      return (
        (!control.valid || !this.userEmails.includes(control?.value)) &&
        (control.dirty || control.touched)
      );
    }
    return false;
  }

  getFormError(field: string): string {
    const control = this.addUserForm.get(field);
    if (control?.hasError('required')) {
      return "This field can't be empty";
    }
    if (control?.hasError('email')) {
      return 'Check email format';
    }
    if (!this.userEmails.includes(control?.value)) {
      return 'No user found with that email';
    }
    return '';
  }
}
