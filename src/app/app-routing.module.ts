import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';

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

    // --- TEACHER ROUTES ---

    // - class-routes -
    {
        path: 'teacher/classes',
        component: ClassesListComponent
    },
    { path: 'teacher/classes/addclass',
        component: AddClassComponent
    },
    {
        path: 'teacher/classes/editclass/:classid',
        component: EditClassComponent
    },
    {
        path: 'teacher/classes/detail/:classid',
        component: ClassesDetailComponent
    },
    {
        path: 'teacher/classes/addstudent/:classid',
        component: AddstudentComponent
    },

    // - course routes -
    {
        path: 'teacher/courses',
        component: CoursesListComponent
    },
    { path: 'teacher/courses/addcourse',
        component: AddcourseComponent
    },
    {
        path: 'teacher/courses/editcourse/:courseid',
        component: EditcourseComponent
    },
    {
        path: 'teacher/courses/detail/:courseid',
        component: CoursesDetailComponent
    },
    {
        path: 'teacher/courses/addmaterial/:courseid',
        component: AddmaterialComponent
    },

    // - settings routes -
    {
        path: 'teacher/settings',
        component: SettingsComponent
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
