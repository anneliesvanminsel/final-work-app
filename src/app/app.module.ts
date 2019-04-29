import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
import { AddclassComponent } from './classes/addclass/addclass.component';
import { EditclassComponent } from './classes/editclass/editclass.component';
import { HeaderIndexComponent } from './header/header-index/header-index.component';
import { ClassItemComponent } from './classes/classes-list/class-item/class-item.component';
import { CourseItemComponent } from './courses/courses-list/course-item/course-item.component';


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
  { path: 'addclass',
    component: AddclassComponent
  },
  {
    path: 'teacher/classes/editclass/:id',
    component: EditclassComponent
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
    AddclassComponent,
    EditclassComponent,
    HeaderIndexComponent,
    ClassItemComponent,
    CourseItemComponent,
  ],
  imports: [
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
