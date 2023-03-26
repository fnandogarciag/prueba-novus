import { Server } from "socket.io";
import HistoryService from "@/services/histories.service";

const service = new HistoryService(); // Creamos una instancia del servicio de historial

export default function SocketHandler(req, res) {
  // Si ya se ha configurado el servidor de socket, terminamos la conexión
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("message", async (data) => {
      const currentDate = new Date();
      const dataToSave = { ...data, date: currentDate.toISOString() };
      const newHistory = await service.createHistory(dataToSave);
      io.emit("message", newHistory);
    });
  });

  console.log("Setting up socket");
  res.end();
}
