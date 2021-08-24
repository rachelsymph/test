import { getManager, Repository } from 'typeorm';

import Platform from 'src/server/legacy/entities/Platform';

export default class PlatformService {
  private platformRepository: Repository<Platform>;

  constructor() {
    this.platformRepository = getManager().getRepository(Platform);
  }

  /**
   * Returns a platform by id
   */
  public getById(id: string): Promise<Platform | undefined> {
    return this.platformRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all platforms
   */
  public async getAll(): Promise<Platform[]> {
    return this.platformRepository.find();
  }
}
