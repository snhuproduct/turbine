import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { SharedModule } from '../../../shared/shared.module';

import { UpdatePermissionComponent } from './update-permission.component';

describe('UpdatePermissionComponent', () => {
  let component: UpdatePermissionComponent;
  let fixture: ComponentFixture<UpdatePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, StoriesModule, HttpClientModule, SharedModule],
      providers: [HttpClient, HttpHandler],
      declarations: [ UpdatePermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
