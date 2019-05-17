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
import { AddClassComponent } from './classes/addclass/addclass.component';
import { EditClassComponent } from './classes/editclass/editclass.component';
import { ClassItemComponent } from './classes/classes-list/class-item/class-item.component';
import { CourseItemComponent } from './courses/courses-list/course-item/course-item.component';
import { ClassgroupService } from './services/classgroup.service';
import { CourseService } from './services/course.service';
import { IndexComponent } from './index/index.component';
import { PricingComponent } from './index/pricing/pricing.component';
import { TestimonialComponent } from './index/testimonial/testimonial.component';
import { FormsComponent } from './forms/forms.component';
import { RegisterComponent } from './forms/register/register.component';
import { LoginComponent } from './forms/login/login.component';


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
    component: AddClassComponent
  },
  {
    path: 'editclass/:id',
    component: EditClassComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'index',
    component: IndexComponent
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
    AddClassComponent,
    EditClassComponent,
    ClassItemComponent,
    CourseItemComponent,
    IndexComponent,
    PricingComponent,
    TestimonialComponent,
    FormsComponent,
    RegisterComponent,
    LoginComponent,
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
  providers: [ClassgroupService, CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
