import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes-filter',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './heroes-filter.component.html',
  styleUrl: './heroes-filter.component.scss'
})
export class HeroesFilterComponent implements OnInit, OnDestroy {

  private filterSubscription: Subscription = new Subscription();

  @Output() heroNameChange = new EventEmitter<string>();

  heroName = new FormControl<string>('');

  ngOnInit(): void {
    this.filterSubscription = this.heroName.valueChanges.pipe(
      debounceTime(500),
      filter(value => value !== null)
    ).subscribe((value) => {
      this.heroNameChange.emit(value);
    })
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

}
