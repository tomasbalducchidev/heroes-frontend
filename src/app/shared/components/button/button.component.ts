import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  buttonText = input<string>('');
  iconOnly = input<boolean>(false);
  icon = input<string>('');
  buttonType = input<string>('');

  @Output() handleClickEvent = new EventEmitter();

  handleClick = () => {
    this.handleClickEvent.emit();
  }



}
