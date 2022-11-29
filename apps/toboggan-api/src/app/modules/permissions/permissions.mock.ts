import { IPermission } from '@toboggan-ws/toboggan-common';

const permissions: IPermission[] = [];
const accessLevels = [
  'View',
  'Create',
  'Edit',
  'Reset Password',
  'Activate/Deactivate',
  'Archive',
  'Change Color',
  'Publish',
];
const modules = [
  'User',
  'User Groups',
  'Permissions',
  'Learning Resource',
  'Content Object',
  'Learning Experience',
  'Assessment Item',
];
const groupList = [
  'Content Management',
  'Content Authoring',
  'Assessment Authoring',
];
// generate mocked data for 20 users
for (let i = 0, j = 0, k = 0, m = 0; i < 20; i++) {
  if (j == accessLevels.length) j = 0;
  if (k == modules.length) k = 0;
  if (m + 1 == groupList.length) m = 0;

  const groups = [
    {
      id: `group-id-${i}`,
      name: groupList[m],
      description: '',
      uuid: `group-id-${i}`,
      members: [],
      permissions: [],
    },
    {
      id: `group-id-${i + 1}`,
      name: groupList[m + 1],
      description: '',
      uuid: `group-id-${i}`,
      members: [],
      permissions: [],
    },
  ];
  if (i < 5) {
    permissions.push({
      id: `id-${i}`,
      application: 'A1',
      module: modules[k],
      accessLevel: accessLevels[j],
      userGroups: groups,
    });
  } else {
    permissions.push({
      id: `id-${i}`,
      application: 'BApplication Admin',
      module: modules[k],
      accessLevel: accessLevels[j],
      userGroups: groups,
    });
  }

  j++;
  k++;
  m++;
}
export const mockPermissions = permissions;
