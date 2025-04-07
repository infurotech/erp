import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../entities/tenant.entity';

@Injectable()
export class TenantSeederService {
  constructor(
    @InjectRepository(Tenant)
    private readonly yourTableRepository: Repository<Tenant>
  ) {}
  async onModuleInit() {
    console.log("onModuleInit called in tanent ")
    await this.run();
  } 
  // The main seeder function that creates multiple records
  async run() {
    const records: Tenant[] = [];

    // Generate 10 records (you can change the number here)
    for (let i = 0; i < 10; i++) {
      const record = this.yourTableRepository.create({
        name: `tanemt Name ${i + 1}`,
        connectionString: `Sample Connection String ${i + 1}`,
        active: true,
      });

      records.push(record);
    }

    // Insert all the records at once
    await this.yourTableRepository.save(records);
    console.log(`${records.length} records inserted successfully`);
  }
}
