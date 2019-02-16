import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MaterialsComponent } from './materials/materials.component';
import { MaterialsListComponent } from './materials/materials-list/materials-list.component';
import { MaterialsDetailComponent } from './materials/materials-detail/materials-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    MaterialsComponent,
    MaterialsListComponent,
    MaterialsDetailComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
