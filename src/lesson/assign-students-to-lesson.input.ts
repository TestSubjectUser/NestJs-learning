import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonInput {
  @Field(() => ID)
  lessonId: string;

  // each: true for array of uuids validate
  @IsUUID('4', { each: true })
  @Field(() => [ID])
  studentIds: string[];
}
