import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import DonorStat from 'src/server/legacy/entities/DonorStat';

export default class DonorStatService {
  private donorStatRepository: Repository<DonorStat>;

  constructor() {
    this.donorStatRepository = getManager().getRepository(DonorStat);
  }

  /**
   * Returns donor stat by id
   */
  public getById(id: string): Promise<DonorStat | undefined> {
    return this.donorStatRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all donor stats
   */
  public async getAll(): Promise<DonorStat[]> {
    return this.donorStatRepository.find();
  }

  /**
   * Returns paginated donor stats
   */
  public async getPaginated(params: GetPaginatedParams): Promise<DonorStat[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.donorStatRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
