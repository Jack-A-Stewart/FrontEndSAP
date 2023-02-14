import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule} from "@angular/forms";
import { StudentsService} from "./students/students.service";
import { HttpClientModule } from "@angular/common/http";
import {CoursesService} from "./courses/courses.service";

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    CoursesComponent,
    NavComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [StudentsService, CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
