export interface AuditLog {
  id: number;
  entityName: string;
  entityId: string;
  operation: string;
  oldValues?: string;
  newValues?: string;
  timestamp: string;
  userId?: number;
  severity: string;
}
