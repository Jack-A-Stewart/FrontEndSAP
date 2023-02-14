import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Course} from "../model/course.model";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:8080/course';

  options: { headers: { "Content-Type": string } } = {headers: {'Content-Type': 'application/json'}};

  public getCourses() {
    return this. http.get<Course[]>(`${this.url}/all`);
  }

  public addCourse(course:  Course) {
    return this.http.post<Course>(`${this.url}/add`, course);
  }

  public deleteCourse(id: number) {
    return this.http.delete<void>(`${this.url}/delete/${id}`);
  }

}
