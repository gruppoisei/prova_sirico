import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { RapportinoService } from '../../../service/rapportino.service';

@Component({
  selector: 'app-aggiungi-reperibilita',
  templateUrl: './aggiungi-reperibilita.component.html',
  styleUrl: './aggiungi-reperibilita.component.scss',
  standalone:true,
  imports:[MatButtonModule,CommonModule,MatSlideToggle,MatCheckboxModule,MatFormFieldModule,MatInputModule,MatSelectModule,FormsModule, ReactiveFormsModule]

})
export class AggiungiReperibilitaComponent {

  inizioReperibilita?: string
  fineReperibilita?: string 
  commessa?: number


  constructor(public  rapportinoService:RapportinoService){
    
  }
  
}
