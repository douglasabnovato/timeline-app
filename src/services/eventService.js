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

// 🚀 A MÁGICA PARA RESOLVER O ERRO:
// Criamos um objeto que agrupa tudo e o exportamos como 'eventService'
export const eventService = {
  create: createEvent,
  update: updateEvent,
  delete: deleteEvent,
  // Para o Admin: Busca todos e o Dashboard filtra por ownerId se necessário
  getByOwner: async (ownerId) => {
    const all = await getEvents();
    return all.filter((e) => e.ownerId === ownerId);
  },
  // Para o Viewer: Busca apenas os que são públicos
  getPublic: async () => {
    const all = await getEvents();
    // Filtra apenas onde public é true (booleano) ou a string "true"
    return all.filter(
      (event) => event.public === true || event.public === "true",
    );
  },
};
