export type DeleteItemResponse = {
  data: {
    id: string;
  };
  message: string;
};

export type ApiResponse<T> = {
  data: T;
  cursor: string;
  message: string;
};

export type FindResponse<T> = {
  cursor?: string | null;
  results: T[];
};
