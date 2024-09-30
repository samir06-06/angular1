import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Import MatDialog and MatDialogModule
import { MatButtonModule } from '@angular/material/button';
import { DialogueComponent } from './dialogue/dialogue.component';
import { CardService } from '../services/card.service';
import { CommonModule } from '@angular/common';
import { CardSearchComponent } from './card-search/card-search.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    CardComponent,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    CardSearchComponent,
  ], // Import MatDialogModule here
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'], // Use styleUrls (array) instead of styleUrl
})
export class CardsComponent implements OnInit {
  CreateNewCard() {
    throw new Error('Method not implemented.');
  }
  constructor(public dialog: MatDialog, public cardService: CardService) {}

  openDialog(): void {
    this.dialog.open(DialogueComponent, {
      width: '400px',
    });
  }

  ngOnInit(): void {
    this.cardService.getCards();
  }
}
