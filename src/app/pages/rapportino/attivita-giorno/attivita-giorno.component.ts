import { Component, Inject, Input } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgIf,NgFor } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { AttivitaGiornoCalendario, GiornoDiLavoro } from '../../../dto/request/calendario';
import { RapportinoService } from '../../../service/rapportino.service';
import { AggiungiOrdinarioComponent } from "../aggiungi-ordinario/aggiungi-ordinario.component";
import { AggiungiReperibilitaComponent } from "../aggiungi-reperibilita/aggiungi-reperibilita.component";
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { GiornoLavorativo } from '../../../dto/request/giornolavorativo';
import { AttivitaGiornoResponse } from '../../../dto/response/AttivitaGiorno';



@Component({
    selector: 'app-attivita-giorno',
    templateUrl: './attivita-giorno.component.html',
    styleUrl: './attivita-giorno.component.scss',
    standalone: true,
    imports: [CommonModule,MatIconModule, NgFor, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, ReactiveFormsModule, FormsModule, MatSlideToggle, NgIf, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatSelectModule, AggiungiOrdinarioComponent, AggiungiReperibilitaComponent, MatCardModule]
})
export class AttivitaGiornoComponent {
  entrata= "9:00";
  inizioPausa= "12:00"
  finePausa="13:00"
  uscita="18:00"
  showOrdinario= false;
  showReperibilita= false;
  giorno?: GiornoLavorativo
  





  constructor(public dialogRef: MatDialogRef<AttivitaGiornoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GiornoDiLavoro,public rapportinoService:RapportinoService) {

    }


MostraOrdinario() {
  this.showOrdinario= !this.showOrdinario 
  this.showReperibilita= false
}
  



MostraReperibilita(){
this.showReperibilita= !this.showReperibilita
this.showOrdinario= false
}
  
  onNoClick(): void {
    this.dialogRef.close();
  }

ConfermaGiorno(){ 
  this.VerificaGiorno();
  // this.giorno!.giornoLavoroId= this.data.giornoLavorativoId
  // this.giorno!.oraEntrata= this.entrata
  // this.giorno!.oraInizioPausa= this.inizioPausa
  // this.giorno!.oraFinePausa= this.finePausa
  // this.giorno!.oraUscita= this.uscita 
  


}

AttivitaOrdinariaAggiunta(AttivitaDaAggiungere:AttivitaGiornoCalendario){
  this.data.listaAttivitaGiorno.push(AttivitaDaAggiungere)
  
}

AnnullaGiorno(){

}

EliminaAttivita(attivitaId:number){
    this.rapportinoService.EliminaAttivita(attivitaId,this.data.giornoLavorativoId!)

    this.data.listaAttivitaGiorno = this.data.listaAttivitaGiorno.filter(attivita =>  attivita.attivitaId != attivitaId );
}


VerificaGiorno(){
  let ore =0
  let mezzore =0
  let sommaOreAttivita = 0
  ore = Number(this.uscita.split(":")[0])-Number(this.entrata.split(":")[0])-(Number(this.finePausa.split(":")[0])-Number(this.inizioPausa.split(":")[0]))
  mezzore = (Number(this.uscita.split(":")[1])-Number(this.entrata.split(":")[1])-(Number(this.finePausa.split(":")[1])-Number(this.inizioPausa.split(":")[1])))/60
  
  
  for(let i =0;i<this.data.listaAttivitaGiorno.length ;i++)
  {
    console.log("count "+i+": " + this.data.listaAttivitaGiorno[i].oreLavorate)
    console.log("count "+i+": " + this.data.listaAttivitaGiorno[i].oreStraordinario)
    console.log(this.data.listaAttivitaGiorno)
    console.log(this.rapportinoService.infoPersona.listaSedeLavoroPersona)
    // sommaOreAttivita = sommaOreAttivita + this.data.listaAttivitaGiorno[i].oreLavorate +this.data.listaAttivitaGiorno[i].oreStraordinario
  }
  console.log("somma attivita: "+sommaOreAttivita)
  console.log("somma ore: "+(ore+mezzore))
  if(sommaOreAttivita > 8 && sommaOreAttivita == (ore+mezzore))
  {
    alert("ok")
  }else{
    alert("errore")
  }

}


}

