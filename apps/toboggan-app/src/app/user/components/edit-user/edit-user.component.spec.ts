import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';

import { mock, MockProxy, mockReset } from "jest-mock-extended";
import { BannerService } from '../../../shared/services/banner/banner.service';
import { UserService } from '../../../shared/services/user/user.service';
import { SharedModule } from '../../../shared/shared.module';
import { EditUserComponent } from './edit-user.component';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let bannerService: BannerService;
  const mockUserService: MockProxy<UserService> = mock<UserService>();
  const completedInputs = {
    "firstName": "Bob",
    "lastName": "Jackson",
    "email": "BobJackson@test.com"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserComponent],
      imports: [StoriesModule, SharedModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: UserService, useValue: mockUserService }]
    }).compileComponents();
    mockReset(mockUserService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    bannerService = TestBed.inject(BannerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the userForm and open the modal', () => {
    const spy = jest.spyOn(component.editModal, 'open')
    component.ngOnChanges(
      {
        user: new SimpleChange(null, completedInputs, true)
      }
    );
    expect(component.userForm.controls.firstName.value).toBe('Bob');
    expect(component.userForm.controls.lastName.value).toBe('Jackson');
    expect(component.userForm.controls.email.value).toBe('BobJackson@test.com');
    expect(spy).toBeCalledTimes(1);
  })

  it('should not populate the userForm and open the modal', () => {
    const spy = jest.spyOn(component.editModal, 'open');
    component.ngOnChanges(
      {
        user: new SimpleChange(null, null, true)
      }
    );
    expect(component.userForm.controls.firstName.value).toBe('');
    expect(component.userForm.controls.lastName.value).toBe('');
    expect(component.userForm.controls.email.value).toBe('');
    expect(spy).not.toBeCalled()
  })


  it('should close the edit modal and reset the userForm', () => {
    const spy = jest.spyOn(component.userChange, 'emit');
   component.reviewing = null ;
   component.userForm.setValue(completedInputs);
   component.editModalHidden();
   expect(spy).toBeCalledTimes(1)
   expect(component.userForm.controls.firstName.value).not.toBeTruthy();
   expect(component.userForm.controls.lastName.value).not.toBeTruthy();
   expect(component.userForm.controls.email.value).not.toBeTruthy();
  })

  it('should not close the edit modal and should not reset the userForm', () => {
    const spy = jest.spyOn(component.userChange, 'emit');
    component.reviewing = completedInputs;
    component.userForm.setValue(completedInputs);
    component.editModalHidden();
    expect(spy).not.toBeCalled()
    expect(component.userForm.controls.firstName.value).toBeTruthy();
    expect(component.userForm.controls.lastName.value).toBeTruthy();
    expect(component.userForm.controls.email.value).toBeTruthy();
   })


   describe('editModalAccept()', () => {
    it('should open review modal if form is valid and any values changed', () => {
      const spyEditModal = jest.spyOn(component.editModal, 'close');
      const spyReviewModal = jest.spyOn(component.reviewModal, 'open');
      component.userForm.setValue(completedInputs);
      expect(component.userForm).not.toBeFalsy();
      // assign user a different value
      component.user  = {
        "firstName": "Bobb",
        "lastName": "Jackson",
        "email": "BobJackson@test.com",
      } as any;
      component.editModalAccept();
      const formValue = component.userForm.getRawValue();
      expect(component.reviewing).toMatchObject(formValue);
      expect(spyEditModal).toBeCalledTimes(1)
      expect(spyReviewModal).toBeCalledTimes(1)
     })

     it('should not work if the form is invalid', () => {
      const spyEditModal = jest.spyOn(component.editModal, 'close');
      const spyReviewModal = jest.spyOn(component.reviewModal, 'open');
      expect(component.userForm.valid).toBeFalsy();
      component.editModalAccept();
      expect(component.reviewing).toBeFalsy();
      expect(spyEditModal).not.toBeCalled()
      expect(spyReviewModal).not.toBeCalled()
     })

     it('should not work if user values does not change', () => {
      const spyEditModal = jest.spyOn(component.editModal, 'close');
      const spyReviewModal = jest.spyOn(component.reviewModal, 'open');
      component.userForm.setValue(completedInputs);
      expect(component.userForm).not.toBeFalsy();
      // assign user same value
      component.user  = completedInputs as any;
      component.editModalAccept();
      expect(component.reviewing).toBeFalsy();
      expect(spyEditModal).not.toBeCalled()
      expect(spyReviewModal).not.toBeCalled()
     })
   })

   it('should open edit modal again from review modal if reviewing value exist', () => {
    const spyEditModal = jest.spyOn(component.editModal, 'open');
    component.reviewing = completedInputs;
    component.reviewModalHidden();
    expect(component.reviewing).toBeNull();
    component.editModal.open();
    expect(spyEditModal).toBeCalled()
   })

   it('should not open edit modal again from review modal if reviewing value does not exist', () => {
    const spyEditModal = jest.spyOn(component.editModal, 'open');
    component.reviewing = null;
    component.reviewModalHidden();
    expect(spyEditModal).not.toBeCalled()
   })

   describe('onSubmit()', () => {
    let spyEventEmitter:any;
    let spyReviewModal:any;
    beforeEach(() => {
      spyEventEmitter = jest.spyOn(component.userChange, 'emit');
      spyReviewModal = jest.spyOn(component.reviewModal, 'close');
    });
    it('should submit if user exist', async() => {
      component.userForm.setValue(completedInputs);
      component.user  = {
        "userType": "usertype",
        "userId":"1"
      } as any;
      const spy = jest.spyOn(mockUserService, 'updateUser').mockImplementation(() => {
        return Promise.resolve();
      });
      await component.onSubmit();
      expect(spy).toBeCalledTimes(1);
      expect(spyEventEmitter).toBeCalledTimes(1);
      expect(spyReviewModal).toBeCalledTimes(1);
     })

     it('should show success banner on successfull completion of update user', async () => {
      component.userForm.setValue(completedInputs);
      component.user  = {
        "userType": "usertype",
        "userId":"1"
      } as any;
      const spyUserService = jest.spyOn(mockUserService, 'updateUser').mockImplementation(() => {
        return Promise.resolve();
      });
      const spy = jest.spyOn(bannerService, 'showBanner');
      await component.onSubmit();
      expect(spyUserService).toBeCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expect.objectContaining({
        'type': 'success',
      }))
      expect(spyEventEmitter).toBeCalledTimes(1);
      expect(spyReviewModal).toBeCalledTimes(1);
    })

    it('should show error banner on update user throws an error', async () => {
      component.userForm.setValue(completedInputs);
      component.user  = {
        "userType": "usertype",
        "userId":"1"
      } as any;
      const spyUserService = jest.spyOn(mockUserService, 'updateUser').mockImplementation(() => {
        return Promise.reject();
      });
      const spy = jest.spyOn(bannerService, 'showBanner');
      await component.onSubmit();
      expect(spyUserService).toBeCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expect.objectContaining({
        'type': 'error',
      }))
      expect(spyEventEmitter).toBeCalledTimes(1);
      expect(spyReviewModal).toBeCalledTimes(1);
    })


  it('Should dismiss banner on call hideService', async () => {
    component.userForm.setValue(completedInputs);
    component.user  = {
      "userType": "sampleType",
      "userId":"1"
    } as any;
    const spy = jest.spyOn(bannerService, 'hideBanner');
    await component.onSubmit();
    bannerService.banners[0].button?.action(bannerService.banners[0].id);
    expect(spy).toHaveBeenCalled();
  });
   })

});

