import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { HeroesFilterComponent } from '../../shared/components/heroes-filter/heroes-filter.component';
import { MatTableModule } from '@angular/material/table';
import { Hero, UpdateHeroDto } from '../../models/heroes.model';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormComponent } from './components/form/form.component';
import { MessageComponent } from '../../shared/components/message/message.component';
import { Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { catchError, retry, Subscription, throwError } from 'rxjs';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { LoaderService } from '../../services/loader.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [MatSnackBarModule, MatTableModule, MatPaginatorModule, ButtonComponent, HeroesFilterComponent, MatDialogModule, CapitalizePipe],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private router = inject(Router);
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  private _heroesService = inject(HeroesService);
  private _loaderService = inject(LoaderService);
  private cdr = inject(ChangeDetectorRef);
  protected getHeroSubscription: Subscription = new Subscription();
  protected createHeroSubscription: Subscription = new Subscription();
  protected updateHeroSubscription: Subscription = new Subscription();
  protected deleteHeroSubscription: Subscription = new Subscription();
  protected filteredHeroesSubscription: Subscription | undefined = new Subscription();

  displayedColumns: string[] = ['id', 'name', 'actions'];
  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];
  totalHeroes: number = 0;
  currentPage: number = 1;

  ngOnInit(): void {
    this.getHeroes(this.currentPage);
  }

  ngOnDestroy(): void {
    if (this.getHeroSubscription) {
      this.getHeroSubscription.unsubscribe();
    }
    if (this.filteredHeroesSubscription) {
      this.filteredHeroesSubscription.unsubscribe();
    }
    if (this.createHeroSubscription) {
      this.createHeroSubscription.unsubscribe();
    }
    if (this.updateHeroSubscription) {
      this.updateHeroSubscription.unsubscribe();
    }
    if (this.deleteHeroSubscription) {
      this.deleteHeroSubscription.unsubscribe();
    }
  }

  openSnackBar(message: string, action: string, duration: number = 2000) {
    this._snackBar.open(message, action, { duration });
  }

  getHeroes = (page: number, name?: string, pagination?: boolean) => {
    try {
      this.getHeroSubscription = this._heroesService.getAllHeroes(page, name, pagination).pipe(
        retry(3)
      ).subscribe((heroes) => {
        this.filteredHeroes = heroes.heroes;
        this.totalHeroes = heroes.totalHeroes;
        this.currentPage = heroes.currentPage;
      })
    } catch (error) {
      console.error(error);
    }
  }

  createHero = (name: string, description: string) => {
    this.handleIsLoading(true);
    setTimeout(() => {
      this.createHeroSubscription = this._heroesService.createHero({ name, description }).pipe(
        retry(3)
      ).subscribe(() => {
        this.getHeroes(this.currentPage);
        this.filteredHeroes = [...this.filteredHeroes];
        this.cdr.detectChanges();
        this.handleIsLoading(false);
        this.openSnackBar('Héroe creado', 'Ok');
      })
    }, 1000); // Simulate a delay of 1 second

  }

  updateHero = (name: string, description: string, id: number) => {
    this.handleIsLoading(true);
    setTimeout(() => {
      this.updateHeroSubscription = this._heroesService.updateHero({ name, description, id }).pipe(
        retry(3)
      ).subscribe(() => {
        this.getHeroes(this.currentPage);
        this.filteredHeroes = [...this.filteredHeroes];
        this.cdr.detectChanges();
        this.handleIsLoading(false);
        this.openSnackBar('Héroe actualizado', 'Ok');
      })
    }, 1000);
  }

  deleteHero = (id: number) => {
    this.handleIsLoading(true);
    setTimeout(() => {
      this.deleteHeroSubscription = this._heroesService.deleteHero(id).pipe(
        retry(3)
      ).subscribe(() => {
        this.getHeroes(this.currentPage);
        this.filteredHeroes = [...this.filteredHeroes];
        this.cdr.detectChanges();
        this.handleIsLoading(false);
        this.openSnackBar('Héroe eliminado', 'Ok');
      })
    }, 1000);
  }

  openCreateModal = (action: 'create') => {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        action
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'cancel') return;
      try {
        this.createHero(result.heroName, result.heroDescription);
      } catch (error) {
        console.error(error);
      }
    });
  }

  openUpdateModal = (action: 'update', hero: UpdateHeroDto) => {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        action,
        hero
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'cancel') return;
      try {
        this.updateHero(result.heroName, result.heroDescription, hero.id);
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
      if (result === 'cancel') return;
      try {
        this.deleteHero(result);
      } catch (error) {
        console.error(error);
      }
    });
  }

  navigateToHeroDetail = (id: number) => {
    this.router.navigate(['/hero', id]);
  }

  filterHeroes = (name: string = '') => {
    this.getHeroes(this.currentPage, name);
    this.goToFirstPage();
  }

  handlePageEvent = (event: PageEvent) => {
    this.getHeroes(event.pageIndex + 1, '', true);
  }

  goToFirstPage() {
    this.paginator.firstPage();
  }

  handleIsLoading = (isLoading: boolean) => {
    // this._loaderService.handleisLoading(isLoading);
    this._loaderService.handleisLoadingSignal(isLoading);
  }
}
