import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { of } from 'rxjs';
import { GroupService } from '../../services/group.service';
import { CreateGroupComponent } from './create-group.component';

describe('CreateGroupComponent', () => {
  let component: CreateGroupComponent;
  let fixture: ComponentFixture<CreateGroupComponent>;

  const mockGroupService= {
    createGroup: jest.fn().mockReturnValue(of({}))
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateGroupComponent],
      imports: [StoriesModule, ReactiveFormsModule, HttpClientModule],
      providers: [{ provide: GroupService, useValue: mockGroupService }]
    }).compileComponents();
    fixture = TestBed.createComponent(CreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createGroup method should call', () => {
    jest.spyOn(component, 'createGroup')
    component.createGroupForm.setValue({
      "name": "name",
      "description": "description",
      "addUser": false
    });
    component.createGroup();
    expect(mockGroupService.createGroup).toHaveBeenCalledTimes(1);
  })

  it('getErrorMessage method should check name with special characters ! @ # $', () => {
    jest.spyOn(component, 'getErrorMessage')
    component.createGroupForm.setValue({
      "name": "name@",
      "description": "description",
      "addUser": false
    });
    component.getErrorMessage('name', 'name');
    expect(component.createGroupForm.valid).toBeFalsy();
  })

  it('getErrorMessage method should check name with other special characters', () => {
    jest.spyOn(component, 'getErrorMessage')
    component.createGroupForm.setValue({
      "name": "name+",
      "description": "description",
      "addUser": false
    });
    component.getErrorMessage('name', 'name');
    expect(component.createGroupForm.valid).toBeFalsy();
  })
});
