import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from "@angular/router/testing";
import {
  StoriesModule
} from '@snhuproduct/toboggan-ui-components-library';
import { ListUsersComponent } from '../../components/list-users/list-users.component';
import { GroupDetailsPageComponent } from './group-details-page.component';
describe('GroupDetailsPageComponent', () => {
  let component: GroupDetailsPageComponent;
  let fixture: ComponentFixture<GroupDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler],
      imports: [StoriesModule, BrowserModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [GroupDetailsPageComponent, ListUsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
