export interface IFilterParams {
  page: number;
  status: string;
  sort_by: string;
  search_query?: string;
  isValid: boolean;
}

export interface IFilterMoviesState {
  params: IFilterParams;
}
