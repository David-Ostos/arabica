// composables/useFileUpload.ts

import axios from "axios";
import {ref} from "vue";
import {toast} from "vue3-toastify";
import type {ImgDestacadas} from "~/interfaces/PerfilProductor";

type Data = {
  data: Array<{
    _id?: string;
    link?: string;
    position?: number;
  }>;
  message: string;
  status: boolean;
};

type UploaderFiles = {_id: string; link: string; position: number};

export function useFileUpload() {
  const uploadedFiles: Ref<ImgDestacadas[]> = ref([]);

  const filesArray: Ref<File[]> = ref([]);

  const faseUpload = ref(
    "none" as
      | "none"
      | "Subiendo Imagenes..."
      | "Subiendo Lote..."
      | "Actualizando Lotes locales..."
      | "Subida Completada"
      | "error"
  );
  const porcentaje = ref(0);

  const handleFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    const allowedTypes = [
      "image/gif",
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];

    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      toast.error(
        "Solo se aceptan archivos de formato .gif, .png, .jpg, .jpeg, .webp"
      );
    }

    // Agregar los nuevos archivos válidos al array existente
    filesArray.value.push(...validFiles);

    for (const file of validFiles) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          uploadedFiles.value.push({
            _id: Date.now().toString(),
            link: result,
            position: uploadedFiles.value.length + 1,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (index: number) => {
    uploadedFiles.value.splice(index, 1);
    // Actualizar las posiciones después de eliminar
    uploadedFiles.value.forEach((file, idx) => {
      file.position = idx + 1;
    });
  };

async function uploadFiles(): Promise<Data> {
    let respuesta: Data = {
      data: [],
      message: "",
      status: false,
    };

    if (filesArray.value.length === 0) {
      respuesta.message = "No hay imágenes para subir.";
      toast.error(respuesta.message);
      return respuesta;
    }

    const formData = new FormData();
    filesArray.value.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    try {
      const response = await axios({
        url: `${import.meta.env.VITE_URL_API}/api/assets/upload`,
        method: "POST",
        headers: {
          "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
        },
        data: formData,
        onUploadProgress: (progressEvent) => {
          faseUpload.value = "Subiendo Imagenes...";
          const progressPercent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!
          );
          porcentaje.value = progressPercent;
        },
      });

      respuesta.data = response.data.assets.map((file: any, index: number) => ({
        _id: file._id,
        link: `https://cockpit.arabicagc.com/storage/uploads${file.path}`,
        position: index,
      }));

      respuesta.status = true;
      respuesta.message = "Imágenes subidas exitosamente.";

      // Limpiar los arrays después de una subida exitosa
      filesArray.value = [];
      uploadedFiles.value = [];
    } catch (e) {
      console.error(e);
      faseUpload.value = "error";
      respuesta.status = false;

      if (axios.isAxiosError(e) && e.code === "ERR_NETWORK") {
        respuesta.message = "Problemas en la conexión. Intente más tarde.";
        toast.info(respuesta.message);
      } else {
        respuesta.message = "Error al subir las imágenes.";
        toast.error(respuesta.message);
      }
    }
    return respuesta;
  }

  return {
    uploadedFiles,
    filesArray,
    faseUpload,
    porcentaje,
    handleFileUpload,
    removeFile,
    uploadFiles,
  };
}
