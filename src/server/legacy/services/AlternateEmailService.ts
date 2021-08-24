import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import AlternateEmail from 'src/server/legacy/entities/AlternateEmail';

export default class AlternateEmailService {
  private alternateEmailRepository: Repository<AlternateEmail>;

  constructor() {
    this.alternateEmailRepository = getManager().getRepository(AlternateEmail);
  }

  /**
   * Returns an alternate email by id
   */
  public getById(id: string): Promise<AlternateEmail | undefined> {
    return this.alternateEmailRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all alternate emails
   */
  public async getAll(): Promise<AlternateEmail[]> {
    return this.alternateEmailRepository.find();
  }

  /**
   * Returns paginated alternate emails
   */
  public async getPaginated(
    params: GetPaginatedParams
  ): Promise<AlternateEmail[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.alternateEmailRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
