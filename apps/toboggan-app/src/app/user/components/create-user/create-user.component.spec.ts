import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent, StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { mock, MockProxy, mockReset } from "jest-mock-extended";
import { of } from 'rxjs';
import { GroupService } from '../../../group/services/group.service';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { UserService } from '../../../shared/services/user/user.service';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUserComponent } from './create-user.component';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let bannerService: BannerService;
  const mockUserService: MockProxy<UserService> = mock<UserService>();
  const mockGroupService = {
    fetchGroups: jest.fn().mockReturnValue(of([])),
  };
  const completedInputs = {
    "firstName": "Bob",
    "lastName": "Jackson",
    "email": "BobJackson@test.com",
    "groups": [],
    "userType": "learner"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [StoriesModule, SharedModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: UserService, useValue: mockUserService },
      { provide: GroupService, useValue: mockGroupService }
      ]
    }).compileComponents();
    mockReset(mockUserService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    bannerService = TestBed.inject(BannerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('handleAddNewUserModalButton calls user service if form is valid', async () => {
    component.userForm.setValue(completedInputs);
    const spy = jest.spyOn(mockUserService, 'createUser').mockImplementation(() => {
      return Promise.resolve();
    });
    await component.handleAddNewUserModalButton();
    expect(spy).toHaveBeenCalled();
  })

  it('Given createUser on userService successful completion, success banner is shown', async () => {
    component.userForm.setValue(completedInputs);
    const spy = jest.spyOn(bannerService, 'showBanner');
    await component.handleAddNewUserModalButton();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      'type': 'success',
    }))
  })

  it('Given createUser on userService returned an error, error banner is added inside modal', async () => {
    component.userForm.setValue(completedInputs);
    mockUserService.createUser.mockRejectedValue('error');
    const modalComponentFixture = TestBed.createComponent(ModalComponent);
    component.modalHandle = modalComponentFixture.componentInstance;
    await component.handleAddNewUserModalButton();
    expect(component.modalHandle.alertBanners.length).toEqual(1);
    expect(component.modalHandle.alertBanners[0]).toEqual({
      type: 'error',
      heading: 'Add new user',
      message: 'couldn\'t be completed.',
    });
  })

  it('Dissmiss button is configured to call hideService', async () => {
    component.userForm.setValue(completedInputs);
    const spy = jest.spyOn(bannerService, 'hideBanner');
    await component.handleAddNewUserModalButton();
    bannerService.banners[0].button?.action(bannerService.banners[0].id);
    expect(spy).toHaveBeenCalled();
  });
});
