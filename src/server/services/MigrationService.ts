import { CustomRegex } from 'src/commons/types/CustomRegex.type';
import { Donor } from 'src/commons/types/Donor.type';
import { Give } from 'src/commons/types/Give.type';
import { Platform } from 'src/commons/types/Platform.type';
import { Recipient } from 'src/commons/types/Recipient.type';
import { parseDate } from 'src/commons/utils/DateUtils';
import {
  DonorService,
  GiveService,
  PlatformAmountRegexService,
  PlatformRecipientRegexService,
  PlatformService,
  RecipientService,
} from 'src/server/legacy/services';
import {
  batchUpsertCustomRegexes,
  batchUpsertDonors,
  batchUpsertPlatforms,
  batchUpsertRecipients,
  batchUpsertGives,
} from 'src/server/models';

const NUMBER_OF_RECORDS_PER_BATCH = 200;

export async function migrateDonors(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const donorService = new DonorService();
  const donors = await donorService.getPaginated({
    n,
    page,
  });

  const donorsTransformed: Partial<Donor>[] = donors.map((donor) => {
    const legacyId = donor.id.toString();

    return {
      legacyId,
      avatar: donor.avatar,
      bio: donor.bio,
      birthday: donor.birthday,
      city: donor.city,
      currentSignInAt: parseDate(donor.current_sign_in_at) as Date,
      currentSignInIp: donor.current_sign_in_ip,
      dateCreated: parseDate(donor.created_at) as Date,
      dateUpdated: parseDate(donor.updated_at) as Date,
      descriptionCurrent: donor.description_current,
      descriptionFirst: donor.description_first,
      descriptionPrevious: donor.description_previous,
      email: donor.email,
      encryptedPassword: donor.encrypted_password,
      ethnicityOther: donor.ethnicity_other,
      genderOther: donor.gender_other,
      isAlternateEmail: donor.alternate_email,
      isDeleted: donor.archived,
      lastSignInAt: parseDate(donor.last_sign_in_at) as Date,
      lastSignInIp: donor.last_sign_in_ip,
      movementBgColor: donor.movement_bg_color,
      name: donor.name,
      occupation: donor.occupation,
      registrationToken: donor.registration_token,
      rememberCreatedAt: parseDate(donor.remember_created_at) as Date,
      resetPasswordSentAt: parseDate(donor.reset_password_sent_at) as Date,
      resetPasswordToken: donor.reset_password_token,
      signInCount: donor.sign_in_count,
      state: donor.state,
      zip: donor.zip_code,
    };
  });

  await batchUpsertDonors(donorsTransformed as Donor[]);

  return {
    count: donors.length,
    data: {
      donors,
    },
  };
}


export async function migrateGives(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const giveService = new GiveService();
  const gives = await giveService.getPaginated({
    n,
    page,
  });

  const givesTransformed: Partial<Give>[] = gives.map((give) => {
    const legacyId = give.id.toString();
    const donorLegacyId = give.donor_id?.toString();
    const platformLegacyId = give.platform_id?.toString();
    const recipientLegacyId = give.recipient_id?.toString();
    const processUserLegacyId = give.process_user_id?.toString();

    return {
      legacyId,
      donorLegacyId,
      platformLegacyId,
      processUserLegacyId,
      recipientLegacyId,
      amount: give.amount,
      dateCreated: parseDate(give.created_at) as Date,
      dateUpdated: parseDate(give.updated_at) as Date,
      detailEntry: give.detail_entry,
      endDate: parseDate(give.end_date) as Date,
      frequency: give.frequency,
      fromEmail: give.from_email,
      fromName: give.from_name,
      giveCount: give.give_count,
      giveCountTotal: give.give_count_total,
      giveDate: parseDate(give.give_dt) as Date,
      headers: give.headers,
      htmlBody: give.html_body,
      isDeleted: give.archived,
      isFeatured: give.featured,
      isRecurring: give.recurring,
      processDate: parseDate(give.process_dt) as Date,
      rawData: give.raw_data,
      splitAmount: give.split_amount,
      splitTaxDeductible: give.split_tax_deductible,
      splitType: give.split_type,
      splitUnit: give.split_unit,
      startDate: parseDate(give.start_date) as Date,
      status: give.status,
      subject: give.subject,
      taxDeductible: give.tax_deductible,
      textBody: give.text_body,
      timezone: give.timezone,
      unit: give.unit,
    };
  });

  await batchUpsertGives(givesTransformed as Give[]);

  return {
    count: gives.length,
    data: {
      gives,
    },
  };
}

