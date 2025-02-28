import { AuditData } from './audit.interface';

export enum TransportMethods {
  CONSOLE = 'console'
}

export interface BaseTransport {
  name: TransportMethods;
  options?: TransportOptions;
}

export interface Transport extends BaseTransport {
  emit(data: AuditData): void;
}

export interface ConsoleTransportOptions {
  logger?: any;
}

export type TransportOptions = ConsoleTransportOptions