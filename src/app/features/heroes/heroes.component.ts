import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { HeroesFilterComponent } from '../../shared/components/heroes-filter/heroes-filter.component';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [ButtonComponent, HeroesFilterComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent {

}
