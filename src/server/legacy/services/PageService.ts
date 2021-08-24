import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import PageService from 'src/server/legacy/entities/Page';

export default class PageServiceService {
  private pageServiceRepository: Repository<PageService>;

  constructor() {
    this.pageServiceRepository = getManager().getRepository(PageService);
  }

  /**
   * Returns page by id
   */
  public getById(id: string): Promise<PageService | undefined> {
    return this.pageServiceRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all pages
   */
  public async getAll(): Promise<PageService[]> {
    return this.pageServiceRepository.find();
  }

  /**
   * Returns paginated pages
   */
  public async getPaginated(params: GetPaginatedParams): Promise<PageService[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.pageServiceRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
