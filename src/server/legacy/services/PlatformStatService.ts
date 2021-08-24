import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import PlatformStat from 'src/server/legacy/entities/PlatformStat';

export default class PlatformStatService {
  private platformStatRepository: Repository<PlatformStat>;

  constructor() {
    this.platformStatRepository = getManager().getRepository(PlatformStat);
  }

  /**
   * Returns platform stat by id
   */
  public getById(id: string): Promise<PlatformStat | undefined> {
    return this.platformStatRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all platform stats
   */
  public async getAll(): Promise<PlatformStat[]> {
    return this.platformStatRepository.find();
  }

  /**
   * Returns paginated platform stats
   */
  public async getPaginated(params: GetPaginatedParams): Promise<PlatformStat[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.platformStatRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
