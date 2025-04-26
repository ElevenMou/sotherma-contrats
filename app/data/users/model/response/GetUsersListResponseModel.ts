import type { UserDetailsModel } from "./UserDetailsModel";

export interface GetUsersListResponseModel {
  totalCount: number;
  usersList: Array<UserDetailsModel>;
}
