export function useGlobalComposable() {
  
  const isScreenSmall = ref(window.innerWidth < 720); 
  const isMobile = ref()

  const checkDevice = () => { 
    const userAgent = navigator.userAgent || navigator.vendor; 
    isMobile.value = /android|iPad|iPhone|iPod/.test(userAgent.toLowerCase()); };

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
    isScreenSmall,
    isMobile
  }
}
