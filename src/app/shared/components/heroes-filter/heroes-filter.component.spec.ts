import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

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

  it('should emit heroNameChange when value changes', (done) => {
    component.heroNameChange.subscribe((value: string) => {
      expect(value).toBe('Superman');
      done();
    });
    component.heroName.setValue('Superman');
  });

  it('should emit the value after debounceTime', fakeAsync(() => {
    let emittedValue = '';
    component.heroNameChange.subscribe(value => {
      emittedValue = value;
    });

    component.heroName.setValue('Superman');
    tick(500);
    expect(emittedValue).toBe('Superman');
  }));

  it('should not emit value if it is null', fakeAsync(() => {
    let emittedValue: string | null = null;
    component.heroNameChange.subscribe(value => {
      emittedValue = value;
    });

    component.heroName.setValue(null);
    tick(500);
    expect(emittedValue).toBeNull();
  }));

  it('should have an empty string as initial value for heroName', () => {
    expect(component.heroName.value).toBe('');
  });

  it('should unsubscribe from filterSubscription on destroy', () => {
    const unsubscribeSpy = jasmine.createSpy('unsubscribe');
    (component as any).filterSubscription = { unsubscribe: unsubscribeSpy } as any;

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });

});
