export default defineNuxtRouteMiddleware(async(to, from) => {

  const global = useGlobalStore()

  if(!global.perfilComercial){
    global.getPerfil()
    console.log(global.perfilComercial);
  }else{
    console.log('si tá');
  }

  return
  

})
