import { Module,  } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CachingManager } from './caching.manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    /// In memory cache
    // CacheModule.register() 
    /// Redis cache
    CacheModule.registerAsync({
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });

        return {
          store: store ,
          ttl: 3 * 60000, // 3 minutes (milliseconds)
        };
      },
    }),
  ],
  providers: [CachingManager],
  exports: [CachingManager,CacheModule],
})
export class CachingModule {}
