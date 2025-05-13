import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Controller, Get, Inject, Post } from "@nestjs/common";
import { Cache } from "cache-manager";

@Controller('cache')
export class CacheController {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    @Get("get-cache")
    async getCache() {
        return this.cacheManager.get('test');
    }

    @Post("set-cache")
    async setCache() {
        return this.cacheManager.set('test', crypto.randomUUID());
    }
}
