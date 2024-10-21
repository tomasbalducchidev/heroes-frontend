import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroesComponent } from './features/heroes/heroes.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './services/loader.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroesComponent, MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private _loaderService = inject(LoaderService);

  // isLoading$ = this._loaderService.isLoading$;

  isLoadingSignal = this._loaderService.isLoadingSignal;

}
