



import { Component, OnInit,ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Person } from './interfaces/person'
import { MatTable } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
const httpOptions = {
headers: new HttpHeaders({
'Content-Type': 'application/json',
'Authorization': 'my-auth-token'
})
};

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
   columnas: String[] = ["nombre","apellidos","edad","dni", "cumpleanos","colorFav","sexo", "actualizar","borrar"]
  position: any = 0
  public personaForm: FormGroup;
  actualizar=false;

   urlAPI = 'http://localhost:3000';

  //contacts: Array<Person> = [];
contacts:any;

  contact: Person = {
    _id:"",
    nombre : "",
        apellidos: "",
        edad: "",
        dni: "",
        cumpleanos: new Date(),
        colorFav: "",
        sexo: ""

  }


  @ViewChild(MatTable) tabla1: MatTable<Person>;

  favouriteColours = [
    { id: 1, value: 'Rojo' },
    { id: 2, value: 'Azul' },
    { id: 3, value: 'Amarillo' },
    { id: 4, value: 'Verde' },
    { id: 5, value: 'Rosa' }
  ];


  sexos = [
    { id: 1, value: 'Hombre' },
    { id: 2, value: 'Mujer' },
    { id: 3, value: 'Otro' },
    { id: 4, value: 'No especificado' }
  ];



  constructor(private httpClient: HttpClient) { 
   }

   g
 

  ngOnInit(): void {
    this.personaForm = new FormGroup({
      nombre : new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]),
      edad:new FormControl('', [Validators.required, Validators.min(0),Validators.max(125)]),
      dni: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}[A-Za-z]{1}')]),
     cumpleanos: new FormControl(new Date()),
     colorFav:new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
    });
    this.getUsers();
  }

  getUsers(){
    const url = this.urlAPI + '/users';
    this.httpClient.get(url).subscribe(apiData => {
    this.contacts = apiData;
    console.log("USER"+url);
    console.log (this.contacts);
        });
   }

   addUser (user: Person): Observable<Person> {
    const url = this.urlAPI + '/users';
    console.log("USERPOST"+url);
    console.log (this.contact);
    return this.httpClient.post<Person>(url, user, httpOptions)
    .pipe(
catchError(err => {
  console.log('Handling error locally and rethrowing it...', err);
  return throwError(err);
})

    );
    
    }
deleteUser (id: String): Observable<{}> {
  const url = this.urlAPI + '/users/'+ id;
  console.log("userdelete"+url);
  return this.httpClient.delete(url, httpOptions)
  .pipe(
    catchError(err => {
      console.log('Handling error locally and rethrowing it...', err);
      return throwError(err);
    }));
  }

  updateUser (user: Person): Observable<Person> {
    const url = this.urlAPI + '/users/'+ user._id;
    console.log("updateURl "+url);
    return this.httpClient.put<Person>(url, user, httpOptions)
    .pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
      );
    
    }
  public aceptar( form:NgForm): void{
    this.updateUser(this.contact).subscribe(
      contact=>
     this.getUsers());
   
    this.setActualizar();
    this.contact = {
      _id:"",
      nombre: "",
      apellidos: "",
      edad: "",
      dni: "",
      cumpleanos: new Date(),
      colorFav: "",
      sexo: "",
    }
    form.resetForm()
  }


  public actualizarFila (cod:number):void{
   this.contact  = this.contacts[ cod ];
    //this.contact.cumpleanos= new Date (this.contacts[ cod ].cumpleanos,);
    this.setActualizar();
  }

  public borrarFila(cod: String):void{
    if (confirm("Realmente quiere borrarlo?")) {
      //this.contacts.splice(cod, 1);
      this.deleteUser(cod).subscribe( contact=>
        this.getUsers());
      this.tabla1.renderRows();
    }
  }

  public getActualizar():boolean{
    return this.actualizar;
  }

  private setActualizar(): void{
    this.actualizar=!this.actualizar;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.personaForm.controls[controlName].hasError(errorName);
  }
  public agregar(form:NgForm) {
    if (!this.getActualizar()){
     let ageNum = parseInt(this.contact.edad)
    if(ageNum > 0 && ageNum <= 125){

      this.addUser(this.contact).subscribe(
        contact=>
       this.getUsers());
   // this.contacts.push( this.contact )
    this.tabla1.renderRows();
    }
    this.contact = {
      _id:"",
      nombre: "",
      apellidos: "",
      edad: "",
      dni: "",
      cumpleanos: new Date(),
      colorFav: "",
      sexo: ""
    }
    form.resetForm()
  }
}
}

