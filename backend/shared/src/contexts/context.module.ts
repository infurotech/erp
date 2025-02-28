import { Module } from "@nestjs/common";
import { CachingManager, CachingModule } from "../caching";

@Module({
    imports: [CachingModule],
    exports: [CachingModule],
})
export class ContextModule {}