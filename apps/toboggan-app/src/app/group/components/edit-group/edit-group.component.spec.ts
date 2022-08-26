import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { of } from 'rxjs';
import { GroupService } from '../../services/group.service';
import { EditGroupComponent } from './edit-group.component';

describe('EditGroupComponent', () => {
  let component: EditGroupComponent;
  let fixture: ComponentFixture<EditGroupComponent>;

  const mockGroupService = {
    updateGroup: jest.fn().mockReturnValue(of({}))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGroupComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: GroupService, useValue: mockGroupService }]
    }).compileComponents();

    fixture = TestBed.createComponent(EditGroupComponent);
    component = fixture.componentInstance;
    component.group = { id: '1', name: 'group1', description: 'desc' } as IGroup
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getErrorMessage method should check name with special characters ! @ # $', () => {
    jest.spyOn(component, 'getErrorMessage')
    component.editGroupForm.setValue({
      "name": "name@",
      "description": "description@"
    });
    component.hasError('name');
    component.getErrorMessage('name', 'name');
    component.getErrorMessage('description', 'description');
    expect(component.editGroupForm.valid).toBeFalsy();
  });

  it('getErrorMessage method should check name with numbers', () => {
    jest.spyOn(component, 'getErrorMessage')
    component.editGroupForm.setValue({
      "name": "",
      "description": "description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description"
    });
    component.getErrorMessage('name', 'name');
    component.getErrorMessage('description', 'description');
    expect(component.editGroupForm.valid).toBeFalsy();
  })

  it('getErrorMessage method should check name with numbers', () => {
    jest.spyOn(component, 'reviewGroup')
    component.editGroupForm.setValue({
      "name": "name",
      "description": "description"
    });
    component.reviewGroup();
    expect(component.editGroupForm.valid).toBeTruthy();
  })

  it('getErrorMessage method should check name with numbers', () => {
    jest.spyOn(component, 'approveChanges')
    component.editGroupForm.setValue({
      "name": "name",
      "description": "description"
    });
    component.approveChanges();
    expect(component.editGroupForm.valid).toBeTruthy();
    expect(mockGroupService.updateGroup).toHaveBeenCalledTimes(1);
  })

});
