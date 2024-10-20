import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { HeroesFilterComponent } from '../../shared/components/heroes-filter/heroes-filter.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Hero } from '../../models/heroes.model';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormComponent } from './components/form/form.component';
import { MessageComponent } from '../../shared/components/message/message.component';
import { Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { retry, Subscription } from 'rxjs';


@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule, MatPaginatorModule, ButtonComponent, HeroesFilterComponent, MatDialogModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesComponent implements OnInit, OnDestroy {


  private router = inject(Router);
  readonly dialog = inject(MatDialog);
  private _heroesService = inject(HeroesService);
  private cdr = inject(ChangeDetectorRef);
  private subscriptions: Subscription = new Subscription();
  private filteredHeroesSubscription: Subscription | undefined = new Subscription();


  displayedColumns: string[] = ['id', 'name', 'actions'];

  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];

  ngOnInit(): void {
    this.getHeroes();

  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
    if (this.filteredHeroesSubscription) {
      this.filteredHeroesSubscription.unsubscribe();
    }
  }

  getHeroes = () => {
    try {
      this.subscriptions = this._heroesService.getAllHeroes().pipe(
        retry(3)
      ).subscribe((heroes) => {
        this.filteredHeroes = heroes;
      })
    } catch (error) {
      console.error(error);
    }
  }

  createHero = (name: string, description: string) => {
    this._heroesService.createHero({ name, description }).pipe(
      retry(3)
    ).subscribe(() => {
      this.getHeroes();
      this.filteredHeroes = [...this.filteredHeroes];
      this.cdr.detectChanges();
    })
  }

  openFormModal = (action: 'create' | 'update', hero?: Hero) => {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        action,
        hero
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      try {

        console.log(`Dialog result: ${result.heroName}`);


        if (action === 'create') {
          this.createHero(result.heroName, result.heroDescription);
        }

      } catch (error) {
        console.error(error);

      }
    });
  }

  openDeleteModal = (message: string, hero?: Hero) => {
    const dialogRef = this.dialog.open(MessageComponent, {
      data: {
        message,
        hero
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });


  }

  navigateToHeroDetail = (id: number) => {
    console.log('navigateToHeroDetail', id);
    this.router.navigate(['/hero', id]);
  }

  filterHeroes = (name: string) => {
    console.log('filterHeroes', name);
    try {
      this.filteredHeroesSubscription = this._heroesService.getFilteredHeroes(name).pipe(
        retry(3)
      ).subscribe((heroes) => {
        this.filteredHeroes = heroes;
      })
    } catch (error) {
      console.error(error);
    }
  }





}
