import { Component, Inject, Input } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgIf, NgFor } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  AttivitaGiornoCalendario,
  GiornoDiLavoro,
} from '../../../dto/request/calendario';
import { RapportinoService } from '../../../service/rapportino.service';
import { AggiungiOrdinarioComponent } from '../aggiungi-ordinario/aggiungi-ordinario.component';
import { AggiungiReperibilitaComponent } from '../aggiungi-reperibilita/aggiungi-reperibilita.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { GiornoLavorativo } from '../../../dto/request/giornolavorativo';
import { AggiungiAssenzaComponent } from '../aggiungi-assenza/aggiungi-assenza.component';

@Component({
  selector: 'app-attivita-giorno',
  templateUrl: './attivita-giorno.component.html',
  styleUrl: './attivita-giorno.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    NgFor,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggle,
    NgIf,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    AggiungiOrdinarioComponent,
    AggiungiReperibilitaComponent,
    MatCardModule,
    AggiungiAssenzaComponent,
  ],
})
export class AttivitaGiornoComponent {
  showOrdinario = false;
  showReperibilita = false;
  showAssenza = false;
  verificaGiornoCompletoInizio = "00:00"
  verificaGiornoCompletoFine = "23:59"
  giorno: GiornoLavorativo = {
    giornoLavoroId: this.data.giorno.giornoLavorativoId,
    oraEntrata: '09:00',
    oraInizioPausa: '12:00',
    oraFinePausa: '13:00',
    oraUscita: '18:00',
  };

  constructor(
    public dialogRef: MatDialogRef<AttivitaGiornoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { giorno: GiornoDiLavoro; giornoFestivo: boolean },
    public rapportinoService: RapportinoService
  ) {

    if (data.giorno.giornoLavorativoId != undefined)
      this.giorno.giornoLavoroId = data.giorno.giornoLavorativoId;
    if (
      this.data.giorno.oraEntrata != null &&
      this.data.giorno.oraEntrata != undefined
    ) {
      this.giorno.oraEntrata = this.data.giorno.oraEntrata;
      this.giorno.oraInizioPausa = this.data.giorno.oraInizioPausa;
      this.giorno.oraFinePausa = this.data.giorno.oraFinePausa;
      this.giorno.oraUscita = this.data.giorno.oraUscita;
    }
  }

  MostraOrdinario() {
    this.showOrdinario = !this.showOrdinario;
    this.showReperibilita = false;
    this.showAssenza = false;
  }
  MostraAssenza() {
    this.showAssenza = !this.showAssenza;
    this.showReperibilita = false;
    this.showOrdinario = false;
  }

  MostraReperibilita() {
    this.showReperibilita = !this.showReperibilita;
    this.showOrdinario = false;
    this.showAssenza = false;
  }

  AssenzaAggiunta()
  {
    this.dialogRef.close()
    this.rapportinoService.AggiornaBox()
  }

  ConfermaGiorno() {
    if (this.VerificaGiorno()) {
      this.rapportinoService.ConfermaGiorno(this.giorno)
    } else {
    }
  }

  AttivitaOrdinariaAggiunta(AttivitaDaAggiungere: AttivitaGiornoCalendario) {
    this.data.giorno.listaAttivitaGiorno.push(AttivitaDaAggiungere);
  }

  AnnullaGiorno() {
    this.dialogRef.close();
  }

  EliminaAttivita(attivitaId: number) {
    this.rapportinoService.EliminaAttivita(
      attivitaId,
      this.data.giorno.giornoLavorativoId!
    );

    this.data.giorno.listaAttivitaGiorno =
      this.data.giorno.listaAttivitaGiorno.filter(
        (attivita) => attivita.attivitaId != attivitaId
      );
  }

  EliminaAssenza(assenzaId: number) {
    this.rapportinoService.EliminaAssenza(assenzaId)
      this.dialogRef.close()
    
  }

  VerificaGiorno() {
    let oreGiornoConvertiteDaTempo = 0;

    //conversione in ore lavorate gli orari giornata
    oreGiornoConvertiteDaTempo =
      Number(this.giorno.oraUscita!.split(':')[0]) -
      Number(this.giorno.oraEntrata!.split(':')[0]) -
      (Number(this.giorno.oraFinePausa!.split(':')[0]) -
        Number(this.giorno.oraInizioPausa!.split(':')[0])) +
      (Number(this.giorno.oraUscita!.split(':')[1]) -
        Number(this.giorno.oraEntrata!.split(':')[1]) -
        (Number(this.giorno.oraFinePausa!.split(':')[1]) -
          Number(this.giorno.oraInizioPausa!.split(':')[1]))) /
        60;

    if(oreGiornoConvertiteDaTempo < 8)
    {
      alert("numero ore assegnate alla giornata non valido")
      return false
    }else{
      return true;
    }
    
  }


  Prova(){
    console.log(this.data.giorno)
  }
}
