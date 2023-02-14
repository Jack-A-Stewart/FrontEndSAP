import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from "./students/students.component";
import { CoursesComponent } from "./courses/courses.component";
import { NavComponent } from "./nav/nav.component";

const routes: Routes = [
  { path: 'students', component: StudentsComponent},
  { path: 'courses', component: CoursesComponent},
  { path: 'nav', component: NavComponent},
  { path: '', redirectTo: 'students', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
