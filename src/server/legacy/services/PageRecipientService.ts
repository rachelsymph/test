import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import PageRecipient from 'src/server/legacy/entities/PageRecipient';

export default class PageRecipientService {
  private pageRecipientRepository: Repository<PageRecipient>;

  constructor() {
    this.pageRecipientRepository = getManager().getRepository(PageRecipient);
  }

  /**
   * Returns page recipient by id
   */
  public getById(id: string): Promise<PageRecipient | undefined> {
    return this.pageRecipientRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all page recipients
   */
  public async getAll(): Promise<PageRecipient[]> {
    return this.pageRecipientRepository.find();
  }

  /**
   * Returns paginated page recipients
   */
  public async getPaginated(params: GetPaginatedParams): Promise<PageRecipient[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.pageRecipientRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
