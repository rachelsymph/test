import { useQuery } from 'react-query';

import { getGives } from 'src/client/api/GiveApi';

export const GET_GIVES_KEY = 'GET_GIVES_KEY';

export function useGetGives(cursor?: string) {
  return useQuery([GET_GIVES_KEY, cursor], () => getGives({ cursor }));
}
