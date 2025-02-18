import { Injectable } from '@nestjs/common';
import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { DataSource } from 'typeorm';

@Injectable()
@EventSubscriber()
export class AuditLogsSubscriber implements EntitySubscriberInterface {
  constructor(private readonly dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  private async logChange(operation: string, event: InsertEvent<any> | UpdateEvent<any> | RemoveEvent<any>) {
    const entityName = event.metadata.name;

    if (entityName === 'Audit' || entityName === 'AuditDelta') {
      return;
    }
    
    let oldData: any = {};
    let newData: any = {};

    if (operation === 'REMOVE') {
        oldData = (event as RemoveEvent<any>).databaseEntity;
    } else {
        newData = (event as InsertEvent<any> | UpdateEvent<any>).entity;
        if (operation === 'UPDATE') {
          oldData = (event as UpdateEvent<any>).databaseEntity;
        }
    }

    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const auditRepo = queryRunner.manager.getRepository('Audit');
      const auditEntry = await auditRepo.save({
        entity: entityName,
        operation,
        data: operation === 'REMOVE' ? oldData : newData,
      });
  
      if (operation === 'UPDATE' && oldData && newData) {
        const deltaRepo = queryRunner.manager.getRepository('AuditDelta');
        const deltas = Object.keys(newData)
          .filter(key => oldData[key] !== newData[key])
          .map(key => deltaRepo.create({
            audit_id: auditEntry.id,
            property_name: key,
            old_value: oldData[key] ?? null,
            new_value: newData[key] ?? null,
          }));
  
        if (deltas.length > 0) {
          await deltaRepo.save(deltas);
        }
      }
  
      if (operation === 'INSERT') {
        const deltaRepo = queryRunner.manager.getRepository('AuditDelta');
        const deltas = Object.keys(newData).map(key =>
          deltaRepo.create({
            audit_id: auditEntry.id,
            property_name: key,
            old_value: null,
            new_value: newData[key],
          }),
        );
        await deltaRepo.save(deltas);
      }
  
      if (operation === 'REMOVE' && oldData) {
        const deltaRepo = queryRunner.manager.getRepository('AuditDelta');
        const deltas = Object.keys(oldData).map(key =>
          deltaRepo.create({
            audit_id: auditEntry.id,
            property_name: key,
            old_value: oldData[key],
            new_value: null,
          }),
        );
        await deltaRepo.save(deltas);
      }
  
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error('Audit Logging Error:', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

 async afterInsert(event: InsertEvent<any>) {
    this.logChange('INSERT',event);
  }

  afterUpdate(event: UpdateEvent<any>) {
     this.logChange('UPDATE', event);
  }

  afterRemove(event: RemoveEvent<any>) {
     this.logChange('REMOVE', event);
  }
}
