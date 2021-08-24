import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import Gender from 'src/server/legacy/entities/Gender';

export default class GenderService {
  private genderRepository: Repository<Gender>;

  constructor() {
    this.genderRepository = getManager().getRepository(Gender);
  }

  /**
   * Returns gender by id
   */
  public getById(id: string): Promise<Gender | undefined> {
    return this.genderRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all genders
   */
  public async getAll(): Promise<Gender[]> {
    return this.genderRepository.find();
  }

  /**
   * Returns paginated genders
   */
  public async getPaginated(params: GetPaginatedParams): Promise<Gender[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.genderRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
