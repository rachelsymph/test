import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import GroupRecipient from 'src/server/legacy/entities/GroupRecipient';

export default class GroupRecipientService {
  private groupRecipientRepository: Repository<GroupRecipient>;

  constructor() {
    this.groupRecipientRepository = getManager().getRepository(GroupRecipient);
  }

  /**
   * Returns group recipient by id
   */
  public getById(id: string): Promise<GroupRecipient | undefined> {
    return this.groupRecipientRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all group recipients
   */
  public async getAll(): Promise<GroupRecipient[]> {
    return this.groupRecipientRepository.find();
  }

  /**
   * Returns paginated group recipients
   */
  public async getPaginated(
    params: GetPaginatedParams
  ): Promise<GroupRecipient[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.groupRecipientRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
