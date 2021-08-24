import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import DonorGroup from 'src/server/legacy/entities/DonorGroup';

export default class DonorGroupService {
  private donorGroupRepository: Repository<DonorGroup>;

  constructor() {
    this.donorGroupRepository = getManager().getRepository(DonorGroup);
  }

  /**
   * Returns donor group by id
   */
  public getById(id: string): Promise<DonorGroup | undefined> {
    return this.donorGroupRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all donor groups
   */
  public async getAll(): Promise<DonorGroup[]> {
    return this.donorGroupRepository.find();
  }

  /**
   * Returns paginated donor groups
   */
  public async getPaginated(params: GetPaginatedParams): Promise<DonorGroup[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.donorGroupRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
