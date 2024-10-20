import { Injectable } from '@angular/core';
import { CreateHeroDto, Hero, UpdateHeroDto } from '../models/heroes.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroes: Hero[] = [
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

  constructor() { }

  getAllHeroes = () => {
    return of(this.heroes);
  }

  getHeroById = (id: number) => {
    const hero = this.heroes.find(hero => hero.id === id);
    if (hero) {
      return of(hero);
    } else return null;

  }

  getFilteredHeroes = (name: string) => {
    if (name) {
      return of(this.heroes.filter(hero => hero.name.toLowerCase().includes(name.toLowerCase())));
    } else return of(this.heroes);
  }

  createHero = (hero: CreateHeroDto) => {
    const newHero = { ...hero, id: this.heroes.length + 1 };
    this.heroes.push(newHero);
    return of(newHero);
  }

  updateHero = (hero: UpdateHeroDto) => {
    const index = this.heroes.findIndex(h => h.id === hero.id);
    this.heroes[index] = hero;
    return of(hero);

  }

  deleteHero = (id: number) => {
    const index = this.heroes.findIndex(hero => hero.id === id);
    const deletedHero = this.heroes[index];
    this.heroes.splice(index, 1);
    return of(deletedHero);
  }

}
