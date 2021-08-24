import {
  AlternateEmail,
  CustomRegex,
  Donor,
  DonorEthnicity,
  DonorGender,
  DonorGroup,
  DonorLinkedAccount,
  DonorStat,
  Ethnicity,
  FriendlyIdSlug,
  Gender,
  Give,
  GiveTag,
  Goal,
  Group,
  GroupGive,
  GroupRecipient,
  Image,
  Moment,
  Organization,
  Page,
  PageRecipient,
  PersonalPractice,
  PersonalReflection,
  Platform,
  PlatformStat,
  Recipient,
  RecipientStat,
  Tag,
  User,
} from 'src/commons/types';

import { parseDate } from 'src/commons/utils/DateUtils';
import {
  AlternateEmailService,
  DonorEthnicityService,
  DonorGenderService,
  DonorGroupService,
  DonorLinkedAccountService,
  DonorService,
  DonorStatService,
  EthnicityService,
  FriendlyIdSlugService,
  GenderService,
  GiveService,
  GiveTagService,
  GoalService,
  GroupGiveService,
  GroupRecipientService,
  GroupService,
  ImageService,
  MomentService,
  OrganizationService,
  PageRecipientService,
  PageService,
  PersonalPracticeService,
  PersonalReflectionService,
  PlatformAmountRegexService,
  PlatformRecipientRegexService,
  PlatformService,
  PlatformStatService,
  RecipientService,
  RecipientStatService,
  TagService,
  UserService,
} from 'src/server/legacy/services';
import {
  batchUpsertAlternateEmails,
  batchUpsertCustomRegexes,
  batchUpsertDonorEthnicities,
  batchUpsertDonorGenders,
  batchUpsertDonorGroups,
  batchUpsertDonorLinkedAccounts,
  batchUpsertDonors,
  batchUpsertDonorStats,
  batchUpsertEthnicities,
  batchUpsertFriendlyIdSlugs,
  batchUpsertGenders,
  batchUpsertGives,
  batchUpsertGiveTags,
  batchUpsertGoals,
  batchUpsertGroupGives,
  batchUpsertGroupRecipients,
  batchUpsertGroups,
  batchUpsertImages,
  batchUpsertMoments,
  batchUpsertOrganizations,
  batchUpsertPageRecipients,
  batchUpsertPages,
  batchUpsertPersonalPractices,
  batchUpsertPersonalReflections,
  batchUpsertPlatforms,
  batchUpsertPlatformStats,
  batchUpsertRecipients,
  batchUpsertRecipientStats,
  batchUpsertTags,
  batchUpsertUsers,
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
      platformCompanyTypes: platform.platform_company_type,
      platformStatusTypes: platform.platform_status_type,
      platformTypes: platform.platform_type,
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
      recipientTypes: recipient.recipient_type,
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
      tags: ['Recipient', 'Platform Recipient Regexes', platformLegacyId].map((s) => s.toUpperCase()),
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

export async function migrateAlternateEmails(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const alternateEmailService = new AlternateEmailService();
  const alternateEmails = await alternateEmailService.getPaginated({
    n,
    page,
  });

  const alternateEmailsTransformed: Partial<AlternateEmail>[] = alternateEmails.map((alternateEmail) => {
    const legacyId = alternateEmail.id.toString();
    const donorLegacyId = alternateEmail.donor_id?.toString();

    return {
      donorLegacyId,
      legacyId,
      dateCreated: parseDate(alternateEmail.created_at) as Date,
      dateUpdated: parseDate(alternateEmail.updated_at) as Date,
      email: alternateEmail.email,
      expirationDate: parseDate(alternateEmail.expiry) as Date,
      isPrimary: alternateEmail.is_primary,
      isVerified: alternateEmail.verified,
      token: alternateEmail.token,
    };
  });

  await batchUpsertAlternateEmails(alternateEmailsTransformed as AlternateEmail[]);

  return {
    count: alternateEmails.length,
    data: {
      alternateEmails,
    },
  };
}

export async function migrateDonorEthnicities(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const donorEthnicityService = new DonorEthnicityService();
  const donorEthnicities = await donorEthnicityService.getPaginated({
    n,
    page,
  });

  const donorEthnicitiesTransformed: Partial<DonorEthnicity>[] = donorEthnicities.map((donorEthnicity) => {
    const legacyId = donorEthnicity.id.toString();
    const donorLegacyId = donorEthnicity.donor_id?.toString();

    return {
      donorLegacyId,
      legacyId,
      dateCreated: parseDate(donorEthnicity.created_at) as Date,
      dateUpdated: parseDate(donorEthnicity.updated_at) as Date,
      specifics: donorEthnicity.specifics,
    };
  });

  await batchUpsertDonorEthnicities(donorEthnicitiesTransformed as DonorEthnicity[]);

  return {
    count: donorEthnicities.length,
    data: {
      donorEthnicities,
    },
  };
}

export async function migrateDonorGenders(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const donorGenderService = new DonorGenderService();
  const donorGenders = await donorGenderService.getPaginated({
    n,
    page,
  });

  const donorGendersTransformed: Partial<DonorGender>[] = donorGenders.map((donorGender) => {
    const legacyId = donorGender.id.toString();
    const donorLegacyId = donorGender.donor_id?.toString();
    const genderLegacyId = donorGender.gender_id?.toString();

    return {
      donorLegacyId,
      genderLegacyId,
      legacyId,
      dateCreated: parseDate(donorGender.created_at) as Date,
      dateUpdated: parseDate(donorGender.updated_at) as Date,
    };
  });

  await batchUpsertDonorGenders(donorGendersTransformed as DonorGender[]);

  return {
    count: donorGenders.length,
    data: {
      donorGenders,
    },
  };
}

export async function migrateDonorGroups(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const donorGroupService = new DonorGroupService();
  const donorGroups = await donorGroupService.getPaginated({
    n,
    page,
  });

  const donorGroupsTransformed: Partial<DonorGroup>[] = donorGroups.map((donorGroup) => {
    const legacyId = donorGroup.id.toString();
    const donorLegacyId = donorGroup.donor_id?.toString();
    const groupLegacyId = donorGroup.group_id?.toString();

    return {
      donorLegacyId,
      groupLegacyId,
      legacyId,
      dateCreated: parseDate(donorGroup.created_at) as Date,
      dateUpdated: parseDate(donorGroup.updated_at) as Date,
      isAccepted: donorGroup.accepted,
      isAdmin: donorGroup.admin,
      note: donorGroup.note,
      roles: donorGroup.roles,
      tags: donorGroup.tags,
      types: donorGroup.types,
    };
  });

  await batchUpsertDonorGroups(donorGroupsTransformed as DonorGroup[]);

  return {
    count: donorGroups.length,
    data: {
      donorGroups,
    },
  };
}

export async function migrateDonorLinkedAccounts(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const donorLinkedAccountService = new DonorLinkedAccountService();
  const donorLinkedAccounts = await donorLinkedAccountService.getPaginated({
    n,
    page,
  });

  const donorLinkedAccountsTransformed: Partial<DonorLinkedAccount>[] = donorLinkedAccounts.map((donorLinkedAccount) => {
    const legacyId = donorLinkedAccount.id.toString();
    const donorLegacyId = donorLinkedAccount.donor_id?.toString();
    const donorAccountLegacyId = donorLinkedAccount.donor_account_id?.toString();

    return {
      donorAccountLegacyId,
      donorLegacyId,
      legacyId,
      dateCreated: parseDate(donorLinkedAccount.created_at) as Date,
      dateUpdated: parseDate(donorLinkedAccount.updated_at) as Date,
      email: donorLinkedAccount.email,
      isVerified: donorLinkedAccount.verified,
      token: donorLinkedAccount.token,
    };
  });

  await batchUpsertDonorLinkedAccounts(donorLinkedAccountsTransformed as DonorLinkedAccount[]);

  return {
    count: donorLinkedAccounts.length,
    data: {
      donorLinkedAccounts,
    },
  };
}

export async function migrateDonorStats(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const donorStatService = new DonorStatService();
  const donorStats = await donorStatService.getPaginated({
    n,
    page,
  });

  const donorStatsTransformed: Partial<DonorStat>[] = donorStats.map((donorStat) => {
    const legacyId = donorStat.id.toString();
    const donorLegacyId = donorStat.donor_id?.toString();

    return {
      donorLegacyId,
      legacyId,
      amountTotalDollars: donorStat.amount_total_dollars,
      amountTotalHours: donorStat.amount_total_hours,
      dateCreated: parseDate(donorStat.created_at) as Date,
      dateUpdated: parseDate(donorStat.updated_at) as Date,
      gives: donorStat.gives,
      month: donorStat.month,
      year: donorStat.year,
    };
  });

  await batchUpsertDonorStats(donorStatsTransformed as DonorStat[]);

  return {
    count: donorStats.length,
    data: {
      donorStats,
    },
  };
}

export async function migrateEthnicities(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const ethnicityService = new EthnicityService();
  const ethnicities = await ethnicityService.getPaginated({
    n,
    page,
  });

  const ethnicitiesTransformed: Partial<Ethnicity>[] = ethnicities.map((ethnicity) => {
    const legacyId = ethnicity.id.toString();
    const donorLegacyId = ethnicity.donor_id?.toString();

    return {
      donorLegacyId,
      legacyId,
      dateCreated: parseDate(ethnicity.created_at) as Date,
      dateUpdated: parseDate(ethnicity.updated_at) as Date,
      name: ethnicity.name,
      sortOrder: ethnicity.sort_order,
    };
  });

  await batchUpsertEthnicities(ethnicitiesTransformed as Ethnicity[]);

  return {
    count: ethnicities.length,
    data: {
      ethnicities,
    },
  };
}

export async function migrateFriendlyIdSlugs(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const friendlyIdSlugService = new FriendlyIdSlugService();
  const friendlyIdSlugs = await friendlyIdSlugService.getPaginated({
    n,
    page,
  });

  const friendlyIdSlugsTransformed: Partial<FriendlyIdSlug>[] = friendlyIdSlugs.map((friendlyIdSlug) => {
    const legacyId = friendlyIdSlug.id.toString();
    const sluggableLegacyId = friendlyIdSlug.sluggable_id?.toString();

    return {
      sluggableLegacyId,
      legacyId,
      dateCreated: parseDate(friendlyIdSlug.created_at) as Date,
      dateUpdated: new Date(),
      scope: friendlyIdSlug.scope,
      slug: friendlyIdSlug.slug,
      sluggableType: friendlyIdSlug.sluggable_type,
    };
  });

  await batchUpsertFriendlyIdSlugs(friendlyIdSlugsTransformed as FriendlyIdSlug[]);

  return {
    count: friendlyIdSlugs.length,
    data: {
      friendlyIdSlugs,
    },
  };
}

export async function migrateGenders(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const genderService = new GenderService();
  const genders = await genderService.getPaginated({
    n,
    page,
  });

  const gendersTransformed: Partial<Gender>[] = genders.map((gender) => {
    const legacyId = gender.id.toString();

    return {
      legacyId,
      dateCreated: parseDate(gender.created_at) as Date,
      dateUpdated: parseDate(gender.updated_at) as Date,
      name: gender.name,
      sortOrder: gender.sort_order,
    };
  });

  await batchUpsertGenders(gendersTransformed as Gender[]);

  return {
    count: genders.length,
    data: {
      genders,
    },
  };
}

export async function migrateGiveTags(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const giveTagService = new GiveTagService();
  const giveTags = await giveTagService.getPaginated({
    n,
    page,
  });

  const giveTagsTransformed: Partial<GiveTag>[] = giveTags.map((giveTag) => {
    const legacyId = giveTag.id.toString();
    const giveLegacyId = giveTag.give_id?.toString();
    const tagLegacyId = giveTag.tag_id?.toString();

    return {
      legacyId,
      tagLegacyId,
      giveLegacyId,
    };
  });

  await batchUpsertGiveTags(giveTagsTransformed as GiveTag[]);

  return {
    count: giveTags.length,
    data: {
      giveTags,
    },
  };
}

export async function migrateGoals(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const goalService = new GoalService();
  const goals = await goalService.getPaginated({
    n,
    page,
  });

  const goalsTransformed: Partial<Goal>[] = goals.map((goal) => {
    const legacyId = goal.id.toString();
    const setterLegacyId = goal.setter_id?.toString();

    return {
      legacyId,
      setterLegacyId,
      amount: goal.amount,
      dateCreated: parseDate(goal.created_at) as Date,
      dateUpdated: parseDate(goal.updated_at) as Date,
      income: goal.income,
      isDeleted: goal.archived,
      setterType: goal.setter_type,
      year: goal.year,
    };
  });

  await batchUpsertGoals(goalsTransformed as Goal[]);

  return {
    count: goals.length,
    data: {
      goals,
    },
  };
}

export async function migrateGroupRecipients(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const groupRecipientService = new GroupRecipientService();
  const groupRecipients = await groupRecipientService.getPaginated({
    n,
    page,
  });

  const groupRecipientsTransformed: Partial<GroupRecipient>[] = groupRecipients.map((groupRecipient) => {
    const legacyId = groupRecipient.id.toString();
    const groupLegacyId = groupRecipient.group_id?.toString();
    const recipientLegacyId = groupRecipient.recipient_id?.toString();

    return {
      groupLegacyId,
      legacyId,
      recipientLegacyId,
      dateCreated: parseDate(groupRecipient.created_at) as Date,
      dateUpdated: parseDate(groupRecipient.updated_at) as Date,
    };
  });

  await batchUpsertGroupRecipients(groupRecipientsTransformed as GroupRecipient[]);

  return {
    count: groupRecipients.length,
    data: {
      groupRecipients,
    },
  };
}

export async function migrateGroups(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const groupService = new GroupService();
  const groups = await groupService.getPaginated({
    n,
    page,
  });

  const groupsTransformed: Partial<Group>[] = groups.map((group) => {
    const legacyId = group.id.toString();

    return {
      legacyId,
      city: group.city,
      dateCreated: parseDate(group.created_at) as Date,
      dateUpdated: parseDate(group.updated_at) as Date,
      goal: group.goal,
      groupType: group.group_type,
      groupTypeOther: group.group_type_other,
      isDeleted: group.archived,
      logo: group.logo,
      name: group.name,
      purpose: group.purpose,
      state: group.state,
      status: group.status,
      taxTypes: group.tax_types,
      website: group.website,
      zipCode: group.zip_code,
    };
  });

  await batchUpsertGroups(groupsTransformed as Group[]);

  return {
    count: groups.length,
    data: {
      groups,
    },
  };
}

export async function migrateGroupGives(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const groupGiveService = new GroupGiveService();
  const groupGives = await groupGiveService.getPaginated({
    n,
    page,
  });

  const groupGivesTransformed: Partial<GroupGive>[] = groupGives.map((groupGive) => {
    const legacyId = groupGive.id.toString();
    const groupLegacyId = groupGive.group_id?.toString();
    const giveLegacyId = groupGive.give_id?.toString();

    return {
      legacyId,
      giveLegacyId,
      groupLegacyId,
      dateCreated: parseDate(groupGive.created_at) as Date,
      dateUpdated: parseDate(groupGive.updated_at) as Date,
    };
  });

  await batchUpsertGroupGives(groupGivesTransformed as GroupGive[]);

  return {
    count: groupGives.length,
    data: {
      groupGives,
    },
  };
}

export async function migrateImages(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const imageService = new ImageService();
  const images = await imageService.getPaginated({
    n,
    page,
  });

  const imagesTransformed: Partial<Image>[] = images.map((image) => {
    const legacyId = image.id.toString();
    const ownerLegacyId = image.owner_id?.toString();

    return {
      legacyId,
      ownerLegacyId,
      ownerType: image.owner_type,
      file: image.file,
      fileHash: image.file_hash,
      isFromGuidestar: image.is_from_guidestar,
      isPrimaryLogo: image.is_primary_logo,
      dateCreated: parseDate(image.created_at) as Date,
      dateUpdated: parseDate(image.updated_at) as Date,
    };
  });

  await batchUpsertImages(imagesTransformed as Image[]);

  return {
    count: images.length,
    data: {
      images,
    },
  };
}

export async function migrateMoments(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const momentService = new MomentService();
  const moments = await momentService.getPaginated({
    n,
    page,
  });

  const momentsTransformed: Partial<Moment>[] = moments.map((moment) => {
    const legacyId = moment.id.toString();
    const donorLegacyId = moment.donor_id?.toString();

    return {
      legacyId,
      donorLegacyId,
      dateCreated: parseDate(moment.created_at) as Date,
      dateUpdated: parseDate(moment.updated_at) as Date,
      flag: moment.flag,
      isFeatured: moment.featured,
      momentDate: parseDate(moment.moment_date) as Date,
      name: moment.name,
    };
  });

  await batchUpsertMoments(momentsTransformed as Moment[]);

  return {
    count: moments.length,
    data: {
      moments,
    },
  };
}

export async function migrateOrganizations(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const organizationService = new OrganizationService();
  const organizations = await organizationService.getPaginated({
    n,
    page,
  });

  const organizationsTransformed: Partial<Organization>[] = organizations.map((organization) => {
    const legacyId = organization.id.toString();
    const donorLegacyId = organization.donor_id?.toString();

    return {
      legacyId,
      donorLegacyId,
      dateCreated: parseDate(organization.created_at) as Date,
      dateUpdated: parseDate(organization.updated_at) as Date,
      endDate: parseDate(organization.end_date) as Date,
      name: organization.name,
      role: organization.role,
      startDate: parseDate(organization.start_date) as Date,
      title: organization.title,
      website: organization.website,
    };
  });

  await batchUpsertOrganizations(organizationsTransformed as Organization[]);

  return {
    count: organizations.length,
    data: {
      organizations,
    },
  };
}

export async function migratePageRecipients(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const pageRecipientService = new PageRecipientService();
  const pageRecipients = await pageRecipientService.getPaginated({
    n,
    page,
  });

  const pageRecipientsTransformed: Partial<PageRecipient>[] = pageRecipients.map((pageRecipient) => {
    const legacyId = pageRecipient.id.toString();
    const pageLegacyId = pageRecipient.page_id?.toString();
    const recipientLegacyId = pageRecipient.recipient_id?.toString();
    const imageLegacyId = pageRecipient.image_id?.toString();

    return {
      legacyId,
      imageLegacyId,
      pageLegacyId,
      recipientLegacyId,
      comment: pageRecipient.comment,
      dateCreated: parseDate(pageRecipient.created_at) as Date,
      dateUpdated: parseDate(pageRecipient.updated_at) as Date,
      isHighlighted: pageRecipient.highlighted,
      order: pageRecipient.order,
    };
  });

  await batchUpsertPageRecipients(pageRecipientsTransformed as PageRecipient[]);

  return {
    count: pageRecipients.length,
    data: {
      pageRecipients,
    },
  };
}

export async function migratePages(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const pageService = new PageService();
  const pages = await pageService.getPaginated({
    n,
    page,
  });

  const pagesTransformed: Partial<Page>[] = pages.map((pageItem) => {
    const legacyId = pageItem.id.toString();
    const ownerLegacyId = pageItem.owner_id?.toString();

    return {
      legacyId,
      ownerLegacyId,
      background: pageItem.background,
      dateCreated: parseDate(pageItem.created_at) as Date,
      dateUpdated: parseDate(pageItem.updated_at) as Date,
      descriptiveStyle: pageItem.descriptive_style,
      isVisible: pageItem.visible,
      logo: pageItem.logo,
      name: pageItem.name,
      ownerType: pageItem.owner_type,
      quotes: pageItem.quotes,
      simpleStyle: pageItem.simple_style,
      style: pageItem.style,
    };
  });

  await batchUpsertPages(pagesTransformed as Page[]);

  return {
    count: pages.length,
    data: {
      pages,
    },
  };
}

export async function migratePersonalPractices(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const personalPracticeService = new PersonalPracticeService();
  const personalPractices = await personalPracticeService.getPaginated({
    n,
    page,
  });

  const personalPracticesTransformed: Partial<PersonalPractice>[] = personalPractices.map((personalPractice) => {
    const legacyId = personalPractice.id.toString();
    const donorLegacyId = personalPractice.donor_id?.toString();

    return {
      legacyId,
      donorLegacyId,
      dateCreated: parseDate(personalPractice.created_at) as Date,
      dateUpdated: parseDate(personalPractice.updated_at) as Date,
      establishedDate: parseDate(personalPractice.established_date) as Date,
      quote: personalPractice.quote,
      status: personalPractice.status,
    };
  });

  await batchUpsertPersonalPractices(personalPracticesTransformed as PersonalPractice[]);

  return {
    count: personalPractices.length,
    data: {
      personalPractices,
    },
  };
}

export async function migratePersonalReflections(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const personalReflectionService = new PersonalReflectionService();
  const personalReflections = await personalReflectionService.getPaginated({
    n,
    page,
  });

  const personalReflectionsTransformed: Partial<PersonalReflection>[] = personalReflections.map((personalReflection) => {
    const legacyId = personalReflection.id.toString();
    const donorLegacyId = personalReflection.donor_id?.toString();

    return {
      legacyId,
      donorLegacyId,
      dateCreated: parseDate(personalReflection.created_at) as Date,
      dateUpdated: parseDate(personalReflection.updated_at) as Date,
      establishedDate: parseDate(personalReflection.established_date) as Date,
      message: personalReflection.message,
      prompts: personalReflection.prompts,
    };
  });

  await batchUpsertPersonalReflections(personalReflectionsTransformed as PersonalReflection[]);

  return {
    count: personalReflections.length,
    data: {
      personalReflections,
    },
  };
}

export async function migratePlatformStats(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const platformStatService = new PlatformStatService();
  const platformStats = await platformStatService.getPaginated({
    n,
    page,
  });

  const platformStatsTransformed: Partial<PlatformStat>[] = platformStats.map((platformStat) => {
    const legacyId = platformStat.id.toString();
    const platformLegacyId = platformStat.platform_id?.toString();

    return {
      legacyId,
      platformLegacyId,
      dateCreated: parseDate(platformStat.created_at) as Date,
      dateUpdated: parseDate(platformStat.updated_at) as Date,
      donorCount: platformStat.donor_count,
      givesAvgMonths: platformStat.gives_avg_months,
      givesCount: platformStat.gives_count,
      givesTotalAmount: platformStat.gives_total_amount,
      givesTotalAmountAvg: platformStat.gives_total_amount_avg,
      givesTotalAmountMed: platformStat.gives_total_amount_med,
      goalsAmount: platformStat.goals_amount,
      goalsAmountAvg: platformStat.goals_amount_avg,
      goalsAmountMed: platformStat.goals_amount_med,
      goalsCount: platformStat.goals_count,
      otherGivesCount: platformStat.other_gives_count,
      otherGivesCountAvg: platformStat.other_gives_count_avg,
      otherGivesCountMed: platformStat.other_gives_count_med,
      otherGivesTopPlatforms: platformStat.other_gives_top_platforms,
      otherGivesTopRecipientsByAmount: platformStat.other_gives_top_recipients_by_amount,
      otherGivesTopRecipientsByCount: platformStat.other_gives_top_recipients_by_count,
    };
  });

  await batchUpsertPlatformStats(platformStatsTransformed as PlatformStat[]);

  return {
    count: platformStats.length,
    data: {
      platformStats,
    },
  };
}

export async function migrateRecipientStats(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const recipientStatService = new RecipientStatService();
  const recipientStats = await recipientStatService.getPaginated({
    n,
    page,
  });

  const recipientStatsTransformed: Partial<RecipientStat>[] = recipientStats.map((recipientStat) => {
    const legacyId = recipientStat.id.toString();
    const recipientLegacyId = recipientStat.recipient_id?.toString();

    return {
      legacyId,
      recipientLegacyId,
      dateCreated: parseDate(recipientStat.created_at) as Date,
      dateUpdated: parseDate(recipientStat.updated_at) as Date,
      donorCount: recipientStat.donor_count,
      givesAvgMonths: recipientStat.gives_avg_months,
      givesCount: recipientStat.gives_count,
      givesGraphData: recipientStat.gives_graph_data,
      givesTopPlatforms: recipientStat.gives_top_platforms,
      givesTopRecipientsByAmount: recipientStat.gives_top_recipients_by_amount,
      givesTopRecipientsByCount: recipientStat.gives_top_recipients_by_count,
      givesTotalAmount: recipientStat.gives_total_amount,
      givesTotalAmountAvg: recipientStat.gives_total_amount_avg,
      givesTotalAmountMed: recipientStat.gives_total_amount_med,
      goalsAmount: recipientStat.goals_amount,
      goalsAmountAvg: recipientStat.goals_amount_avg,
      goalsAmountMed: recipientStat.goals_amount_med,
      goalsCount: recipientStat.goals_count,
      recurringGivesCount: recipientStat.recurring_gives_count,
      recurringGivesCountAvg: recipientStat.recurring_gives_count_avg,
      recurringGivesCountMed: recipientStat.recurring_gives_count_med,
      year: recipientStat.year,
    };
  });

  await batchUpsertRecipientStats(recipientStatsTransformed as RecipientStat[]);

  return {
    count: recipientStats.length,
    data: {
      recipientStats,
    },
  };
}

export async function migrateTags(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const tagService = new TagService();
  const tags = await tagService.getPaginated({
    n,
    page,
  });

  const tagsTransformed: Partial<Tag>[] = tags.map((tag) => {
    const legacyId = tag.id.toString();

    return {
      legacyId,
      dateCreated: parseDate(tag.created_at) as Date,
      dateUpdated: parseDate(tag.updated_at) as Date,
      name: tag.name,
    };
  });

  await batchUpsertTags(tagsTransformed as Tag[]);

  return {
    count: tags.length,
    data: {
      tags,
    },
  };
}

export async function migrateUsers(page: number = 1, n = NUMBER_OF_RECORDS_PER_BATCH) {
  const userService = new UserService();
  const users = await userService.getPaginated({
    n,
    page,
  });

  const usersTransformed: Partial<User>[] = users.map((user) => {
    const legacyId = user.id.toString();

    return {
      legacyId,
      currentSignInAt: parseDate(user.current_sign_in_at) as Date,
      currentSignInIp: user.current_sign_in_ip,
      dateCreated: parseDate(user.created_at) as Date,
      dateUpdated: parseDate(user.updated_at) as Date,
      email: user.email,
      lastSignInAt: parseDate(user.current_sign_in_at) as Date,
      lastSignInIp: user.last_sign_in_ip,
      legacyEncryptedPassword: user.encrypted_password,
      rememberCreatedAt: parseDate(user.remember_created_at) as Date,
      resetPasswordSentAt: user.reset_password_sent_at,
      resetPasswordToken: user.reset_password_token,
      signInCount: user.sign_in_count,
    };
  });

  await batchUpsertUsers(usersTransformed as User[]);

  return {
    count: users.length,
    data: {
      users,
    },
  };
}
