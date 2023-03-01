import {Component, ViewChild} from '@angular/core';
import {Student} from "../model/student.model";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Course} from "../model/course.model";
import {DataTransferService} from "../dataTransfer/data-transfer.service";
import {CourseStatus} from "../model/courseStatus.model";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent {
  title: string = 'Students';
  public students: Student[] = [];
  public courses: Course[] = [];
  public courseStatuses: CourseStatus[] = [];

  public editStudent: Student | undefined;
  @ViewChild('editForm') editForm: NgForm | undefined;
  public isConnected: boolean = false;
  public success: boolean = false;


  constructor(private dataTransferService: DataTransferService) {
  }

  ngOnInit(): void {
    this.getStudents();
    this.getCourses();
  }

  public getStudents(): void {
    this.dataTransferService.getStudents().subscribe({
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
    this.dataTransferService.addStudent(studentForm.value).subscribe({
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
    this.dataTransferService.editStudent(editForm.value).subscribe({
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
    this.dataTransferService.deleteStudent(id).subscribe({
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
    this.dataTransferService.getCourses().subscribe({
      next: (courses: Course[]) => {
        this.courses = courses;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }

  public onOpenEditModal(student: Student) {
    this.editStudent = student;
    this.editForm?.setValue({
      id: this.editStudent?.id,
      firstName: this.editStudent?.firstName,
      lastName: this.editStudent?.lastName,
      email: this.editStudent?.email
    });
  }

  public onOpenListModal(student: Student) {
    this.editStudent = student;
    this.getCourseStatus(this.editStudent?.id);
  }

  public onAddCourseStatus(courseStatusForm: NgForm, id?: number) {
    let courseName = courseStatusForm.value.name;
    let status = courseStatusForm.value.status;
    let data = {
      id: id,
      courseName: courseName,
      status: status
    }
    this.dataTransferService.addCourseStatus(data).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getStudents();
        this.success = true;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.success = false;
      }
    });
  }

  public getCourseStatus(id: number) {
    this.dataTransferService.getCourseStatus(id).subscribe({
      next: (courseStatuses: CourseStatus[]) => {
        this.courseStatuses = courseStatuses;
    },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
    }
    });
  }

}

