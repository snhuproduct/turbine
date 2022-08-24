import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { mock, MockProxy, mockReset } from "jest-mock-extended";
import { BannerService } from '../../../shared/services/banner/banner.service';
import { UserService } from '../../../shared/services/user/user.service';
import { CreateUserComponent } from './create-user.component';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let bannerService: BannerService;
  const mockUserService: MockProxy<UserService> = mock<UserService>();
  const completedInputs = {
    "firstName": "Bob", 
    "lastName": "Jackson",
    "email": "BobJackson@test.com"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [StoriesModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: UserService, useValue: mockUserService }]
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

  it('should return handle to itself if callback is supplied', () => {    
    component.returnHandle = jest.fn();
    component.ngAfterViewInit();
    expect(component.returnHandle).toHaveBeenCalledWith(component); 
  } )

  it('hasError should return false if control name is not found in the form', () => {
    expect(component.hasError('nonExistingControlName')).toBeFalsy();
  })

  it('for invalid email adddress getError should return appropriate message', () => {
    component.userForm.setValue({
      "firstName": "", 
      "lastName": "",
      "email": "invalidemail"
    });
    expect(component.getErrorMessage('email', 'Email')).toEqual('Email format is invalid');
  })

  it('when control is valid getError should return empty string', () => {
    component.userForm.setValue({
      "firstName": "Bob", 
      "lastName": "",
      "email": ""
    });
    expect(component.getErrorMessage('firstName', 'First Name')).toEqual('');
  })

  it('handleAddNewUserModalButton calls user service if form is valid', async() => {
    component.userForm.setValue(completedInputs);
    const spy = jest.spyOn(mockUserService, 'createUser').mockImplementation(() => { 
      return Promise.resolve(); 
    } );
    await component.handleAddNewUserModalButton();
    expect(spy).toHaveBeenCalled();
  })

  it('Given createUser on userService successful completion, success banner is shown', async() => {
    component.userForm.setValue(completedInputs);
    const spy = jest.spyOn(bannerService, 'showBanner');
    await component.handleAddNewUserModalButton();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      'type': 'success', 
     }))
  })

  it('Dissmiss button is configured to call hideService', async() => {
    component.userForm.setValue(completedInputs);
    const spy = jest.spyOn(bannerService, 'hideBanner');
    await component.handleAddNewUserModalButton();
    bannerService.banners[0].button?.action(bannerService.banners[0].id);
    expect(spy).toHaveBeenCalled();
  });
});
