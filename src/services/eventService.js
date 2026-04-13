import axios from "axios";

const API_URL = "http://localhost:3001/events";

// 🔹 Buscar todos eventos
export const getEvents = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// 🔹 Criar evento
export const createEvent = async (event) => {
  const res = await axios.post(API_URL, event);
  return res.data;
};

// 🔹 Atualizar evento
export const updateEvent = async (id, updatedEvent) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedEvent);
  return res.data;
};

// 🔹 Excluir evento
export const deleteEvent = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
