import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { HeroesDto } from '../models/heroes.model';

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve paginated heroes when a page number is provided', (done) => {
    service.getAllHeroes(2).subscribe((response: HeroesDto) => {
      expect(response.heroes.length).toBe(5);
      expect(response.currentPage).toBe(2);
      expect(response.totalHeroes).toBe(service.heroes.length);
      done();
    });
  });

  it('should filter heroes by name', (done) => {
    service.getAllHeroes(1, 'man').subscribe((response: HeroesDto) => {
      expect(response.heroes.length).toBe(5);
      expect(response.heroes).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({ name: 'Superman' }),
        jasmine.objectContaining({ name: 'Batman' }),
        jasmine.objectContaining({ name: 'Spiderman' }),
        jasmine.objectContaining({ name: 'Catwoman' }),
        jasmine.objectContaining({ name: 'Wonder Woman' }),
      ]));
      done();
    });
  });

  it('should paginate filtered heroes correctly for page 1', (done) => {
    service.getAllHeroes(1, 'man').subscribe((response: HeroesDto) => {
      expect(response.heroes.length).toBe(5);
      expect(response.currentPage).toBe(1);
      done();
    });
  });


  it('should return empty list if the filter does not match any hero', (done) => {
    service.getAllHeroes(1, 'unknown').subscribe((response: HeroesDto) => {
      expect(response.heroes.length).toBe(0);
      expect(response.currentPage).toBe(1);
      expect(response.totalHeroes).toBe(service.heroes.length);
      done();
    });
  });
});
