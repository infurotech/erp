import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CrudService,CONNECTION ,DataSource, Repository,User } from '@infuro/shared'; // Path to your CrudService


@Injectable()
export class UserSeederService extends CrudService<User> implements OnModuleInit {
  constructor( 
    @Inject(CONNECTION) connection: DataSource,
  ) { 
    super(connection.getRepository(User));
  } 


  async onModuleInit() {
    await this.createDefaultUser();
  }

  private async createDefaultUser() {
    const existingUser = await this.repo.findOne({ where: { email: 'admin@infurotech.com' } });

    if (!existingUser) {
      console.log('🚀 Creating default admin user...');

      const randomPassword = this.generateRandomPassword();
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      const user = this.repo.create({
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

      await this.repo.save(user);
      console.log('✅ Default admin user created!');
    } else {
      console.log('✅ Admin user already exists.');
    }
  }

  private generateRandomPassword(): string {
    return crypto.randomBytes(12).toString('hex'); // Generates a 16-character password
  }
}
