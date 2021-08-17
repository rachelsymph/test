import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import Goal from 'src/server/legacy/entities/Goal';

export default class GoalService {
  private goalRepository: Repository<Goal>;

  constructor() {
    this.goalRepository = getManager().getRepository(Goal);
  }

  /**
   * Returns goal by id
   */
  public getById(id: string): Promise<Goal | undefined> {
    return this.goalRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all goals
   */
  public async getAll(): Promise<Goal[]> {
    return this.goalRepository.find();
  }

  /**
   * Returns paginated goals
   */
  public async getPaginated(params: GetPaginatedParams): Promise<Goal[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.goalRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
