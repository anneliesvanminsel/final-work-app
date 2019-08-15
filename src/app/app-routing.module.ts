import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import { TeacherGuard } from './services/teacher.guard';
import { StudentGuard } from './services/student.guard';

import {LoginComponent} from './forms/login/login.component';
import {RegisterComponent} from './forms/register/register.component';
import {ClassesListComponent} from './classes/classes-list/classes-list.component';
import {AddClassComponent} from './classes/addclass/addclass.component';
import {EditClassComponent} from './classes/editclass/editclass.component';
import {ClassesDetailComponent} from './classes/classes-detail/classes-detail.component';
import {AddstudentComponent} from './students/addstudent/addstudent.component';
import {CoursesListComponent} from './courses/courses-list/courses-list.component';
import {AddcourseComponent} from './courses/addcourse/addcourse.component';
import {EditcourseComponent} from './courses/editcourse/editcourse.component';
import {CoursesDetailComponent} from './courses/courses-detail/courses-detail.component';
import {AddmaterialComponent} from './materials/addmaterial/addmaterial.component';
import {SettingsComponent} from './settings/settings.component';
import {IndexComponent} from './index/index.component';
import {TeacherComponent} from './teacher/teacher.component';
import {CoursesComponent} from './courses/courses.component';
import {ClassesComponent} from './classes/classes.component';
import {MaterialsDetailComponent} from './materials/materials-detail/materials-detail.component';
import {StudentComponent} from './student/student.component';
import {StudentcoursesComponent} from './student/studentcourses/studentcourses.component';
import {StudentmaterialdetailComponent} from './student/studentmaterialdetail/studentmaterialdetail.component';
import {StudentcourseslistComponent} from './student/studentcourses/studentcourseslist/studentcourseslist.component';
import {StudentcoursedetailComponent} from './student/studentcoursedetail/studentcoursedetail.component';
import {StudentsettingsComponent} from './student/studentsettings/studentsettings.component';

const appRoutes: Routes = [

    // --- ATHENTICATION ---

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },

    // --- STUDENT ROUTES ---

    {
        path: 'student',
        component: StudentComponent,
        canActivate: [StudentGuard],
        children: [
            {
                path: '',
                redirectTo: 'courses',
                pathMatch: 'full'
            },
            {
                path: 'courses',
                component: StudentcoursesComponent,
                children: [
                    { path: '',
                        component: StudentcourseslistComponent
                    },
                    {
                        path: 'detail/:courseid',
                        component: StudentcoursedetailComponent
                    },

                ],
            },
            {
                path: 'material/detail/:courseid/:materialid',
                component: StudentmaterialdetailComponent
            },
            {
                path: 'settings',
                component: StudentsettingsComponent
            },

        ]
    },

    // --- TEACHER ROUTES ---

    {
        path: 'teacher',
        component: TeacherComponent,
        canActivate: [TeacherGuard],
        children: [
            {
                path: 'classes',
                component: ClassesComponent,
                children: [
                    { path: '',
                        component: ClassesListComponent
                    },
                    { path: 'addclass',
                        component: AddClassComponent
                    },
                    {
                        path: 'editclass/:classid',
                        component: EditClassComponent
                    },
                    {
                        path: 'detail/:classid',
                        component: ClassesDetailComponent
                    },
                    {
                        path: 'addstudent/:classid',
                        component: AddstudentComponent
                    },
                ],
            },
            {
                path: 'courses',
                component: CoursesComponent,
                children: [
                    { path: '',
                        component: CoursesListComponent
                    },
                    { path: 'addcourse',
                        component: AddcourseComponent
                    },
                    {
                        path: 'editcourse/:courseid',
                        component: EditcourseComponent
                    },
                    {
                        path: 'detail/:courseid',
                        component: CoursesDetailComponent
                    },
                    {
                        path: 'addmaterial/:courseid',
                        component: AddmaterialComponent
                    },
                    {
                        path: 'material/detail/:courseid/:materialid',
                        component: MaterialsDetailComponent
                    },
                ],
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
        ],
    },

    // --- INDEX ---

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
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
