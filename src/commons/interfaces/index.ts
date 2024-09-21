export interface ApiResponse<T> {
  data: T;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  paginate?: Partial<PaginateInterface>
}

export interface PaginateInterface {
  totalElements: number;
  totalPages: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
}
