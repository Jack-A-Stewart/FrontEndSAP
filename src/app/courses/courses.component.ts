import {Component} from '@angular/core';
import {Course} from "../model/course.model";
import {CoursesService} from "./courses.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  title: string = 'Courses';

  public courses: Course[] = [];

  constructor(private coursesService: CoursesService) {
  }

  ngOnInit(): void {
    this.getCourses();
  }

  public getCourses(): void {
    this.coursesService.getCourses().subscribe({
      next: (courses: Course[]) => {
        this.courses = courses;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }

  public onAddCourse(courseForm: NgForm) {
    this.coursesService.addCourse(courseForm.value).subscribe({
      next: (response: Course) => {
        console.log(response);
        this.getCourses();
        courseForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }

  public onDeleteCourse(id: number) {
    this.coursesService.deleteCourse(id).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getCourses();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }


}
