import { PartialType } from '@nestjs/mapped-types';
import { CreateJobItemDto } from './create-job-item.dto';

export class UpdateJobItemDto extends PartialType(CreateJobItemDto) {}
