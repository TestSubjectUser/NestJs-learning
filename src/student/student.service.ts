import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { In, Repository } from 'typeorm';
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
  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }
  async getStudent(id: string): Promise<Student | null> {
    return this.studentRepository.findOne({ where: { id } });
  }
  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: { $in: studentIds },
      } as any, // Use type assertion to bypass TypeORM's type checking
    });

    // const promises = studentIds.map((id) =>
    //   this.studentRepository.findOne({ where: { id } }),
    // );

    // const students = await Promise.all(promises);
    // // Filter out any null results
    // return students.filter((student) => student !== null) as Student[];

    // below approach didn't worked so this above approach, might be
    // TypeORM version issues: Some versions of TypeORM have had bugs with the In operator, especially when working with UUID primary keys.

    //   where: {
    //     id: In(studentIds),
    //     // id: "6209e3d3-946e-4694-b963-98fb34454fbe",
    //   },
    // });
    // console.log('Students', students);
    // return students;
  }
}
// The @Args('createStudentInput') tells NestJS to extract the argument named createStudentInput from the GraphQL request payload.
// The createStudentInput: CreateStudentInput ensures TypeScript knows the expected shape of the argument.
// It extracts the createStudentInput argument from the GraphQL request.
// It validates that the received data matches the CreateStudentInput type.
// It ensures that only the expected fields are passed, avoiding extra/unwanted data.
