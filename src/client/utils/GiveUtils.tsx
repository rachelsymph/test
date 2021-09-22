import { types } from 'util';

import dateFormat from 'dateformat';

import { DATE_FORMAT } from 'src/commons/constants/masks';

import {
  Give,
  GiveType,
  GiveSummary,
  Platform,
  PlatformCount,
  Recipient,
} from 'src/commons/types';
import { ApiResponse } from 'src/commons/types/Response.type';

export function transformToTable(give: Give) {
  return {
    ...give,
    dateCreated: dateFormat(give.dateCreated, DATE_FORMAT),
    donor: give.donor?.email,
    note: 'See Note',
    contributed: give.amount || 0,
    recipient: give.recipient?.name,
    platform: give.platform?.name,
  };
}

export function getYearlyGives(gives: Give[]) {
  const yearlyGivesSummary: GiveSummary[] = [];
  const years: string[] = [];
  gives?.forEach(function (give) {
    const dateInString = String(give.giveDate);
    const date = new Date(dateInString);
    const year = String(date.getFullYear());
    if (year && years.includes(year)) {
      const existingGiveIndex = yearlyGivesSummary.findIndex(
        (existingGive) => existingGive.year == year
      );
      yearlyGivesSummary[existingGiveIndex].totalAmountOfGives += Number(
        give.amount
      );
    } else if (year) {
      yearlyGivesSummary.push({
        totalAmountOfGives: Number(give.amount),
        year,
      });
      years.push(year);
    }
  });
  return yearlyGivesSummary;
}

export function getTypeGives(gives: Give[]) {
  const typesOfGivingData: GiveType[] = [];
  gives?.forEach(function (give) {
    const typesOfGiving: string[] = [];
    const platform = give.platform;
    const giveType = String(platform?.platformTypes);
    if (typesOfGiving.includes(giveType)) {
      const existingGiveTypeDataIndex = typesOfGivingData.findIndex(
        (existingGive) => existingGive.giveType == giveType
      );
      typesOfGivingData[existingGiveTypeDataIndex].count += 1;
    } else if (giveType) {
      typesOfGivingData.push({
        giveType,
        count: 1,
      });
      typesOfGiving.push(giveType);
    }
  });

  return typesOfGivingData;
}

export function getAggregatedData(gives: Give[] | undefined) {
  const recipientGivesSummary: GiveSummary[] = [];
  const topPlatforms: PlatformCount[] = [];

  const platforms: Platform[] = [];
  const recipients: Recipient[] = [];

  gives?.forEach(function (give) {
    const platform = give.platform;
    const recipient = give.recipient;
    if (recipient && recipients.includes(recipient)) {
      const existingGiveIndex = recipientGivesSummary.findIndex(
        (existingGive) => existingGive.recipient == recipient
      );
      const currentNumberOfGives =
        recipientGivesSummary[existingGiveIndex].numberOfGives;
      recipientGivesSummary[existingGiveIndex].numberOfGives =
        Number(currentNumberOfGives) + 1;
      recipientGivesSummary[existingGiveIndex].totalAmountOfGives += Number(
        give.amount
      );
    } else if (recipient) {
      recipientGivesSummary.push({
        numberOfGives: 1,
        recipient,
        totalAmountOfGives: Number(give.amount),
      });
      recipients.push(recipient);
    }

    if (platform && platforms.includes(platform)) {
      const existingPlatformDataIndex = topPlatforms.findIndex(
        (existingPlatform) => existingPlatform.platform == platform
      );
      topPlatforms[existingPlatformDataIndex].count += 1;
    } else if (platform) {
      topPlatforms.push({
        platform,
        count: 1,
      });
      platforms.push(platform);
    }
  });
  return {
    recipientGivesSummary,
    topPlatforms,
  };
}
