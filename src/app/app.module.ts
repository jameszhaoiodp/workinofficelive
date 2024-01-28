import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsItemComponent } from './components/news-list/news-item/news-item.component';
import { IntersectionObserverDirective } from './directives/intersection-observer.directive';
import { HttpClientModule } from '@angular/common/http';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { DragComponent } from './components/drag/drag.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {FlexLayoutModule, FlexModule, GridModule} from "@angular/flex-layout";
import { MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {RouterModule} from "@angular/router";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import { Drag2Component } from './components/drag2/drag2.component';
import {IntervalService} from "./components/dashboard/services/IntervalService";
import { Dashboard2Component } from './components/dashboard/dashboard2/dashboard2.component';
import { Dashboard3Component } from './components/dashboard/dashboard3/dashboard3.component';
// import { NgOptimizedImage } from '@angular/common';
// import {provideImageKitLoader} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    NewsItemComponent,
    IntersectionObserverDirective,

    DragComponent,
    DashboardComponent,
    Drag2Component,
    Dashboard2Component,
    Dashboard3Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    DragDropModule,
    FlexLayoutModule,
    FlexModule,
    GridModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,

    RouterModule
  ],

  providers: [IntervalService ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
