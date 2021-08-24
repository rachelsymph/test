import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import Group from 'src/server/legacy/entities/Group';

export default class GroupService {
  private groupRepository: Repository<Group>;

  constructor() {
    this.groupRepository = getManager().getRepository(Group);
  }

  /**
   * Returns group by id
   */
  public getById(id: string): Promise<Group | undefined> {
    return this.groupRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all groups
   */
  public async getAll(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  /**
   * Returns paginated groups
   */
  public async getPaginated(params: GetPaginatedParams): Promise<Group[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.groupRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
