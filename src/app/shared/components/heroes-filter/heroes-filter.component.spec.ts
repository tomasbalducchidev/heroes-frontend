import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesFilterComponent } from './heroes-filter.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroesFilterComponent', () => {
  let component: HeroesFilterComponent;
  let fixture: ComponentFixture<HeroesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesFilterComponent, NoopAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
