import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import Give from 'src/server/legacy/entities/Give';

export default class GiveService {
  private giveRepository: Repository<Give>;

  constructor() {
    this.giveRepository = getManager().getRepository(Give);
  }

  /**
   * Returns a give by id
   */
  public getById(id: string): Promise<Give | undefined> {
    return this.giveRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all gives
   */
  public async getAll(): Promise<Give[]> {
    return this.giveRepository.find();
  }

  /**
   * Returns paginated gives
   */
  public async getPaginated(params: GetPaginatedParams): Promise<Give[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.giveRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
