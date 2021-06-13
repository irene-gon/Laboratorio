import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from "./material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
// Para cambiar el formato de fecha Mat-Datepicker a DD / MM / YYYY


import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }], // Para cambiar el formato de fecha Mat-Datepicker a DD / MM / YYYY
  bootstrap: [AppComponent]
})
export class AppModule { }
