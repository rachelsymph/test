import { getManager, Repository } from 'typeorm';

import PlatformRecipientRegex from 'src/server/legacy/entities/PlatformRecipientRegex';

export default class PlatformRecipientRegexService {
  private platformRecipientRegexRepository: Repository<PlatformRecipientRegex>;

  constructor() {
    this.platformRecipientRegexRepository = getManager().getRepository(PlatformRecipientRegex);
  }

  /**
   * Returns all platform recipient regexes
   */
  public async getAll(): Promise<PlatformRecipientRegex[]> {
    return this.platformRecipientRegexRepository.find();
  }
}
