import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { of } from 'rxjs';
import { PermissionService } from '../../../permission/services/permission.service';
import { SharedModule } from '../../../shared/shared.module';
import { AddPermissionComponent } from './add-permission.component';
describe('AddPermissionComponent', () => {
  let component: AddPermissionComponent;
  let fixture: ComponentFixture<AddPermissionComponent>;

  const mockPermissionService = {
    addPermission: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPermissionComponent],
      imports: [ReactiveFormsModule, StoriesModule, HttpClientModule, SharedModule],
      providers: [
        { provide: PermissionService, useValue: mockPermissionService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('modal should close', () => {
    jest.spyOn(component, 'hideModal');
    jest.spyOn(component.addPermissionModal, 'close');
    component.hideModal();
    expect(component.addPermissionModal.close).toHaveBeenCalled();
  });

  it('shold call addPermission', () => {
    jest.spyOn(component, 'addPermission');
    jest.spyOn(component.addPermissionModal, 'close');
    component.addPermission();
    expect(component.addPermissionModal.close).toHaveBeenCalled();
  });

});
