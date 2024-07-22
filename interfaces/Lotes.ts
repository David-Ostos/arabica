export interface Lotes{
  nombre: string;
  origen: 'chavin' | 'moche' | 'nasca';
  departamento: 'piura' | 'amazonas' | 'cajamarca' | 'san martin' | 'huanuco' | 'pasco' | 'junin' | 'ayacucho' | 'cusco' | 'puno';
  variedad: 'geisha' | 'typical' | 'bourbon' | 'maragogipe' | 'pacamara' | 'caturra' | 'catui' | 'tabi' | 'new world' | 'costa rica' | 'castilla' | 'catimor' | 'otros';
  proceso: 'sueves washing' |'anaerobic washing' |'honey' |'prolonged fermentation' |'natural' |'natural anaerobic' |'experimental';
  score: '80-90+' | '70-80+' | '60-70+';
  perfil: 'floral' | 'fruit tree' | 'vegetable' | 'citrus o sweet' | 'caramelized sugars' | 'dried fruit' | 'pecan / chocolate' | 'clean cup';
  lotsQuantity: 'lotes completos' | 'micro lote (5pp - 20qq)' | 'nano lote';
  certificaciones: 'organic' | 'fair trade' | 'rain fores' | 'imocert o jas';
  pais: 'peru';
  precio: number;
  descripcion: string;
  galeria: string[];
  productor: {
    _id: string,
    nombre: string
  };
  pruebaGratis: boolean
}