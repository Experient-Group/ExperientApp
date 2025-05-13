export type User = {
  username: string;
  active: boolean;
  roleId: number;
  dateCreated: string;
  dateModified: string;
  lastName: string;
  firstName: string;
  displayName: string;
  jiraUsername: string;
  intactUserId: string;
  userId: number;
  emailAddress: string;
  openAtCurWeeksTimesheet: boolean;
  activeInterviewer: boolean;
  createIntacctTimesheet: boolean;
  roleName: string;
};

export const mockUser = {
  username: "VShah",
  active: true,
  roleId: 20,
  dateCreated: "2018-03-02T00:00:00.000Z",
  dateModified: "2018-03-02T00:00:00.000Z",
  lastName: "Shah",
  firstName: "Viraj",
  displayName: "Viraj Shah",
  jiraUsername: "viraj.shah",
  intactUserId: "EE-00112",
  userId: 41,
  emailAddress: "vshah@experient.com",
  openAtCurWeeksTimesheet: true,
  activeInterviewer: true,
  createIntacctTimesheet: true,
  roleName: "Developer",
} as User;
