import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // save schema in memory and re-generate on every nest proj startup
      autoSchemaFile: 'src/schema.gql',
    }),
    LessonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
