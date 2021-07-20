import { QueryClient, useQuery } from 'react-query';

import { getUser, getUsers } from 'src/client/api/UserApi';
import { UserRole } from 'src/commons/constants/roles';
import { User } from 'src/commons/types/User.type';

const GET_MEMBERS_KEY = 'GET_MEMBERS_KEY';
const GET_USER_KEY = 'GET_USER_KEY';

export function useGetMembers(searchKey?: string) {
  return useQuery([GET_MEMBERS_KEY, searchKey], () =>
    getUsers({
      q: searchKey,
      role: UserRole.MEMBER,
    })
  );
}

export function useGetUser(id?: string | null) {
  return useQuery([GET_USER_KEY, id], () => getUser(id as string), {
    enabled: Boolean(id),
  });
}

export function updateUserQueryData(queryClient: QueryClient, data: User) {
  queryClient.setQueryData(
    [GET_USER_KEY, data.id],
    (old: User | undefined) => ({
      ...(old || {}),
      ...data,
    })
  );
}

export function updateUsersQueryData(
  queryClient: QueryClient,
  data: User,
  searchKey?: string
) {
  queryClient.setQueryData(
    [GET_MEMBERS_KEY, searchKey],
    (old: User[] | undefined) =>
      (old || []).map((o) => {
        if (o.id === data.id) {
          return data;
        }

        return o;
      })
  );
}

export function addUsersQueryData(
  queryClient: QueryClient,
  data: User,
  searchKey?: string
) {
  queryClient.setQueryData(
    [GET_MEMBERS_KEY, searchKey],
    (old: User[] | undefined) => [...(old || []), data]
  );
}

export function removeUsersQueryData(
  queryClient: QueryClient,
  data: User,
  searchKey?: string
) {
  queryClient.setQueryData(
    [GET_MEMBERS_KEY, searchKey],
    (old: User[] | undefined) =>
      [...(old || [])].filter((o) => o.id !== data.id)
  );
}
