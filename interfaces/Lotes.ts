export interface Lotes{
  _id?: string
  nombre?: string;
  nombreProductor?: string;
  pais?: Paises;
  origen?: Origen;
  nombreFinca?: string;
  altitud?: string;
  periodoCosecha?: [string, string] | [];
  productores?: Productores;
  variedad?: Variedad[];
  proceso?: Porceso;
  perfil?: Perfil;
  certificaciones?: Certificaciones;
  cantidadLote?: CantidadLote;
  puntaje?: number ;
  precio?: number;
  descripcion?: string;
  galeria?: Galeria[];
  productor?: Productor;
  muestra?: Muestra,
  ocultar?: boolean
}

export type Productor = {
  _id?: string,
  nombre?: string,
  picture?: string 
}

export type Muestra = {
  muestra?: boolean,
  muestraGratis?: boolean,
  precio?: number,
  cantidad?: number
} 

export type Productores = 'independiente' | 'asociacion' | 'cooperativa'

export type Certificaciones = 'organic' | 'fair trade' | 'fairtrade organic' | 'rain fores' | 'imocert' | 'jas' 


export type Origen = 'piura' | 'amazonas' | 'cajamarca' | 'san martin' | 'huanuco' | 'pasco' | 'junin' | 'ayacucho' | 'cusco' | 'puno'


export type Variedad = 'geisha' | 'typica' | 'bourbon' | 'bourbon mayaguez' | 'ls 14' | 'ls 28' | 'ls 34' | 'rume sudan' | 'maragogype ' | 'pacamara ' | 'caturra' | 'catuai ' | 'tabi' | 'mundo novo' | 'costa rica 95' | 'castilla' | 'catimor' | 'blend' | 'otro'

export type Porceso = "lavado" | "lavado anaeróbico" | "lavado oxidación" | "lavado fermentación láctica" | "yellow honey" | "red honey" | "back honey" | "natural" | "natural anaeróbico" | "experimental" 


export type Puntaje = [number, number]; 


export type Perfil = 'floral' | 'frutal' | 'vegetal' | 'cítrico' | 'vinoso' | 'dulce' | 'azucares caramelizados' | 'frutos secos' | 'chocolate' | 'nuez' | 'taza limpia'

export type CantidadLote = 'lote' | 'micro lote' | 'nano lote'

export type Paises = 'perú'

export type Galeria = {
  _id: string,
  link: string,
  position: number,
}
