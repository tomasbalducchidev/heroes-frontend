import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent {

  private router = inject(Router);

  selectedId!: number;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedId = Number(params.get('id'));

    })

  }

  navigateToHeroList = () => {
    this.router.navigate(['']);

  }

}
