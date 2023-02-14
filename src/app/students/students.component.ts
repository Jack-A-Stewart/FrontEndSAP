import {Component, OnInit} from '@angular/core';
import {Student} from "../model/student.model";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {StudentsService} from "./students.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent {
  title = 'Students';

  public students: Student[] = [];

  constructor(private studentsService: StudentsService) {
  }

  ngOnInit(): void {
    this.getStudents();
  }

  public getStudents(): void {
    this.studentsService.getStudents().subscribe({
      next: (students: Student[]) => {
        this.students = students;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
      complete: () => {}
    });
  }


  onAddStudent(studentForm: NgForm) {
    document.getElementById('studentForm')?.click();
    this.studentsService.addStudent(studentForm.value).subscribe({
      next: (response: Student) => {
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
      complete: () => {
      }
    });
  }


}



