export interface FiltersSearch {
  muestra: boolean | undefined ;
  paises:string[] | [] | undefined 
  origenes: string[] | [] | undefined ;
  productores: string[] | [] | undefined ;
  variedades: string[] | [] | undefined ;
  procesos: string[] | [] | undefined ;
  perfil: string[] | [] | undefined ;
  certificaciones: string[] | [] | undefined ;
  clasificacion: string[] | [] | undefined ;
  precio: [number, number] | [] | undefined ;
  puntaje: [number, number] | [] | undefined  ;
}
