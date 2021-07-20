export type DeleteItemResponse = {
  data: {
    id: string;
  };
  message: string;
};

export type ApiResponse<T> = {
  data: T;
  message: string;
};
