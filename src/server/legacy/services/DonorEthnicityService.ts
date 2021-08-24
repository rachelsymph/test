import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import DonorEthnicity from 'src/server/legacy/entities/DonorEthnicity';

export default class DonorEthnicityService {
  private donorEthnicityRepository: Repository<DonorEthnicity>;

  constructor() {
    this.donorEthnicityRepository = getManager().getRepository(DonorEthnicity);
  }

  /**
   * Returns donor ethnicity by id
   */
  public getById(id: string): Promise<DonorEthnicity | undefined> {
    return this.donorEthnicityRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all donor ethnicities
   */
  public async getAll(): Promise<DonorEthnicity[]> {
    return this.donorEthnicityRepository.find();
  }

  /**
   * Returns paginated donor ethnicities
   */
  public async getPaginated(params: GetPaginatedParams): Promise<DonorEthnicity[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.donorEthnicityRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
