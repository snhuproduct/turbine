import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { GroupService } from './group.service';

describe('GroupService', () => {
  let service: GroupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GroupService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  describe('Group Service', () => {
    it('should have called api for fetching groups', () => {
      service.fetchGroups().subscribe();
      const req = httpMock.expectOne(`/api/groups`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });
    it('should have called api for create group', () => {
      const group: Partial<IGroup> = {
        uuid: '2AE9GWE5E1A9',
        name: 'Admin',
        description: '',
        members: [],
        permissions: [],
      };
      service.createGroup(group).subscribe();
      const req = httpMock.expectOne(`/api/groups`);
      expect(req.request.method).toBe('POST');
      req.flush(group);
    });

    it('should have called api for update group', async () => {
      const group: Partial<IGroup> = {
        uuid: '2AE9GWE5E1A9',
        name: 'Admin',
        description: '',
        members: [],
        permissions: [],
      };
      setTimeout(() => {
        const req = httpMock.expectOne('/api/groups/:' + group.uuid);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toBe(group);
        req.flush(group);
        httpMock.verify();
      });
    });

    it('should have called api for add user to group', () => {
      const group: IGroup = {
        uuid: '2AE9GWE5E1A9',
        name: 'Admin',
        description: '',
        members: [],
        permissions: [],
      };
      const userEmail = 'user@sada.com';
      const mockRequest = {
        groupId: group.uuid,
        user: userEmail,
      };
      service.addUsertoGroup(group.uuid as string, userEmail).subscribe();
      const req = httpMock.expectOne('/api/groups/addusertogroup');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toStrictEqual(mockRequest);
      req.flush(group);
    });
  });
});
