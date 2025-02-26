import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonINput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { StudentService } from 'src/student/student.service';
import { Lesson } from './lesson.entity';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}
  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }
  // [LessonType] - array o LessonType in graphql
  @Query((returns) => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
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

  @Mutation((returns) => LessonType)
  assignLessonToStudents(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    return this.lessonService.assignLessonToStudents(
      assignStudentsToLessonInput,
    );
  }

  @ResolveField()
  // here name of the function is same as field which we're trying to resolve
  async students(@Parent() lesson: Lesson) {
    console.log(lesson.students);
    // return lesson.students;
    const studentsArr = await this.studentService.getManyStudents(
      lesson.students,
    );
    console.log(studentsArr);
    return studentsArr;
  }
}
