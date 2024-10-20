import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  constructor(public dialogRef: MatDialogRef<MessageComponent>) {

  }

  data = inject(MAT_DIALOG_DATA);

  confirm = () => {
    this.dialogRef.close(this.data.hero.id);
  }

  cancel = () => {
    this.dialogRef.close();

  }

}
