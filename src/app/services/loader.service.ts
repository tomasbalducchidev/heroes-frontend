import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  isLoadingSignal = signal<boolean>(false);

  constructor() { }

  handleisLoading(state: boolean): void {
    this.isLoading.next(state);
  }

  handleisLoadingSignal(state: boolean): void {
    this.isLoadingSignal.set(state);
  }
}
