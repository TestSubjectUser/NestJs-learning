import { IsEnum, IsOptional, IsString } from 'class-validator';
import { taskStatus } from '../tasks.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(taskStatus)
  status?: taskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
