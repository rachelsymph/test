import { Give } from 'src/commons/types/Give.type';
import { findDonor, findGives, findPlatform, findRecipient } from 'src/server/models';

type GetServiceParams = {
  cursor: string;
};

export async function getServices(params: GetServiceParams) {
  const { cursor } = params;

  const { results: gives, cursor: nextCursor } = await findGives({}, {
    cursor,
    shouldPaginate: true,
    modifyQuery: (query) => query.order('dateCreated', {
      descending: true
    }),
  });

  const data = await Promise.all(gives.map(transformGive));

  return {
    data,
    nextCursor,
  };
}

export async function transformGive(give: Give) {
  const platform = await findPlatform({
    legacyId: give.platformLegacyId as string,
  });

  const donor = await findDonor({
    legacyId: give.donorLegacyId as string,
  });

  const recipient = await findRecipient({
    legacyId: give.recipientLegacyId as string,
  });

  return {
    ...give,
    donor,
    platform,
    recipient,
  };
}
