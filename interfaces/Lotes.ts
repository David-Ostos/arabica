export interface Lotes{
  _id?: string
  nombre?: string;
  pais?: Paises;
  origen?: Origen;
  productores?: Productores;
  variedad?: Variedad;
  proceso?: Porceso;
  perfil?: Perfil;
  certificaciones?: Certificaciones;
  cantidadLote?: CantidadLote;
  puntaje?: number ;
  precio?: number;
  descripcion?: string;
  galeria?: Galeria[];
  productor?: {
    _id?: string,
    nombre?: string,
    picture?: string 
  };
  muestra?: Muestra,
  ocultar?: boolean
}

export type Muestra = {
  muestra?: boolean,
  muestraGratis?: boolean,
  precio?: number,
  cantidad?: number
} 

export type Productores = 'independiente' | 'asociacion' | 'cooperativa'

export type Certificaciones = 'organic' | 'fair trade' | 'rain fores' | 'imocert' | 'jas' 

export type Origen = 'piura' | 'amazonas' | 'cajamarca' | 'san martin' | 'huanuco' | 'pasco' | 'junin' | 'ayacucho' | 'cusco' | 'puno'

export type Variedad = 'geisha' | 'tipica' | 'bourbon' | 'maragogipe' | 'pacamara' | 'caturra' | 'catuai' | 'tabi' | 'mundo novo' | 'costa rica' | 'castilla' | 'catimor' | 'otros'

export type Porceso = 'sueves lavado' |'lavado anaeróbico' |'honey' |'fermentación prolongada' |'natural' |'natural anaeróbico' |'experimental'

export type Puntaje = [number, number]; 

export type Perfil = 'floral' | 'frutal' | 'vegetal' | 'cítrico' | 'dulce' | 'azucares caramelizados' | 'frutos secos' | 'nuez / chocolate' | 'taza limpia'

export type CantidadLote = 'lote' | 'micro lote' | 'nano lote'

export type Paises = 'perú'

export type Galeria = {
  _id: string,
  link: string,
  position: number,
}
