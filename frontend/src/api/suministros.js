import api from "./axios";

export const getSuministros = () => {
  return api.get("/suministros");
};

export const createSuministro = (suministroData) => {
  return api.post("/suministros", suministroData);
};

export const updateSuministro = (id, suministroData) => {
  return api.put(`/suministros/${id}`, suministroData);
};

export const deleteSuministro = (id) => {
  return api.delete(`/suministros/${id}`);
};
