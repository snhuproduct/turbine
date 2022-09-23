import { v4 as uuidv4 } from 'uuid';

export const mockGroups = () => {
  const groups = [];

  for (let i = 0; i < 15; i++) {
    groups.push({
      id: uuidv4(),
      name: `Optional group-${i}`,
      description: `group data ${i}`,
    });
  }

  return groups;
};
