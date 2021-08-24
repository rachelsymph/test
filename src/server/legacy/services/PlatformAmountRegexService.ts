import { getManager, Repository } from 'typeorm';

import PlatformAmountRegex from 'src/server/legacy/entities/PlatformAmountRegex';

export default class PlatformAmountRegexService {
  private platformAmountRegexRepository: Repository<PlatformAmountRegex>;

  constructor() {
    this.platformAmountRegexRepository = getManager().getRepository(PlatformAmountRegex);
  }

  /**
   * Returns all platform amount regexes
   */
  public async getAll(): Promise<PlatformAmountRegex[]> {
    return this.platformAmountRegexRepository.find();
  }
}
