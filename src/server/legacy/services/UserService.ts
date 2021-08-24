import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import User from 'src/server/legacy/entities/User';

export default class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getManager().getRepository(User);
  }

  /**
   * Returns user by id
   */
  public getById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all users
   */
  public async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Returns paginated users
   */
  public async getPaginated(params: GetPaginatedParams): Promise<User[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.userRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
