export interface GetDepartmentManagementUsersListModel {
  validatorsList: GetDepartmentManagementUsersListItemModel[];
  hrList: GetDepartmentManagementUsersListItemModel[];
}

export interface GetDepartmentManagementUsersListItemModel {
  userId: number;
  userFullName: string;
  userSite: string;
}
