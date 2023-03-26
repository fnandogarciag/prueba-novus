import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

let socket;
function useTank() {
  const [capacity, setCapacity] = useState(0); // Estado que representa la capacidad actual del tanque
  const [level, setlevel] = useState(0); // Estado que representa el nivel actual del tanque
  const [history, setHistory] = useState([]); // Estado que representa el historial de los cambios en la capacidad y el nivel del tanque

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // Hace una llamada a la API para obtener el historial del tanque
    try {
      const { data } = await axios.get("/api/v1/history");
      if (data.length !== 0) {
        data.reverse();
        setCapacity(data[0].capacity);
        setlevel(data[0].level);
        setHistory(data);
      }
    } catch (error) {
      alert({
        type: "error",
        msg: "No se pudo obtener el historial. " + error,
      });
    }
    try {
      await axios.get("/api/v1/socket"); // Hace una llamada a la API para inicializar el socket

      socket = io(); // Inicializa el socket

      // Se actualiza en tiempo real el historial de todos los clientes
      socket.on("message", (msg) => {
        setCapacity(msg.capacity);
        setlevel(msg.level);
        setHistory((currentMsg) => [{ ...msg }, ...currentMsg]);
      });
    } catch (error) {
      alert({
        type: "error",
        msg:
          "No se pudo conectar para obtener informacion en tiempo real. " +
          error,
      });
    }
  };
  // Se envia para cambiar la información actual de todos los clientes
  const sendMessage = async (newCapacity, newLevel) => {
    const newHistory = [...history];
    if (
      newHistory[0]?.capacity === newCapacity &&
      newHistory[0]?.level === newLevel
    ) {
      return;
    }
    socket.emit("message", { capacity: newCapacity, level: newLevel });
  };

  // Función auxiliar que da formato al número
  const formatNumber = (value) => parseFloat(value.toFixed(4));

  // Se actualiza la capacidad del tanque
  const setMaxLevel = (value) => {
    if (value < 0) {
      alert({
        type: "warning",
        msg: "No se puede llegar a una capacidad negativa",
      });
      return;
    }
    let newCapacity = formatNumber(value);
    let newLevel = level;
    if (newCapacity < level) {
      const extra = formatNumber(level - newCapacity);
      newLevel = newCapacity;
      alert({
        type: "warning",
        msg: `La capacidad supero el nivel actual de ${level} CM3 por ${extra} CM3`,
      });
    }
    sendMessage(newCapacity, newLevel);
  };

  //Se actualiza el nivel del tanque
  const addLevel = (value, type) => {
    let newLevel = formatNumber(level + value);
    if (newLevel < 0) {
      newLevel = 0;
    }
    if (newLevel > capacity) {
      const extra = formatNumber(newLevel - capacity);
      newLevel = capacity;
      alert({
        type: "warning",
        msg: `La capacidad llego al maximo no se agregaron ${extra} ${type}`,
      });
    }
    sendMessage(capacity, newLevel);
  };

  return {
    capacity,
    level,
    setMaxLevel,
    addLevel,
    history,
  };
}

export { useTank };
