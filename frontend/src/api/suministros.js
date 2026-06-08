import api from "./axios";

// 1. Obtener la lista de todos los suministros (GET)
export const getSuministros = () => {
  return api.get("/suministros");
};

// 2. Registrar un nuevo suministro (POST)
export const createSuministro = (suministroData) => {
  return api.post("/suministros", suministroData);
};

// 3. Actualizar un suministro existente (PUT)
export const updateSuministro = (id, suministroData) => {
  return api.put(`/suministros/${id}`, suministroData);
};

// 4. Eliminar un suministro (DELETE)
export const deleteSuministro = (id) => {
  return api.delete(`/suministros/${id}`);
};
