import { Field, ID, ObjectType } from '@nestjs/graphql';
import { StudentType } from 'src/student/student.type';

@ObjectType('Lesson')
export class LessonType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field((type) => [StudentType])
  students: StudentType[];
}
// Why Do You Need This File?
// This file defines a GraphQL Object Type (LessonType) for your NestJS application.
// It is necessary because NestJS follows the code-first approach for GraphQL,
// where TypeScript classes are used to define GraphQL types instead of writing a separate GraphQL schema manually.

// Automatically generates this GraphQL schema:
// type Lesson {
//     id: ID!
//     name: String!
//     startDate: String!
//     endDate: String!
// }

// This type is used in the Resolvers to specify the return type of GraphQL queries.
