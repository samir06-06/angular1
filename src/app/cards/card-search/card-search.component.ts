import { Component } from '@angular/core';
import { CardService } from '../../services/card.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-card-search',
  standalone: true,
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss'],
  imports: [MatInputModule],
})
export class CardSearchComponent {
  constructor(private cardService: CardService) {}

  search(searchText: string): void {
    searchText = searchText.toLowerCase();
    this.cardService.filteredCards = this.cardService.cards.filter((card) => {
      return (
        card.title.toLowerCase().indexOf(searchText) > -1 ||
        (card.name && card.name.toLowerCase().indexOf(searchText) > -1)
      );
    });
  }
}
