// DTO
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID, MinLength } from 'class-validator';

// Decorator that marks a class as a GraphQL input type.
@InputType()
export class CreateLessonINput {
  @MinLength(1)
  @Field()
  name: string;

  @IsDateString()
  @Field()
  startDate: string;

  @IsDateString()
  @Field()
  endDate: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  students: string[];
}
// @Field
// () decorator is used to mark a specific class property as a GraphQL field. Only properties decorated with this decorator will be defined in the schema.
