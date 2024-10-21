import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroesServiceMock: jasmine.SpyObj<HeroesService>;
  let dialogMock: jasmine.SpyObj<MatDialog>;
  let routerMock: jasmine.SpyObj<Router>;
  let changeDetectorRefMock: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
    heroesServiceMock = jasmine.createSpyObj('HeroesService', ['getAllHeroes']);
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
});
