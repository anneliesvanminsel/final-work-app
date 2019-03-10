import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MaterialsComponent } from './materials/materials.component';
import { MaterialsListComponent } from './materials/materials-list/materials-list.component';
import { MaterialsDetailComponent } from './materials/materials-detail/materials-detail.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesDetailComponent } from './courses/courses-detail/courses-detail.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassesListComponent } from './classes/classes-list/classes-list.component';
import { ClassesDetailComponent } from './classes/classes-detail/classes-detail.component';
import { HeaderTeacherComponent } from './header/header-teacher/header-teacher.component';
import { HeaderStudentComponent } from './header/header-student/header-student.component';
import { FooterTeacherComponent } from './footer/footer-teacher/footer-teacher.component';
import { FooterStudentComponent } from './footer/footer-student/footer-student.component';

const appRoutes: Routes = [
  {
    path: 'teacher/classes',
    component: ClassesComponent
  },
  {
    path: 'teacher/courses',
    component: CoursesComponent
  },
  {
    path: 'teacher/materials',
    component: MaterialsComponent
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MaterialsComponent,
    MaterialsListComponent,
    MaterialsDetailComponent,
    CoursesComponent,
    CoursesDetailComponent,
    CoursesListComponent,
    ClassesComponent,
    ClassesListComponent,
    ClassesDetailComponent,
    HeaderTeacherComponent,
    HeaderStudentComponent,
    FooterTeacherComponent,
    FooterStudentComponent,
  ],
  imports: [
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
