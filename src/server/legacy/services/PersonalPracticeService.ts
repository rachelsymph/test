import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import PersonalPractice from 'src/server/legacy/entities/PersonalPractice';

export default class PersonalPracticeService {
  private personalPracticeRepository: Repository<PersonalPractice>;

  constructor() {
    this.personalPracticeRepository = getManager().getRepository(PersonalPractice);
  }

  /**
   * Returns personal practice by id
   */
  public getById(id: string): Promise<PersonalPractice | undefined> {
    return this.personalPracticeRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all personal practices
   */
  public async getAll(): Promise<PersonalPractice[]> {
    return this.personalPracticeRepository.find();
  }

  /**
   * Returns paginated personal practices
   */
  public async getPaginated(params: GetPaginatedParams): Promise<PersonalPractice[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.personalPracticeRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
