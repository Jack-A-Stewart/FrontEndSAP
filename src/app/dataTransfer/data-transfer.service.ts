import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Student } from "../model/student.model";
import { Course } from "../model/course.model";
import { CourseStatus } from "../model/courseStatus.model";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private endpointS = 'student';
  private endpointC = 'course';

  private domain: string | undefined;


  constructor(private http: HttpClient) {
    this.domain = environment.domain;
  }


  public getStudents() {
    return this.http.get<Student[]>(`${this.domain}${this.endpointS}/all`);
  }

  public addStudent(student: Student) {
    return this.http.post<Student>(`${this.domain}${this.endpointS}/add`, student);
  }

  public editStudent(student: Student) {
    return this.http.put<Student>(`${this.domain}${this.endpointS}/update`, student);
  }

  public deleteStudent(id?: number) {
    return this.http.delete<void>(`${this.domain}${this.endpointS}/delete/${id}`);
  }

  public addCourseStatus(data: any) {
    return this.http.post<void>(`${this.domain}${this.endpointS}/setCourseStatus`, data);
  }

  public getCourses() {
    return this.http.get<Course[]>(`${this.domain}${this.endpointC}/all`);
  }

  public addCourse(course: Course) {
    return this.http.post<Course>(`${this.domain}${this.endpointC}/add`, course);
  }

  public deleteCourse(id: number) {
    return this.http.delete<void>(`${this.domain}${this.endpointC}/delete/${id}`);
  }

  public getCourseStatus(id: number) {
    return this.http.get<CourseStatus[]>(`${this.domain}${this.endpointS}/findCourseAndStatus/${id}`)
  }


}
