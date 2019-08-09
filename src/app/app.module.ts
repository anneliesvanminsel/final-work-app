import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthService } from "./services/auth.service";
import { ClassgroupService } from './services/classgroup.service';
import { CourseService } from './services/course.service';
import { StudentTeacherService } from './services/student-teacher.service';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MaterialsListComponent } from './materials/materials-list/materials-list.component';
import { MaterialsDetailComponent } from './materials/materials-detail/materials-detail.component';
import { CoursesDetailComponent } from './courses/courses-detail/courses-detail.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
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
import { IndexComponent } from './index/index.component';
import { PricingComponent } from './index/pricing/pricing.component';
import { TestimonialComponent } from './index/testimonial/testimonial.component';
import { RegisterComponent } from './forms/register/register.component';
import { LoginComponent } from './forms/login/login.component';
import { CardComponent } from './components/card/card.component';
import { ColorrowComponent } from './components/colorrow/colorrow.component';
import { NavigationTeacherComponent } from './header/navigation-teacher/navigation-teacher.component';
import { ButtonComponent } from './components/button/button.component';
import { ButtonLinkComponent } from './components/button-link/button-link.component';
import { IconComponent } from './components/icon/icon.component';
import { InputfieldComponent } from './components/inputfield/inputfield.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { AddstudentComponent } from './students/addstudent/addstudent.component';
import { StudentItemComponent } from './students/students-list/student-item/student-item.component';
import { FooterIndexComponent } from './footer/footer-index/footer-index.component';

const appRoutes: Routes = [
  {
    path: 'teacher/classes',
    component: ClassesListComponent
  },
  {
    path: 'teacher/courses',
    component: CoursesListComponent
  },
  {
    path: 'teacher/materials',
    component: MaterialsListComponent
  },
  { path: 'addclass',
    component: AddClassComponent
  },
  {
    path: 'teacher/editclass/:id',
    component: EditClassComponent
  },
  {
    path: 'teacher/detailclass/:id',
    component: ClassesDetailComponent
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

    // General Components
    IndexComponent,
    PricingComponent,
    TestimonialComponent,

    // All Authentication Components
    RegisterComponent,
    LoginComponent,

    // All Header Components
    HeaderTeacherComponent,
    HeaderStudentComponent,
    NavigationTeacherComponent,

    // All Footer Components
    FooterTeacherComponent,
    FooterStudentComponent,

    // All components for materials
    MaterialsListComponent,
    MaterialsDetailComponent,

    // All components for courses
    CoursesDetailComponent,
    CoursesListComponent,
    CourseItemComponent,

    // All components for Classes
    ClassesListComponent,
    ClassesDetailComponent,
    AddClassComponent,
    EditClassComponent,
    ClassItemComponent,

    // All re-usable components
    CardComponent,
    ColorrowComponent,
    ButtonComponent,
    ButtonLinkComponent,
    IconComponent,
    InputfieldComponent,
    StudentsListComponent,
    AddstudentComponent,
    StudentItemComponent,
    FooterIndexComponent,
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
    AngularFireAuthModule,
  ],
  providers: [
    ClassgroupService,
    CourseService,
    AuthService,
    StudentTeacherService,
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
