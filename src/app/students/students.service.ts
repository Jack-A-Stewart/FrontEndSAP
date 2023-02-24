import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from "../model/student.model";


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  url: string = 'https://sap-production.up.railway.app/student';


  public getStudents() {
    return this.http.get<Student[]>(`${this.url}/all`);
  }

  public addStudent(student: Student) {
    return this.http.post<Student>(`${this.url}/add`, student);
  }

  public editStudent(student: Student) {
    return this.http.put<Student>(`${this.url}/update`, student);
  }

  public deleteStudent(id?: number) {
    return this.http.delete<void>(`${this.url}/delete/${id}`);
  }

  public addCourseStatus(data: any) {
    return this.http.post<void>(`${this.url}/setCourseStatus`, data);
  }

}
