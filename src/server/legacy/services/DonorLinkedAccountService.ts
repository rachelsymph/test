import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import DonorLinkedAccount from 'src/server/legacy/entities/DonorLinkedAccount';

export default class DonorLinkedAccountService {
  private donorLinkedAccountRepository: Repository<DonorLinkedAccount>;

  constructor() {
    this.donorLinkedAccountRepository = getManager().getRepository(
      DonorLinkedAccount
    );
  }

  /**
   * Returns donor linked account by id
   */
  public getById(id: string): Promise<DonorLinkedAccount | undefined> {
    return this.donorLinkedAccountRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all donor linked accounts
   */
  public async getAll(): Promise<DonorLinkedAccount[]> {
    return this.donorLinkedAccountRepository.find();
  }

  /**
   * Returns paginated donor linked accounts
   */
  public async getPaginated(
    params: GetPaginatedParams
  ): Promise<DonorLinkedAccount[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.donorLinkedAccountRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
