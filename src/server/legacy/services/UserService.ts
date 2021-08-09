import { getManager, Repository } from 'typeorm';

import Recipient from 'src/server/legacy/entities/Recipient';

export default class RecipientService {
  private recipientRepository: Repository<Recipient>;

  constructor() {
    this.recipientRepository = getManager().getRepository(Recipient);
  }

  /**
   * Creates an instance of recipient
   */
  public instantiate(data: Object): Recipient {
    return this.recipientRepository.create(data);
  }

  /**
   * Inserts a new recipient into the database
   */
  public insert(data: Recipient): Promise<Recipient> {
    return this.recipientRepository.save(data);
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
   * Returns last recipient
   */
  public async getLast(): Promise<Recipient | undefined> {
    return this.recipientRepository.findOne({
      order: {
        created_at: 'DESC',
      },
      where: {
        archived: false,
      },
    });
  }

  /**
   * Updates a recipient
   */
  public update(recipient: Recipient): Promise<Recipient> {
    return this.recipientRepository.save(recipient);
  }
}