export async function migratePlatforms() {
  const platformService = new PlatformService();
  const platforms = await platformService.getAll();
  const platformsTransformed: Partial<Platform>[] = platforms.map((platform) => {
    const legacyId = platform.id.toString();

    return {
      legacyId,
      dateCreated: parseDate(platform.created_at) as Date,
      dateUpdated: parseDate(platform.updated_at) as Date,
      domainName: platform.domain_name,
      isDeleted: platform.archived,
      isSyncing: platform.is_syncing,
      lastSyncDate: parseDate(platform.last_sync_date) as Date,
      name: platform.name,
      platformCompanyTypes: platform.platform_company_type as unknown as string[],
      platformStatusTypes: platform.platform_status_type as unknown as string[],
      platformTypes: platform.platform_type as unknown as string[],
      slug: platform.slug,
      website: platform.website,
    };
  });

  await batchUpsertPlatforms(platformsTransformed as Platform[]);

  return {
    count: platforms.length,
    data: {
      platforms,
    },
  };
}

export async function migrateRecipients(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const recipientService = new RecipientService();
  const recipients = await recipientService.getPaginated({
    n,
    page,
  });

  const recipientsTransformed: Partial<Recipient>[] = recipients.map((recipient) => {
    const legacyId = recipient.id.toString();
    const guideStarOrgLegacyId = recipient.guidestar_org_id?.toString();
    const parentRecipientLegacyId = recipient.parent_recipient_id?.toString();

    return {
      legacyId,
      guideStarOrgLegacyId,
      parentRecipientLegacyId,
      adjective: recipient.adjective,
      createdBy: recipient.created_by,
      currentSignInAt: parseDate(recipient.current_sign_in_at) as Date,
      currentSignInIp: recipient.current_sign_in_ip,
      dateCreated: parseDate(recipient.created_at) as Date,
      dateUpdated: parseDate(recipient.updated_at) as Date,
      domainName: recipient.domain_name,
      email: recipient.email,
      encryptedPassword: recipient.encrypted_password,
      isDeleted: recipient.archived,
      isSyncing: recipient.is_syncing,
      lastSignInAt: parseDate(recipient.last_sign_in_at) as Date,
      lastSignInIp: recipient.last_sign_in_ip,
      lastSyncDate: recipient.last_sync_date,
      name: recipient.name,
      ogDescription: recipient.og_description,
      ogTitle: recipient.og_title,
      recipientTypes: recipient.recipient_type as unknown as string[],
      rememberCreatedAt: parseDate(recipient.remember_created_at) as Date,
      resetPasswordSentAt: parseDate(recipient.reset_password_sent_at) as Date,
      resetPasswordToken: recipient.reset_password_token,
      signInCount: recipient.sign_in_count,
      slug: recipient.slug,
      taxid: recipient.taxid,
      website: recipient.website,
    };
  });

  await batchUpsertRecipients(recipientsTransformed as Recipient[]);

  return {
    count: recipients.length,
    data: {
      recipients,
    },
  };
}

export async function migrateRegexes() {
  const platformAmountRegexService = new PlatformAmountRegexService();
  const platformRecipientRegexService = new PlatformRecipientRegexService();

  const amountRegexes = await platformAmountRegexService.getAll();
  const recipientRegexes = await platformRecipientRegexService.getAll();

  const amountRegexesTransformed: Partial<CustomRegex>[] = amountRegexes.map((regexItem) => {
    const platformLegacyId = regexItem.platform_id?.toString();
    const legacyId = regexItem.id.toString();

    return {
      legacyId,
      platformLegacyId,
      destinationKey: 'amount',
      isDeleted: false,
      pattern: regexItem.regex,
      tags: ['Amount', 'Platform Amount Regexes', platformLegacyId].map((s) => s.toUpperCase()),
    };
  });

  const recipientRegexesTransformed: Partial<CustomRegex>[] = recipientRegexes.map((regexItem) => {
    const platformLegacyId = regexItem.platform_id?.toString();
    const legacyId = regexItem.id.toString();

    return {
      legacyId,
      platformLegacyId,
      destinationKey: 'recipientName',
      isDeleted: false,
      pattern: regexItem.regex,
      tags: ['Recipient', 'Platform Recipient Regexes', platformLegacyId,].map((s) => s.toUpperCase()),
    };
  });

  await batchUpsertCustomRegexes(amountRegexesTransformed as CustomRegex[], {
    destinationKey: 'amount',
  });

  await batchUpsertCustomRegexes(recipientRegexesTransformed as CustomRegex[], {
    destinationKey: 'recipientName',
  });

  return {
    count: amountRegexes.length + recipientRegexes.length,
    data: {
      amountRegexes,
      recipientRegexes,
    },
  };
}
