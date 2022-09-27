import { mockUsers } from './usersMock';

describe('Users mock data', () => {
  it('should be defined', () => {
    expect(mockUsers).toBeDefined();
  });

  it('should contain 20 mock users', () => {
    expect(mockUsers().length).toBe(20);
  });
});
