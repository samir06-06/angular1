import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { API_URL } from '../constants';

// api la bagli butun funksiyalar burada declare edilir, reduxtoolkit kimi

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}
  cards!: Card[];
  filteredCards!: Card[];

  getCards(): void {
    this.http.get<Card[]>(API_URL + 'cards').subscribe((res) => {
      console.log(res);
      this.cards = this.filteredCards = res;
    });
  }

  addCard(card: Card): Observable<any> {
    return this.http.post(API_URL + 'cards', card);
  }

  updateCard(card: Card, cardId: number): Observable<any> {
    return this.http.put(API_URL + 'cards/' + cardId, card);
  }

  deleteCard(cardId: number): Observable<any> {
    return this.http.delete(API_URL + 'cards/' + cardId);
  }
}
