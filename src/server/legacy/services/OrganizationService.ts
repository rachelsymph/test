import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import Organization from 'src/server/legacy/entities/Organization';

export default class OrganizationService {
  private organizationRepository: Repository<Organization>;

  constructor() {
    this.organizationRepository = getManager().getRepository(Organization);
  }

  /**
   * Returns organization by id
   */
  public getById(id: string): Promise<Organization | undefined> {
    return this.organizationRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all organizations
   */
  public async getAll(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  /**
   * Returns paginated organizations
   */
  public async getPaginated(
    params: GetPaginatedParams
  ): Promise<Organization[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.organizationRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
