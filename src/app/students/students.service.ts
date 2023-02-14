import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Student} from "../model/student.model";
import {StudentsComponent} from "./students.component";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  url: string = 'localhost:8080/student';

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.url}/all`);
  }

  public addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.url}/add`, student);
  }

}
