import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, Subscription, throwError } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FormComponent } from './components/form/form.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroesServiceMock: jasmine.SpyObj<HeroesService>;
  let dialogMock: jasmine.SpyObj<MatDialog>;
  let routerMock: jasmine.SpyObj<Router>;
  let changeDetectorRefMock: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
    heroesServiceMock = jasmine.createSpyObj('HeroesService', ['createHero', 'updateHero', 'deleteHero', 'getAllHeroes']);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    changeDetectorRefMock = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    await TestBed.configureTestingModule({
      imports: [HeroesComponent, NoopAnimationsModule],
      providers: [
        { provide: HeroesService, useValue: heroesServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: Router, useValue: routerMock },
        { provide: ChangeDetectorRef, useValue: changeDetectorRefMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve heroes list on init', () => {
    const mockHeroes = { heroes: [{ id: 1, name: 'Superman', description: 'Hombre de acero con gran fuerza' }], totalHeroes: 1, currentPage: 1 };
    heroesServiceMock.getAllHeroes.and.returnValue(of(mockHeroes));

    component.ngOnInit();

    expect(heroesServiceMock.getAllHeroes).toHaveBeenCalledWith(1, undefined, undefined);
    expect(component.filteredHeroes).toEqual(mockHeroes.heroes);
    expect(component.totalHeroes).toEqual(mockHeroes.totalHeroes);
    expect(component.currentPage).toEqual(mockHeroes.currentPage);
  });

  it('should unsubscribe from all subscriptions on ngOnDestroy', () => {
    (component as any).getHeroSubscription = new Subscription();
    (component as any).filteredHeroesSubscription = new Subscription();
    (component as any).createHeroSubscription = new Subscription();
    (component as any).updateHeroSubscription = new Subscription();
    (component as any).deleteHeroSubscription = new Subscription();

    const spyGetHero = spyOn((component as any).getHeroSubscription, 'unsubscribe');
    const spyFilteredHeroes = spyOn((component as any).filteredHeroesSubscription, 'unsubscribe');
    const spyCreateHero = spyOn((component as any).createHeroSubscription, 'unsubscribe');
    const spyUpdateHero = spyOn((component as any).updateHeroSubscription, 'unsubscribe');
    const spyDeleteHero = spyOn((component as any).deleteHeroSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(spyGetHero).toHaveBeenCalled();
    expect(spyFilteredHeroes).toHaveBeenCalled();
    expect(spyCreateHero).toHaveBeenCalled();
    expect(spyUpdateHero).toHaveBeenCalled();
    expect(spyDeleteHero).toHaveBeenCalled();
  });

  afterEach(() => {
    if ((component as any).getHeroSubscription) {
      (component as any).getHeroSubscription.unsubscribe();
    }
  });

  it('should fetch heroes successfully', () => {
    const mockHeroesResponse = {
      heroes: [{ id: 1, name: 'Hero 1', description: 'Description 1' }],
      totalHeroes: 1,
      currentPage: 1,
    };

    heroesServiceMock.getAllHeroes.and.returnValue(of(mockHeroesResponse));

    component.getHeroes(1);

    expect(heroesServiceMock.getAllHeroes).toHaveBeenCalledWith(1, undefined, undefined);
    expect(component.filteredHeroes).toEqual(mockHeroesResponse.heroes);
    expect(component.totalHeroes).toEqual(mockHeroesResponse.totalHeroes);
    expect(component.currentPage).toEqual(mockHeroesResponse.currentPage);
  });

  it('should fetch heroes with name filter', () => {
    const mockHeroesResponse = {
      heroes: [{ id: 1, name: 'Hero 1', description: 'Description 1' }],
      totalHeroes: 1,
      currentPage: 1,
    };

    heroesServiceMock.getAllHeroes.and.returnValue(of(mockHeroesResponse));

    component.getHeroes(1, 'Hero 1');

    expect(heroesServiceMock.getAllHeroes).toHaveBeenCalledWith(1, 'Hero 1', undefined);
    expect(component.filteredHeroes).toEqual(mockHeroesResponse.heroes);
    expect(component.totalHeroes).toEqual(mockHeroesResponse.totalHeroes);
    expect(component.currentPage).toEqual(mockHeroesResponse.currentPage);
  });

  afterEach(() => {
    if ((component as any).createHeroSubscription) {
      (component as any).createHeroSubscription.unsubscribe();
    }
    if ((component as any).updateHeroSubscription) {
      (component as any).updateHeroSubscription.unsubscribe();
    }
    if ((component as any).deleteHeroSubscription) {
      (component as any).deleteHeroSubscription.unsubscribe();
    }
  });

  it('should create a hero and update the list', fakeAsync(() => {
    const mockHeroResponse = { id: 1, name: 'New Hero', description: 'A hero' };
    heroesServiceMock.createHero.and.returnValue(of(mockHeroResponse));

    spyOn(component, 'getHeroes');
    spyOn(component, 'handleIsLoading');
    spyOn(component, 'openSnackBar');
    spyOn(component['cdr'], 'detectChanges');

    component.createHero('New Hero', 'A hero');

    flush();

    expect(component.handleIsLoading).toHaveBeenCalledWith(true);
    expect(heroesServiceMock.createHero).toHaveBeenCalledWith({ name: 'New Hero', description: 'A hero' });
    expect(component.getHeroes).toHaveBeenCalledWith(component.currentPage);
    expect(component.handleIsLoading).toHaveBeenCalledWith(false);
    expect(component.openSnackBar).toHaveBeenCalledWith('Héroe creado', 'Ok');
    expect(component['cdr'].detectChanges).toHaveBeenCalled();
  }));



  it('should update a hero and refresh the list', fakeAsync(() => {
    const mockHeroResponse = { id: 1, name: 'Updated Hero', description: 'Updated description' };
    heroesServiceMock.updateHero.and.returnValue(of(mockHeroResponse));
    spyOn(component, 'getHeroes');
    spyOn(component, 'handleIsLoading');
    spyOn(component, 'openSnackBar');
    spyOn(component['cdr'], 'detectChanges');

    component.updateHero('Updated Hero', 'Updated description', 1);

    flush();

    expect(component.handleIsLoading).toHaveBeenCalledWith(true);
    expect(heroesServiceMock.updateHero).toHaveBeenCalledWith({ name: 'Updated Hero', description: 'Updated description', id: 1 });
    expect(component.getHeroes).toHaveBeenCalledWith(component.currentPage);
    expect(component.handleIsLoading).toHaveBeenCalledWith(false);
    expect(component.openSnackBar).toHaveBeenCalledWith('Héroe actualizado', 'Ok');
    expect(component['cdr'].detectChanges).toHaveBeenCalled();

  }));

  it('should delete a hero and refresh the list', fakeAsync(() => {
    const mockHeroResponse = { id: 1, name: 'Deleted Hero', description: 'Deleted Hero description' };
    heroesServiceMock.deleteHero.and.returnValue(of(mockHeroResponse));
    spyOn(component, 'getHeroes');
    spyOn(component, 'handleIsLoading');
    spyOn(component, 'openSnackBar');
    spyOn(component['cdr'], 'detectChanges');

    component.deleteHero(1);

    tick(1000);

    expect(component.handleIsLoading).toHaveBeenCalledWith(true);
    expect(heroesServiceMock.deleteHero).toHaveBeenCalledWith(1);
    expect(component.getHeroes).toHaveBeenCalledWith(component.currentPage);
    expect(component.handleIsLoading).toHaveBeenCalledWith(false);
    expect(component.openSnackBar).toHaveBeenCalledWith('Héroe eliminado', 'Ok');
    expect(component['cdr'].detectChanges).toHaveBeenCalled();

  }));





});
