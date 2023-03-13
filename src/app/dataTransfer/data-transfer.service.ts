import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Student} from "../model/student.model";
import {Course} from "../model/course.model";
import {CourseStatus} from "../model/courseStatus.model";

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor(private http: HttpClient) { }

  // Dev:
//   urlStudent: string = 'http://localhost:8080/student';
//
//   urlCourse: string = 'http://localhost:8080/course';

  // Prod:
  urlStudent: string = 'https://sap-production.up.railway.app/student';

  urlCourse: string = 'https://sap-production.up.railway.app/course';


  public getStudents() {
    return this.http.get<Student[]>(`${this.urlStudent}/all`);
  }

  public addStudent(student: Student) {
    return this.http.post<Student>(`${this.urlStudent}/add`, student);
  }

  public editStudent(student: Student) {
    return this.http.put<Student>(`${this.urlStudent}/update`, student);
  }

  public deleteStudent(id?: number) {
    return this.http.delete<void>(`${this.urlStudent}/delete/${id}`);
  }

  public addCourseStatus(data: any) {
    return this.http.post<void>(`${this.urlStudent}/setCourseStatus`, data);
  }

  public getCourses() {
    return this.http.get<Course[]>(`${this.urlCourse}/all`);
  }

  public addCourse(course: Course) {
    return this.http.post<Course>(`${this.urlCourse}/add`, course);
  }

  public deleteCourse(id: number) {
    return this.http.delete<void>(`${this.urlCourse}/delete/${id}`);
  }

  public getCourseStatus(id: number) {
    return this.http.get<CourseStatus[]>(`${this.urlStudent}/findCourseAndStatus/${id}`)
  }


}
