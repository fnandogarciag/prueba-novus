import { useState } from "react";
import React from "react";

function Visual({ current, max }) {
  const ruler = [];
  for (let index = 10; index >= 0; index -= 1) {
    ruler.push(index);
  }
  const levelPercentage = (current / max) * 100;

  return (
    <div className="container_visual">
      <div className="visual_tank">
        <div
          className="visual_water"
          style={{ height: `calc(${levelPercentage}% - 4px)` }}
        ></div>
      </div>
      <div className="visual_rule">
        {ruler.map((num, index) => (
          <div
            key={num}
            className="visual_mark"
            style={{ "--index": index * 10 }}
          >
            {num * 10}%
          </div>
        ))}
      </div>
    </div>
  );
}

export { Visual };
