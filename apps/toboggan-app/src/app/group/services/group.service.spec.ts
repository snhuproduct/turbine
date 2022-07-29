import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GroupService } from './group.service';



describe('GroupService', () => {
  let service: GroupService;
  let httpClientSpy: jest.SpyInstance;

  beforeEach(() => {
    httpClientSpy = jest.spyOn('HttpClient', 'get'|'post'|'put');
    TestBed.configureTestingModule({
      providers: [ { provide: HttpClient, useValue: httpClientSpy }]
    });
    service = TestBed.inject(GroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
