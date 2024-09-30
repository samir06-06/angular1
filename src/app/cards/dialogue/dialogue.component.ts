import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardService } from '../../services/card.service';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/card';
import { Inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-dialogue',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialogue.component.html',
  styleUrl: './dialogue.component.scss',
})
export class DialogueComponent implements OnInit {
  cardForm!: FormGroup; //FromGroup fromdaki deyerler obyekte yigila bilsin deyedi, container
  showBar: boolean = false;

  constructor(
    @Inject(SnackbarService) public snackbarService: SnackbarService,
    private fb: FormBuilder, //is a helper service to create FormGroup and FormControl instances.
    private cardService: CardService,
    private dialogRef: MatDialogRef<DialogueComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Card // Injecting card data
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.cardForm = this.fb.group({
      name: [this.data?.name || '', Validators.maxLength(50)],
      title: [
        this.data?.title || '',
        [Validators.required, Validators.maxLength(255)],
      ],
      email: [
        this.data?.email || '',
        [Validators.email, Validators.maxLength(50)],
      ],
      phone: [
        this.data?.phone || '',
        [Validators.required, Validators.maxLength(20)],
      ],
      address: [this.data?.address || '', Validators.maxLength(255)],
    });
  }

  addCard(): void {
    this.showBar = true;
    this.cardService.addCard(this.cardForm.value).subscribe(
      (res: any) => {
        this.getSuccess('Kartvizit başarıyla eklendi.');
      },
      (err: any) => {
        this.getError(err.message || 'Kartvizit eklenirken bir sorun oluştu');
      }
    );
  }

  updateCard(): void {
    this.showBar = true;
    this.cardService.updateCard(this.cardForm.value, this.data.id).subscribe(
      (res: any) => {
        this.getSuccess('Kartvizit başarıyla güncellendi.');
      },
      (err: any) => {
        this.getError(
          err.message || 'Kartvizit güncellenirken bir sorun oluştu'
        );
      }
    );
  }

  deleteCard(): void {
    this.showBar = true;
    this.cardService.deleteCard(this.data.id).subscribe(
      (res: any) => {
        this.getSuccess('Kartvizit başarıyla silindi.');
      },
      (err: any) => {
        this.getError(err.message || 'Kartvizit silinirken bir sorun oluştu');
      }
    );
  }

  getSuccess(message: string): void {
    this.snackbarService.createSnackbar('success', message);
    this.cardService.getCards();
    this.showBar = false;
    this.dialogRef.close();
  }

  getError(message: string): void {
    this.snackbarService.createSnackbar('error', message);
    this.showBar = false;
  }
}
