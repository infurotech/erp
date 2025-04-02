import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository, ObjectLiteral } from 'typeorm';
export declare class CrudService<T extends ObjectLiteral> extends TypeOrmCrudService<T> {
    protected readonly repo: Repository<T>;
    constructor(repo: Repository<T>);
    findAllWithPagination(skip: number, take: number): Promise<T[]>;
    softDelete(id: number | string): Promise<import("typeorm").UpdateResult>;
    restore(id: number | string): Promise<import("typeorm").UpdateResult>;
}
