export interface BaseResponseModel {
  totalCount: number;
}

type ListData<T, ListLabel extends string> = {
  [key in ListLabel]: Array<T>;
};

export type ListResponseModel<T, ListLabel extends string> = BaseResponseModel &
  ListData<T, ListLabel>;
