import { v4 as uuidv4 } from 'uuid';

export const mockUsers = () => {
  const users = [];

  for (let i = 0; i < 20; i++) {
    users.push({
      id: uuidv4(),
      userName: `user${i}`,
      firstName: `name${i}`,
      lastName: `last${i}`,
      email: `user-${i}@sada.com`
    });
  }

  return users;
};
