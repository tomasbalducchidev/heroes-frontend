export interface Hero {
  id?: number;
  name: string;
  description: string;
}
export interface CreateHeroDto {
  name: string;
  description: string;
}
export interface UpdateHeroDto {
  id: number;
  name: string;
  description: string;
}
