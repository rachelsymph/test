import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import Tag from 'src/server/legacy/entities/Tag';

export default class TagService {
  private tagRepository: Repository<Tag>;

  constructor() {
    this.tagRepository = getManager().getRepository(Tag);
  }

  /**
   * Returns tag by id
   */
  public getById(id: string): Promise<Tag | undefined> {
    return this.tagRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all tags
   */
  public async getAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  /**
   * Returns paginated tags
   */
  public async getPaginated(params: GetPaginatedParams): Promise<Tag[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.tagRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
