import { Server } from "socket.io";
import HistoryService from "@/services/histories.service";

const service = new HistoryService();

export default function SocketHandler(req, res) {
  // It means that socket server was already initialised
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
