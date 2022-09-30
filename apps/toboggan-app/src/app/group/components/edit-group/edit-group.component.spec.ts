import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { mock, MockProxy } from 'jest-mock-extended';
import { of } from 'rxjs';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { SharedModule } from '../../../shared/shared.module';
import { GroupService } from '../../services/group.service';
import { EditGroupComponent } from './edit-group.component';

describe('EditGroupComponent', () => {
  let component: EditGroupComponent;
  let fixture: ComponentFixture<EditGroupComponent>;

  const mockGroupService: MockProxy<GroupService> = mock<GroupService>();

  const mockBannerService = {
    showBanner: jest.fn().mockReturnValueOnce(of(true)),
  };
  let groupService: GroupService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGroupComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        StoriesModule,
        ReactiveFormsModule,
        SharedModule,
      ],
      providers: [
        { provide: GroupService, useValue: mockGroupService },
        { provide: BannerService, useValue: mockBannerService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditGroupComponent);
    groupService = TestBed.inject(GroupService);
    component = fixture.componentInstance;
    component.group = {
      id: '1',
      name: 'group1',
      description: 'desc',
    } as IGroup;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getErrorMessage method should check name with special characters ! @ # $', () => {
    jest.spyOn(component, 'getErrorMessage');
    component.editGroupForm.setValue({
      name: 'name@',
      description: 'description@',
    });
    component.hasError('name');
    component.getErrorMessage('name');
    component.getErrorMessage('description');
    expect(component.editGroupForm.valid).toBeFalsy();
  });

  it('getErrorMessage method should check name with numbers', () => {
    jest.spyOn(component, 'getErrorMessage');
    component.editGroupForm.setValue({
      name: '',
      description:
        'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description',
    });
    component.getErrorMessage('name');
    component.getErrorMessage('description');
    expect(component.editGroupForm.valid).toBeFalsy();
  });

  it('getErrorMessage method should check name with numbers', () => {
    jest.spyOn(component, 'editModalAccept');
    component.editGroupForm.setValue({
      name: 'name',
      description: 'description',
    });
    component.editModalAccept();
    expect(component.editGroupForm.valid).toBeTruthy();
  });

  it('getErrorMessage method should check name with numbers', () => {
    jest.spyOn(component, 'approveChanges');
    const approveGroupSpy = jest.spyOn(groupService, 'updateGroup');
    component.editGroupForm.setValue({
      name: 'name',
      description: 'description',
    });
    component.approveChanges();
    expect(component.editGroupForm.valid).toBeTruthy();
    expect(approveGroupSpy).toBeCalled();
  });

  it('Should call banner service', async () => {
    const showBannerSpy = jest.spyOn(mockBannerService, 'showBanner');
    component.editGroupForm.setValue({
      name: 'name',
      description: 'description',
    });
    await component.approveChanges();
    expect(showBannerSpy).toBeCalled();
  });
});
