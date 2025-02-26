import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  // accept createStudentInput DTO as argument
  createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const { firstname, lastname } = createStudentInput;

    const student = this.studentRepository.create({
      id: uuid(),
      firstname,
      lastname,
    });

    return this.studentRepository.save(student);
  }
}
// The @Args('createStudentInput') tells NestJS to extract the argument named createStudentInput from the GraphQL request payload.
// The createStudentInput: CreateStudentInput ensures TypeScript knows the expected shape of the argument.
// It extracts the createStudentInput argument from the GraphQL request.
// It validates that the received data matches the CreateStudentInput type.
// It ensures that only the expected fields are passed, avoiding extra/unwanted data.
