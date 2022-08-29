import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SharedModule } from '../../../shared/shared.module';
import { AddUsersComponent } from '../../components/add-users/add-users.component';
import { ListUsersComponent } from '../../components/list-users/list-users.component';
import { GroupDetailsPageComponent } from './group-details-page.component';
describe('GroupDetailsPageComponent', () => {
  let component: GroupDetailsPageComponent;
  let fixture: ComponentFixture<GroupDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
      imports: [
        StoriesModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule,
        ReactiveFormsModule,
        TypeaheadModule.forRoot(),
      ],
      declarations: [
        GroupDetailsPageComponent,
        ListUsersComponent,
        AddUsersComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open add user modal', () => {
    const addUserBtn = fixture.debugElement.query(
      By.css('.add-user-group-btn')
    ).nativeElement;
    addUserBtn.click();
    fixture.detectChanges();
    expect(component.showAddUserModal).toBeTruthy();
  });
});
