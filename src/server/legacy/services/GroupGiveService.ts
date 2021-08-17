import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import GroupGive from 'src/server/legacy/entities/GroupGive';

export default class GroupGiveService {
  private groupGiveRepository: Repository<GroupGive>;

  constructor() {
    this.groupGiveRepository = getManager().getRepository(GroupGive);
  }

  /**
   * Returns group give by id
   */
  public getById(id: string): Promise<GroupGive | undefined> {
    return this.groupGiveRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all group gives
   */
  public async getAll(): Promise<GroupGive[]> {
    return this.groupGiveRepository.find();
  }

  /**
   * Returns paginated group gives
   */
  public async getPaginated(params: GetPaginatedParams): Promise<GroupGive[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.groupGiveRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
