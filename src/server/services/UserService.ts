import { User } from 'src/commons/types/User.type';
import { generateKeywords } from 'src/commons/utils/StringUtils';
import {
  batchUpdateUsers as batchUpdateUsersModel,
  createUser as createUserModel,
  updateUser as updateUserModel,
} from 'src/server/models/UserModel';
import { cleanUserData } from 'src/server/utils/UserUtils';


export async function createUser(params: Partial<User>) {
  const cleanedData = cleanUserData(params);
  const name = `${cleanedData.firstName} ${cleanedData.lastName}`;

  return createUserModel(({
    ...cleanedData,
    keywords: generateKeywords(name),
    dateCreated: new Date(),
    dateUpdated: new Date(),
  } as unknown) as User);
}

export async function updateUser(params: Partial<User>) {
  const cleanedData = cleanUserData(params);
  const name = `${cleanedData.firstName} ${cleanedData.lastName}`;

  return updateUserModel(({
    ...cleanedData,
    keywords: generateKeywords(name),
  } as unknown) as User);
}

export async function batchUpdateUsers(params: Partial<User>[]) {
  const cleanedParams = params.map(cleanUserData);

  return batchUpdateUsersModel(cleanedParams);
}
