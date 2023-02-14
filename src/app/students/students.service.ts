import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student} from "../model/student.model";


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:8080/student';

  public getStudents() {
    return this.http.get<Student[]>(`${this.url}/all`);
  }

  public addStudent(student: Student) {
    return this.http.post<Student>(`${this.url}/add`, student);
  }

  public deleteStudent(id: number) {
    return this.http.delete<void>(`${this.url}/delete/${id}`);
  }
}
