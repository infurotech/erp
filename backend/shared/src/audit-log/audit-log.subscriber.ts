import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
  SoftRemoveEvent,
} from "typeorm";
import { Action } from "./audit-log.enum";
import { Injectable } from "@nestjs/common";
import { RequestContext } from "../contexts";

@Injectable()
@EventSubscriber()
export class AuditLogSubscriber implements EntitySubscriberInterface {



  async afterInsert(event: InsertEvent<any>) {
    await this.logAudit(event, Action.CREATED);
  }

  async afterUpdate(event: UpdateEvent<any>) {
    await this.logAudit(event, Action.MODIFIED);
  }

  async afterRemove(event: RemoveEvent<any>) {
    await this.logAudit(event, Action.REMOVED);
  }

  private async logAudit(
    event:
      | InsertEvent<any>
      | UpdateEvent<any>
      | RemoveEvent<any>
      | SoftRemoveEvent<any>,
    action: Action
  ) {
    
    const tableName = event.metadata.tableName;
    if (tableName === "DevtwoRasikaCU_auditLogs") return;
    
    const actor = RequestContext.get("userId");
    const userIp = RequestContext.get("userIp");
    let before: Record<string, any> = {};
    let after: Record<string, any> = {};
    let entityId = event.entity.id;

    if (action === Action.CREATED) {
      after = event.entity;
    }

    if (action === Action.MODIFIED) {
      event.metadata.columns.forEach((column) => {
        const columnName = column.propertyName;
        const oldValue = event["databaseEntity"]
          ? event["databaseEntity"][columnName]
          : undefined; // Old value
        const newValue = event.entity ? event.entity[columnName] : undefined;

        if (oldValue !== newValue) {
          before[columnName] = oldValue;
          after[columnName] = newValue;
        }
      });
    }
    if (action === Action.REMOVED) {
      entityId = event["databaseEntity"].id;
      before = event["databaseEntity"];
    }

    const auditLogData = {
      entity: tableName,
      entityId,
      before,
      after,
      action,
      actor,
      userIp,
    };
    
    const auditLogRepo = event.connection.getRepository('AuditLogs');
    auditLogRepo.save(auditLogData);
  }
}
