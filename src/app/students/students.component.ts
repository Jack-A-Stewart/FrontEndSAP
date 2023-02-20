import {Component, OnInit, ViewChild} from '@angular/core';
import {Student} from "../model/student.model";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {StudentsService} from "./students.service";
import {Course} from "../model/course.model";
import {CoursesService} from "../courses/courses.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent {
  title: string = 'Students';
  public students: Student[] = [];
  public courses: Course[] = [];
  public editStudent: Student | undefined;
  @ViewChild('editForm') editForm: NgForm | undefined;


  constructor(private studentsService: StudentsService, private coursesService: CoursesService) {
  }

  ngOnInit(): void {
    this.getStudents();
    this.getCourses();
  }

  public getStudents(): void {
    this.studentsService.getStudents().subscribe({
      next: (students: Student[]) => {
        this.students = students;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }

  public onAddStudent(studentForm: NgForm) {
    this.studentsService.addStudent(studentForm.value).subscribe({
      next: (response: Student) => {
        console.log(response);
        this.getStudents();
        studentForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }

  public onEditStudent(editForm: NgForm) {
    this.studentsService.editStudent(editForm.value).subscribe({
      next: (response: Student) => {
        console.log(response);
        editForm.reset();
        this.getStudents();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }

  public onDeleteStudent(id?: number) {
    this.studentsService.deleteStudent(id).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getStudents();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
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

  public onOpenModal(id: number) {
    this.editStudent = this.students.find((student)=> { return student.id === id });
    this.editForm?.setValue({
      firstName: this.editStudent?.firstName,
      lastName: this.editStudent?.lastName,
      email: this.editStudent?.email
    });
  }

  public onAddCourseStatus(courseStatusForm: NgForm, student?: Student) {
    console.log(courseStatusForm.value);
  }
}



