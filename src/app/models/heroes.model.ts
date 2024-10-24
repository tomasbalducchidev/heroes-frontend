export interface Hero {
  id?: number;
  name: string;
  description: string;
}
export interface CreateHeroDto {
  name: string;
  description: string;
}
export interface UpdateHeroDto extends CreateHeroDto {
  id: number;
}

export interface HeroesDto {
  heroes: Hero[];
  currentPage: number,
  totalHeroes: number
}
