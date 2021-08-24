import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import RecipientStat from 'src/server/legacy/entities/RecipientStat';

export default class RecipientStatService {
  private recipientStatRepository: Repository<RecipientStat>;

  constructor() {
    this.recipientStatRepository = getManager().getRepository(RecipientStat);
  }

  /**
   * Returns recipient stat by id
   */
  public getById(id: string): Promise<RecipientStat | undefined> {
    return this.recipientStatRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all recipient stats
   */
  public async getAll(): Promise<RecipientStat[]> {
    return this.recipientStatRepository.find();
  }

  /**
   * Returns paginated recipient stats
   */
  public async getPaginated(
    params: GetPaginatedParams
  ): Promise<RecipientStat[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.recipientStatRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
