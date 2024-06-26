import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ruoloFunzione } from '../dto/request/inserimentoNuovoRuolo';

@Injectable({
  providedIn: 'root'
})
export class AmministrazioneRuoloService { 
  
  constructor(
    private Http: HttpClient
  ) { }

  httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), responseType: 'text'
  };

  private apiUrl = 'http://localhost:5143/AmministrazioneRuolo'; 

  getFunzioni(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetFunzione`);    
  }

  insertNuovoRuolo(listaFunzioni: ruoloFunzione[]): Observable<ruoloFunzione> {    
    console.log('listaFunzioni:');
    console.log(listaFunzioni);
    
    var body = JSON.stringify(listaFunzioni);
    console.log('body: ' + body);
    
    return this.Http.post<ruoloFunzione>(`${this.apiUrl}/NuovoRuolo`, body, this.httpOptions);    
  }
  
}
