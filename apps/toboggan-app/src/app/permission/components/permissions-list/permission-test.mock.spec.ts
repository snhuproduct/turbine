import { mockPermissions } from './permission-test.mock';

describe('Permission mock data', () => {
  it('should be defined', () => {
    expect(mockPermissions).toBeDefined();
  });

  it('should contain 20 mock permissions', () => {
    expect(mockPermissions.length).toBe(20);
  });
});
