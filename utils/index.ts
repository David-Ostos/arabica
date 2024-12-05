export const capitalizeFirstLetter = (string:string) => {
  return string.replace(/\b\w/g, char => char.toUpperCase());
}
export function convertirAminusculas(objeto: any) {
// Función recursiva para recorrer el objeto y convertir a minúsculas
function recorrerObjeto(obj: any) {
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      // Si el valor es un objeto, llamamos recursivamente a la función
      recorrerObjeto(obj[key]);
    } else if (typeof obj[key] === 'string') {
      // Si el valor es una cadena, la convertimos a minúsculas
      obj[key] = obj[key].toLowerCase();
    }
  }
}

// Creamos una copia del objeto original para evitar modificar el original
const nuevoObjeto = JSON.parse(JSON.stringify(objeto));
recorrerObjeto(nuevoObjeto);
return nuevoObjeto;
}