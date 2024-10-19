import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  data = inject(MAT_DIALOG_DATA);

  confirm = () => {
    console.log('confirm', this.data.hero.id);
  }
  cancel = () => {
    console.log('cancel');
  }

}
