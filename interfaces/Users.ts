export interface User {
  _id?: string | undefined;
  nombre: string | undefined;
  apellido: string | undefined;
  password?: string | undefined;
  email: string | undefined;
  picture?: string | undefined;
  tipoUser?: 'productor'| 'comprador'
  tipoLogin?: ['google'] | ['backend'] | ['backend','google']
  rePassword?: string | undefined
}