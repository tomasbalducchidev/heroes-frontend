import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../models/heroes.model';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  const mockHero: Hero = { id: 1, name: 'Superman', description: 'Strong' };

  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', ['getHeroById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = { paramMap: of({ get: () => '1' }) };
    await TestBed.configureTestingModule({
      imports: [HeroDetailComponent],
      providers: [
        { provide: HeroesService, useValue: mockHeroesService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve hero by id on init', () => {
    mockHeroesService.getHeroById.and.returnValue(of(mockHero));

    component.ngOnInit();

    expect(component.selectedId).toBe(1);
    expect(mockHeroesService.getHeroById).toHaveBeenCalledWith(1);
    expect(component.selectedHero).toEqual(mockHero);
  });

  it('should navigate to hero list', () => {
    component.navigateToHeroList();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });


});
