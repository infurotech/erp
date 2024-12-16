import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class GeneralService<T> {
  constructor(
    @Inject('REPOSITORY') private readonly repository: Repository<T>,
  ) {}

  async create(createDto: any): Promise<T[]> {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

//   async findAll(): Promise<T[]> {
//     return this.repository.find();
//   }

//   async findOne(id: number): Promise<T | null> {
//     return this.repository.findOne({ where: { id } });
//   }

//   async update(id: number, updateDto: any): Promise<T> {
//     await this.repository.update(id, updateDto);
//     return this.findOne(id);
//   }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
