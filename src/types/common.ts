import { Request } from 'express';

export enum RoleTypeEnum {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
}

export interface AuthenticatedRequest extends Request {
  user?: any; // Replace `any` with your actual user type
}
