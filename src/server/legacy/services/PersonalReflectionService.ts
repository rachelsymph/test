import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import PersonalReflection from 'src/server/legacy/entities/PersonalReflection';

export default class PersonalReflectionService {
  private personalReflectionRepository: Repository<PersonalReflection>;

  constructor() {
    this.personalReflectionRepository = getManager().getRepository(
      PersonalReflection
    );
  }

  /**
   * Returns personal reflection by id
   */
  public getById(id: string): Promise<PersonalReflection | undefined> {
    return this.personalReflectionRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all personal reflections
   */
  public async getAll(): Promise<PersonalReflection[]> {
    return this.personalReflectionRepository.find();
  }

  /**
   * Returns paginated personal reflections
   */
  public async getPaginated(
    params: GetPaginatedParams
  ): Promise<PersonalReflection[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.personalReflectionRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
