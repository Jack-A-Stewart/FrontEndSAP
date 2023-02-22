import {Component, ViewChild} from '@angular/core';
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
  public isConnected: boolean = false;


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
        this.isConnected = true;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.isConnected = false;
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

  public onOpenModal(student: Student) {
    this.editStudent = student;
    this.editForm?.setValue({
      id: this.editStudent?.id,
      firstName: this.editStudent?.firstName,
      lastName: this.editStudent?.lastName,
      email: this.editStudent?.email
    });
  }

  public onAddCourseStatus(courseStatusForm: NgForm, id?: number) {
    let courseName = courseStatusForm.value.name;
    let status = courseStatusForm.value.status;
    let data = {
      id: id,
      courseName: courseName,
      status: status
    }
    this.studentsService.addCourseStatus(data).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getStudents();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }

}

