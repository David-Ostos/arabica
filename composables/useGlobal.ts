export function useGlobalComposable() {
  
  const isScreenSmall = ref(window.innerWidth < 720); 

  const checkScreenSize = () => {
    isScreenSmall.value = window.innerWidth < 720; 

  }; 
  onMounted(() => { 
    window.addEventListener('resize', checkScreenSize);   
  }); 
  onUnmounted(() => { 
    window.removeEventListener('resize', checkScreenSize); 
  });
  return {
    isScreenSmall
  }
}
