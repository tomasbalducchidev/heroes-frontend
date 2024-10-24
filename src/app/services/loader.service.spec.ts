import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update isLoading BehaviorSubject when handleisLoading is called', (done: DoneFn) => {
    service.handleisLoading(true);

    service.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBeTrue();
      done();
    });
  });

  it('should update isLoadingSignal when handleisLoadingSignal is called', () => {
    service.handleisLoadingSignal(true);

    expect(service.isLoadingSignal()).toBeTrue();
  });
});
