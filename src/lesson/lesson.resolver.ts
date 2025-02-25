import { Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  @Query((returns) => LessonType)
  lesson() {
    return {
      id: '1asmcdo91',
      name: 'NestJS',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
}
