import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import Moment from 'src/server/legacy/entities/Moment';

export default class MomentService {
  private momentRepository: Repository<Moment>;

  constructor() {
    this.momentRepository = getManager().getRepository(Moment);
  }

  /**
   * Returns moment by id
   */
  public getById(id: string): Promise<Moment | undefined> {
    return this.momentRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all moments
   */
  public async getAll(): Promise<Moment[]> {
    return this.momentRepository.find();
  }

  /**
   * Returns paginated moments
   */
  public async getPaginated(params: GetPaginatedParams): Promise<Moment[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.momentRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
