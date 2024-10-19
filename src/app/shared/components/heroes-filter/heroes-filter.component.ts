import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-heroes-filter',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './heroes-filter.component.html',
  styleUrl: './heroes-filter.component.scss'
})
export class HeroesFilterComponent {

  heroName = new FormControl('');

}
