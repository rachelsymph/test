import { message } from 'antd';
import get from 'lodash.get';

import { Indexable } from '../types/Indexable.type';

export const GLOBAL_QUERY_CONFIG = {
  queries: {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: 0,
  },
  mutations: {
    onSuccess: (data: unknown) => {
      message.success((data as Indexable).message);
    },
    onError: (error: unknown) => {
      const errorMessage = get(
        error,
        'response.data.error.message',
        'Oops! Something went wrong.'
      );

      message.error(errorMessage);
    },
  },
};
