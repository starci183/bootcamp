import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheController } from './cache.controller';
import KeyV from '@keyv/redis';
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => {
        return {
          //research anh gui anh em sau
          stores: [
            new KeyV('redis://localhost:6399'),
          ],
        };
      },
    }),
  ],
   controllers: [CacheController],
})
export class AppCacheModule {}