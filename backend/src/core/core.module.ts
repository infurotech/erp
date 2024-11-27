import { Module, Global } from '@nestjs/common';
import { CachingManager } from './caching/caching.manager';
import { TenantModule } from './tenant/tenant.module';
import { SettingsManager } from './settings/settings.manager';
import { FeaturesManager } from './feature/features.manager';
import { LocalizationManager } from './localization/localization.manager';
import { CachingModule } from './caching/caching.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantTypeOrmProvider } from './tenant/tenant.typeorm';

@Global()
@Module({
    imports: [
        CachingModule,
        TenantModule,
        TypeOrmModule.forRootAsync({
            useFactory: async (tenantTypeOrmProvider: TenantTypeOrmProvider) => {
                const tenantId = 'tenant1'; // Get tenantId dynamically from request context or token
                const dataSource = await tenantTypeOrmProvider.getDataSource(tenantId); // Use dynamic connection
                return {
                    type: 'postgres',
                    url: dataSource.options['url'], // Use dynamic connection string
                    entities: [__dirname + '/entities/*.entity{.ts,.js}'],
                    synchronize: true,
                };
            },
            inject: [TenantTypeOrmProvider], // Inject the tenant manager
        })],
    providers: [CachingManager, SettingsManager, FeaturesManager, LocalizationManager],
    exports: [CachingManager, TenantModule, SettingsManager, FeaturesManager, LocalizationManager],
})
export class CoreModule { }