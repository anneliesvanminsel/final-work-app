import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule } from '@angular/material/select';

import { AuthService } from "./services/auth.service";
import { ClassgroupService } from './services/classgroup.service';
import { CourseService } from './services/course.service';
import { StudentTeacherService } from './services/student-teacher.service';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
//headers - navigation
import {AppRoutingModule} from './app-routing.module';
import { HeaderTeacherComponent } from './header/header-teacher/header-teacher.component';
import { HeaderStudentComponent } from './header/header-student/header-student.component';
import { NavigationTeacherComponent } from './header/navigation-teacher/navigation-teacher.component';
//footers
import { FooterTeacherComponent } from './footer/footer-teacher/footer-teacher.component';
import { FooterIndexComponent } from './footer/footer-index/footer-index.component';
//index
import { IndexComponent } from './index/index.component';
import { PricingComponent } from './index/pricing/pricing.component';
import { TestimonialComponent } from './index/testimonial/testimonial.component';
//teacher
import { ClassesListComponent } from './classes/classes-list/classes-list.component';
import { ClassesDetailComponent } from './classes/classes-detail/classes-detail.component';
import { AddClassComponent } from './classes/addclass/addclass.component';
import { EditClassComponent } from './classes/editclass/editclass.component';
import { ClassItemComponent } from './classes/classes-list/class-item/class-item.component';
import { CoursesDetailComponent } from './courses/courses-detail/courses-detail.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CourseItemComponent } from './courses/courses-list/course-item/course-item.component';
import { AddcourseComponent } from './courses/addcourse/addcourse.component';
import { EditcourseComponent } from './courses/editcourse/editcourse.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CoursesComponent } from './courses/courses.component';
import { ClassesComponent } from './classes/classes.component';
import { MaterialsListComponent } from './materials/materials-list/materials-list.component';
import { MaterialsDetailComponent } from './materials/materials-detail/materials-detail.component';
import {MaterialService} from './services/material.service';
import { MaterialItemComponent } from './materials/materials-list/material-item/material-item.component';
import { AddmaterialComponent } from './materials/addmaterial/addmaterial.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { AddstudentComponent } from './students/addstudent/addstudent.component';
import { StudentItemComponent } from './students/students-list/student-item/student-item.component';
import { SettingsComponent } from './settings/settings.component';
//student components
import { StudentComponent } from './student/student.component';
import { StudentsettingsComponent } from './student/studentsettings/studentsettings.component';
import { StudentcoursesComponent } from './student/studentcourses/studentcourses.component';
import { StudentmaterialsComponent } from './student/studentmaterials/studentmaterials.component';
import { StudentmaterialdetailComponent } from './student/studentmaterialdetail/studentmaterialdetail.component';
import { StudentcourseslistComponent } from './student/studentcourses/studentcourseslist/studentcourseslist.component';
import { StudentcoursedetailComponent} from './student/studentcoursedetail/studentcoursedetail.component';
// authentication
import { RegisterComponent } from './forms/register/register.component';
import { LoginComponent } from './forms/login/login.component';
import {HttpClientModule} from '@angular/common/http';
//reusable components
import { CardComponent } from './components/card/card.component';
import { ColorrowComponent } from './components/colorrow/colorrow.component';
import { ButtonComponent } from './components/button/button.component';
import { ButtonLinkComponent } from './components/button-link/button-link.component';
import { IconComponent } from './components/icon/icon.component';
import {SpinnerComponent} from '../resources/spinner/spinner.component';
import { NavigationStudentComponent } from './header/navigation-student/navigation-student.component';
import {ExerciseService} from './services/exercise.service';
import { ExerciseComponent } from './exercise/exercise.component';
import { MultiplechoiceComponent } from './exercise/type/multiplechoice/multiplechoice.component';
import { CrosswordComponent } from './exercise/type/crossword/crossword.component';
import { McAnswerComponent } from './exercise/type/multiplechoice/mc-answer/mc-answer.component';
import { McQuestionComponent } from './exercise/type/multiplechoice/mc-question/mc-question.component';
import {QuestionService} from "./services/question.service";
import {AnswerService} from "./services/answer.service";
import {CrosswordService} from './services/crossword.service';
import {GridService} from './services/crossword/grid.service';
import {WordService} from './services/crossword/word.service';
import {MatrixService} from './services/crossword/matrix.service';
import {BlockService} from './services/crossword/block.service';
import {ClueService} from './services/crossword/clue.service';
import { AddexerciseComponent } from './exercise/addexercise/addexercise.component';


@NgModule({
    declarations: [
        AppComponent,

        // General Components
        IndexComponent,
        PricingComponent,
        TestimonialComponent,
        FooterIndexComponent,

        // All Authentication Components
        RegisterComponent,
        LoginComponent,

        // All Header Components
        HeaderTeacherComponent,
        HeaderStudentComponent,
        NavigationTeacherComponent,

        // All Footer Components
        FooterTeacherComponent,

        // All components for teachers
        MaterialsListComponent,
        MaterialsDetailComponent,
        AddmaterialComponent,
        CoursesListComponent,
        CoursesDetailComponent,
        AddcourseComponent,
        EditcourseComponent,
        ClassesListComponent,
        ClassItemComponent,
        ClassesDetailComponent,
        AddClassComponent,
        EditClassComponent,
        StudentsListComponent,
        AddstudentComponent,
        StudentItemComponent,
        SettingsComponent,
        TeacherComponent,
        CoursesComponent,
        ClassesComponent,
        
        //All components for students
        StudentComponent,
        StudentsettingsComponent,
        StudentcoursesComponent,
        StudentmaterialsComponent,
        StudentmaterialdetailComponent,
        StudentcourseslistComponent,
        StudentcoursedetailComponent,
        NavigationStudentComponent,
        

        // All re-usable components
        CardComponent,
        ColorrowComponent,
        ButtonComponent,
        ButtonLinkComponent,
        IconComponent,
        SpinnerComponent,
        ExerciseComponent,
        MaterialItemComponent,
        CourseItemComponent,
        MultiplechoiceComponent,
        CrosswordComponent,
        McAnswerComponent,
        McQuestionComponent,
        AddexerciseComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        FontAwesomeModule,
        AngularFireAuthModule,
        BrowserAnimationsModule,
        MatSelectModule,
        HttpClientModule,
    ],
    exports: [
        MatSelectModule,
    ],
    providers: [
        ClassgroupService,
        CourseService,
        AuthService,
        StudentTeacherService,
        MaterialService,
        ExerciseService,
        QuestionService,
        AnswerService,
        CrosswordService,
        GridService,
        WordService,
        MatrixService,
        BlockService,
        ClueService,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
