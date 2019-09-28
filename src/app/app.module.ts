import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ExperimentsComponent } from './experiments/experiments.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { environment } from 'environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { ExperimentsService } from './experiments/experiments.servise';
import { PeopleService } from './experiments/people.servise';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ExperimentsComponent
  ],
  imports: [
    BrowserModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot(effects),
  ],
  providers: [ExperimentsService, PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
