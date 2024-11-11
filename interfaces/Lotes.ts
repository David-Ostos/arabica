export interface Lotes{
  _id?: string
  nombre?: string;
  origen?: Origen;
  departamento?: Departamento;
  variedad?: Variedad;
  proceso?: Porceso;
  puntaje?: Puntaje ;
  perfil?: Perfil;
  cantidadLote?: CantidadLote;
  certificaciones?: Certificaciones;
  pais?: Paises;
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

export type Certificaciones = 'organic' | 'fair trade' | 'rain fores' | 'imocert o jas' /* {
  tipo: 'organic' | 'fair trade' | 'rain fores' | 'imocert o jas',
  nombre: string,
  url?: string
} */

export type Origen = 'chavin' | 'moche' | 'nasca';

export type Departamento = 'piura' | 'amazonas' | 'cajamarca' | 'san martin' | 'huanuco' | 'pasco' | 'junin' | 'ayacucho' | 'cusco' | 'puno'

export type Variedad = 'geisha' | 'typical' | 'bourbon' | 'maragogipe' | 'pacamara' | 'caturra' | 'catui' | 'tabi' | 'new world' | 'costa rica' | 'castilla' | 'catimor' | 'otros'

export type Porceso = 'sueves washing' |'anaerobic washing' |'honey' |'prolonged fermentation' |'natural' |'natural anaerobic' |'experimental'

export type Puntaje = '80-90+' | '70-80+' | '60-70+'; 

export type Perfil = 'floral' | 'fruit tree' | 'vegetable' | 'citrus o sweet' | 'caramelized sugars' | 'dried fruit' | 'pecan / chocolate' | 'clean cup'

export type CantidadLote = 'lotes completos' | 'micro lote (5pp - 20qq)' | 'nano lote'

export type Paises = 'perú'

export type Galeria = {
  _id: string,
  link: string,
  position: number,
}