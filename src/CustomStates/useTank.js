import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

let socket;
let id = 1;
function useTank() {
  const [capacity, setCapacity] = useState(0);
  const [level, setlevel] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    const { data } = await axios.get("/api/v1/history");
    if (data.length !== 0) {
      data.reverse();
      setCapacity(data[0].capacity);
      setlevel(data[0].level);
      setHistory(data);
    }
    await axios.get("/api/v1/socket");

    socket = io();

    socket.on("message", (msg) => {
      console.log("msg", msg);
      setCapacity(msg.capacity);
      setlevel(msg.level);
      setHistory((currentMsg) => [{ ...msg }, ...currentMsg]);
    });
  };

  const sendMessage = async (newCapacity, newLevel) => {
    const newHistory = [...history];
    if (
      newHistory[newHistory.length - 1]?.capacity === newCapacity &&
      newHistory[newHistory.length - 1]?.level === newLevel
    ) {
      return;
    }
    socket.emit("message", { capacity: newCapacity, level: newLevel });
    id += 1;
  };

  const formatNumber = (value) => parseFloat(value.toFixed(4));

  const setMaxLevel = (value) => {
    if (value < 0) {
      console.log(`No se puede llegar a una capacidad negativa`);
      return;
    }
    let newCapacity = formatNumber(value);
    let newLevel = level;
    if (newCapacity < level) {
      const extra = formatNumber(level - newCapacity);
      newLevel = capacity;
      console.log(
        `La capacidad supero el nivel actual de ${level} CM3 por ${extra} CM3`
      );
    }
    sendMessage(newCapacity, newLevel);
  };

  const addLevel = (value, type) => {
    let newLevel = formatNumber(level + value);
    if (newLevel < 0) {
      newLevel = 0;
    }
    if (newLevel > capacity) {
      const extra = formatNumber(newLevel - capacity);
      newLevel = capacity;
      console.log(
        `La capacidad llego al maximo no se agregaron ${extra} ${type}`
      );
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
