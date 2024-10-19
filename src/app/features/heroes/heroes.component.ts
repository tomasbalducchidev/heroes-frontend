import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { HeroesFilterComponent } from '../../shared/components/heroes-filter/heroes-filter.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Hero } from '../../models/heroes.model';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormComponent } from './components/form/form.component';
import { MessageComponent } from '../../shared/components/message/message.component';


@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule, MatPaginatorModule, ButtonComponent, HeroesFilterComponent, MatDialogModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesComponent {

  readonly dialog = inject(MatDialog);

  data: Hero[] = [
    { id: 1, name: 'Superman', description: 'Hombre de acero con gran fuerza.' },
    { id: 2, name: 'Batman', description: 'El Caballero Oscuro de Gotham.' },
    { id: 3, name: 'Deadpool', description: 'Mercenario con humor retorcido.' },
    { id: 4, name: 'Kickass', description: 'Héroe amateur con gran valentía.' },
    { id: 5, name: 'Spiderman', description: 'Lanzador de telarañas, gran poder.' },
    { id: 6, name: 'Wolverine', description: 'Mutante con garras y regeneración.' },
    { id: 7, name: 'Hulk', description: 'Gigante verde con furia imparable.' },
    { id: 8, name: 'Magneto', description: 'Maestro del magnetismo, líder mutante.' },
    { id: 9, name: 'Black Widow', description: 'Espía de élite con grandes habilidades.' },
    { id: 10, name: 'Wonder Woman', description: 'Guerrera amazona con poder divino.' },
    { id: 11, name: 'Xena', description: 'Princesa guerrera experta en combate.' },
    { id: 12, name: 'Storm', description: 'Mutante que controla el clima.' },
    { id: 13, name: 'Wasp', description: 'Heroína que se encoge y tiene alas.' },
    { id: 14, name: 'Catwoman', description: 'Ladrona ágil con encanto felino.' },
    { id: 15, name: 'Venom', description: 'Simbionte alienígena con gran poder.' }
  ]


  displayedColumns: string[] = ['id', 'name', 'actions'];

  openFormModal = (action: 'create' | 'update', hero?: Hero) => {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        action,
        hero
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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
      console.log(`Dialog result: ${result}`);
    });


  }





}
