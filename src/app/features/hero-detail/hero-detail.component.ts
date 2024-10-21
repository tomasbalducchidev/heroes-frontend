import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Subscription, retry } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../models/heroes.model';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [ButtonComponent, CapitalizePipe],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent {

  private router = inject(Router);
  private _heroesService = inject(HeroesService);

  selectedId!: number;
  selectedHero: Hero = {} as Hero;

  private heroSubscription: Subscription | undefined = new Subscription();
  private routeSubscription: Subscription | undefined = new Subscription();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedId = Number(params.get('id'));
      this.getHero(this.selectedId);
    })
  }

  ngOnDestroy(): void {
    if (this.heroSubscription) {
      this.heroSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  navigateToHeroList = () => {
    this.router.navigate(['']);
  }

  getHero = (id: number) => {
    try {
      this.heroSubscription = this._heroesService.getHeroById(id)?.pipe(
        retry(3)
      ).subscribe((hero) => {
        this.selectedHero = hero;
      })
    } catch (error) {
      console.error(error);
    }
  }

}
