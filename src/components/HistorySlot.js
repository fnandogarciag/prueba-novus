import React from "react";

function HistorySlot({ capacity, level, date }) {
  const newDate = new Date(date);
  return (
    <tr>
      <td>{capacity}</td>
      <td>{level}</td>
      <td>{newDate.toLocaleString()}</td>
    </tr>
  );
}

export { HistorySlot };
