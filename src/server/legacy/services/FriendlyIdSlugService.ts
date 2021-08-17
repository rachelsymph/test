import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import FriendlyIdSlug from 'src/server/legacy/entities/FriendlyIdSlug';

export default class FriendlyIdSlugService {
  private friendlyIdSlugRepository: Repository<FriendlyIdSlug>;

  constructor() {
    this.friendlyIdSlugRepository = getManager().getRepository(FriendlyIdSlug);
  }

  /**
   * Returns friendly id slug by id
   */
  public getById(id: string): Promise<FriendlyIdSlug | undefined> {
    return this.friendlyIdSlugRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all friendly id slugs
   */
  public async getAll(): Promise<FriendlyIdSlug[]> {
    return this.friendlyIdSlugRepository.find();
  }

  /**
   * Returns paginated friendly id slugs
   */
  public async getPaginated(params: GetPaginatedParams): Promise<FriendlyIdSlug[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.friendlyIdSlugRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
