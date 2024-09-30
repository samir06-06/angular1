import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../../models/card';
import { DialogueComponent } from '../dialogue/dialogue.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() cardItem!: Card;
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  openUpdateCardModal(): void {
    this.dialog.open(DialogueComponent, {
      width: '400px',
      data: this.cardItem, // Passing the cardItem (Card details) to the dialogue
    });
  }
}
