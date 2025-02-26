import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonINput } from './lesson.input';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}
  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Mutation((returns) => LessonType)
  createLesson(
    // to get argument
    @Args('createLessonInput') createLessonInput: CreateLessonINput,
    // @Args('name') name: string,
    // @Args('startDate') startDate: string,
    // @Args('endDate') endDate: string,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }
}
