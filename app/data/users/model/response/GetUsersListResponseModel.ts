import type { GetUserDetailsResponseModel } from "./GetUserDetailsResponseModel";

export interface GetUsersListResponseModel {
  totalCount: number;
  usersList: Array<GetUserDetailsResponseModel>;
}
