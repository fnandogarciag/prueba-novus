import React from "react";

function HistorySlot({ capacity, level, date }) {
  const newDate = new Date(date);
  return (
    <li>
      El estado del tanque {level}/{capacity} CM3 {newDate.toLocaleString()}
    </li>
  );
}

export { HistorySlot };
