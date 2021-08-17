import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import Ethnicity from 'src/server/legacy/entities/Ethnicity';

export default class EthnicityService {
  private ethnicityRepository: Repository<Ethnicity>;

  constructor() {
    this.ethnicityRepository = getManager().getRepository(Ethnicity);
  }

  /**
   * Returns ethnicity by id
   */
  public getById(id: string): Promise<Ethnicity | undefined> {
    return this.ethnicityRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all ethnicitys
   */
  public async getAll(): Promise<Ethnicity[]> {
    return this.ethnicityRepository.find();
  }

  /**
   * Returns paginated ethnicities
   */
  public async getPaginated(params: GetPaginatedParams): Promise<Ethnicity[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.ethnicityRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
