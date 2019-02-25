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
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
