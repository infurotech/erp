import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { DatabaseService } from '@infuro/shared';

@Injectable()
export class UserSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    databaseService: DatabaseService,
  ) {}


  async onModuleInit() {
    await this.createDefaultUser();
  }

  private async createDefaultUser() {
    const existingUser = await this.userRepository.findOne({ where: { email: 'admin@infurotech.com' } });

    if (!existingUser) {
      console.log('🚀 Creating default admin user...');

      const randomPassword = this.generateRandomPassword();
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      const user = this.userRepository.create({
        email: 'admin@infurotech.com',
        password: hashedPassword,
        firstName: 'Admin',
        middleName: '',
        lastName: '',
        phone: '000000000',
        profileUrl: 'admin',
        failedAttempts: 0,
        locked: false,
        deleted: false
      });

      console.log('Created admin user:', user.email, randomPassword)

      await this.userRepository.save(user);
      console.log('✅ Default admin user created!');
    } else {
      console.log('✅ Admin user already exists.');
    }
  }

  private generateRandomPassword(): string {
    return crypto.randomBytes(12).toString('hex'); // Generates a 16-character password
  }
}
