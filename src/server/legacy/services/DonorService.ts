import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import Donor from 'src/server/legacy/entities/Donor';

export default class DonorService {
  private donorRepository: Repository<Donor>;

  constructor() {
    this.donorRepository = getManager().getRepository(Donor);
  }

  /**
   * Returns a donor by id
   */
  public getById(id: string): Promise<Donor | undefined> {
    return this.donorRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all donors
   */
  public async getAll(): Promise<Donor[]> {
    return this.donorRepository.find();
  }

  /**
   * Returns paginated donors
   */
  public async getPaginated(params: GetPaginatedParams): Promise<Donor[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.donorRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
