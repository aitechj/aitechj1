import { AuditLog } from './AuditLog.js';
import { PaginatedResponse } from '../common/PaginationTypes.js';

export interface AuditLogPage extends PaginatedResponse<AuditLog> {}
