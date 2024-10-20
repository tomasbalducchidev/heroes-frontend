import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-heroes-filter',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './heroes-filter.component.html',
  styleUrl: './heroes-filter.component.scss'
})
export class HeroesFilterComponent implements OnInit {

  @Output() heroNameChange = new EventEmitter<string>();

  heroName = new FormControl<string>('');

  ngOnInit(): void {
    this.heroName.valueChanges.pipe(
      debounceTime(500),
      filter(value => value !== null)
    ).subscribe((value) => {
      this.heroNameChange.emit(value);
    })
  }

}
