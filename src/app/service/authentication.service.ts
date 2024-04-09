import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  baseUrl = 'http://localhost:5143/Login/';
  status : number = 0;
  listStatus = statoAccesso
  utente : any
  utenteId:number = 0
  imageQRCode = ""
  listaRuoliUtente:any[] = []
  httpOptions:Object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials : true,
    observe:'response'
}
  
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor( private http: HttpClient,) { }


  public getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
  public setIsAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticated.next(isAuthenticated);
  }
  
  // Login da DB
  login(loginObj:any): Observable<any> {
    
    return this.http.post<any>(`${this.baseUrl}CredenzialiValide`, loginObj, this.httpOptions)
    // .pipe(
    //   tap(() => this.setIsAuthenticated(true))
    // );
  }

  resetPasswordReset(username:string)
  {
    return this.http.post<any>(`${this.baseUrl}ResetPasswordUtente/${username}`,{},)
  }

  newPassword(newPasswordObj:any) : Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}ModificaPasswordUtente`,newPasswordObj, {withCredentials : true})
  }



  ConfermaMFA(validatoreMFA:string,expire1week:boolean) {
    console.log(this.utenteId + validatoreMFA)
    return this.http
      .post<any>(
        'http://localhost:5143/Login/ConfermaValidatore',
        {utenteId:this.utenteId,codiceVerificaTemporaneo:validatoreMFA,expire1week:expire1week},this.httpOptions
      )
  }
  ConfermaRuolo(ruoloId:number)
  {
    console.log("aaaaa"+this.utenteId + "bbbbb"+ruoloId)
    return this.http
      .post<any>(
        'http://localhost:5143/Login/AccessoUtente',
        {idUtente:this.utenteId,idRuolo:ruoloId},this.httpOptions
        
      )

  }
}


export enum statoAccesso {
  credenzialiValide = 215, 
  utenteLoggato,
  mancaMFA,
  scadutoMFA,
  richiestaResetPsw,
  accessoNegato = 401
}
