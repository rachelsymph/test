import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import GiveTag from 'src/server/legacy/entities/GiveTag';

export default class GiveTagService {
  private giveTagRepository: Repository<GiveTag>;

  constructor() {
    this.giveTagRepository = getManager().getRepository(GiveTag);
  }

  /**
   * Returns donor give tag by id
   */
  public getById(id: string): Promise<GiveTag | undefined> {
    return this.giveTagRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all donor give tags
   */
  public async getAll(): Promise<GiveTag[]> {
    return this.giveTagRepository.find();
  }

  /**
   * Returns paginated donor give tags
   */
  public async getPaginated(params: GetPaginatedParams): Promise<GiveTag[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.giveTagRepository.find({
      skip,
      take: n,
      order: {
        id: 'ASC',
      },
    });
  }
}
