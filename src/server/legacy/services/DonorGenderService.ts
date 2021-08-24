import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import DonorGender from 'src/server/legacy/entities/DonorGender';

export default class DonorGenderService {
  private donorGenderRepository: Repository<DonorGender>;

  constructor() {
    this.donorGenderRepository = getManager().getRepository(DonorGender);
  }

  /**
   * Returns donor gender by id
   */
  public getById(id: string): Promise<DonorGender | undefined> {
    return this.donorGenderRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all donor genders
   */
  public async getAll(): Promise<DonorGender[]> {
    return this.donorGenderRepository.find();
  }

  /**
   * Returns paginated donor genders
   */
  public async getPaginated(
    params: GetPaginatedParams
  ): Promise<DonorGender[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.donorGenderRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
