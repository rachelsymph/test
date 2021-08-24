import { getManager, Repository } from 'typeorm';

import { GetPaginatedParams } from 'src/commons/types/Params.type';
import config from 'src/server/config/config';
import Image from 'src/server/legacy/entities/Image';

export default class ImageService {
  private imageRepository: Repository<Image>;

  constructor() {
    this.imageRepository = getManager().getRepository(Image);
  }

  /**
   * Returns image by id
   */
  public getById(id: string): Promise<Image | undefined> {
    return this.imageRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Returns all images
   */
  public async getAll(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  /**
   * Returns paginated images
   */
  public async getPaginated(params: GetPaginatedParams): Promise<Image[]> {
    const { n = config.RECORDS_PER_PAGE, page = 1 } = params;
    const skip = n * (page - 1);

    return this.imageRepository.find({
      skip,
      take: n,
      order: {
        created_at: 'ASC',
      },
    });
  }
}
