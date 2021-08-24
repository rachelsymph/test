import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import Recipient from 'src/server/legacy/entities/Recipient';

export default class RecipientService {
  private recipientRepository: Repository<Recipient>;

  constructor() {
    this.recipientRepository = getManager().getRepository(Recipient);
  }

  /**
   * Returns a recipient by id
   */
  public getById(id: string): Promise<Recipient | undefined> {
    return this.recipientRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all recipients
   */
  public async getAll(): Promise<Recipient[]> {
    return this.recipientRepository.find();
  }

  /**
   * Returns paginated recipients
   */
  public async getPaginated(params: GetPaginatedParams): Promise<Recipient[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.recipientRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
