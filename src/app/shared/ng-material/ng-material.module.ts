import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatProgressBarModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule 
    
  ],
  providers: [DatePipe]
})
export class NgMaterialModule { }
