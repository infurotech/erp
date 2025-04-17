import { Injectable, OnModuleInit } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { kafkaService  } from '../kafka/kafka.service';


@Injectable()
export class CrudService<T> extends TypeOrmCrudService<T> {

  // No need to inject moduleRef in constructor; we will inject dynamically
  constructor(repo: Repository<T>) {
    super(repo);
  }

  // Example methods (unchanged)
  async findAllWithPagination(skip: number, take: number) {
    return this.repo.find({ skip, take });
  }

  async softDelete(id: number | string) {
    return this.repo.softDelete(id);
  }

  async restore(id: number | string) {
    return this.repo.restore(id);
  }

  async findById(id: string | number): Promise<T | null> {
    return this.repo.findOne({ where: { id } as any });
  }

  async create(data: Partial<T>, eventName: string): Promise<T> {
    const entity = this.repo.create(data as DeepPartial<T>);
    const saved = await this.repo.save(entity);
  
    try {
      await this.emitEvent(eventName, saved); // your existing Kafka/event function
    } catch (err) {
      console.error('Emit failed:', err);
    }
  
    return saved;
  }
  async emitEvent(eventName: string, payload: any): Promise<void> {
    try {
      await kafkaService.emit(eventName, payload);
    } catch (err) {
      console.error('Error emitting event:', err);
    }
  }
}
