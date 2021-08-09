import dateFormat from 'dateformat';

import { DATE_FORMAT } from 'src/commons/constants/masks';

import { Give } from 'src/commons/types/Give.type';

export function transformToTable(give: Give) {
  return {
    ...give,
    dateCreated: dateFormat(give.dateCreated, DATE_FORMAT),
    donor: give.donor?.email,
    recipient: give.recipient?.name,
    platform: give.platform?.name,
  };
}
