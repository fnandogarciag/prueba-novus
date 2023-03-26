import React from "react";

function Description({ current, max }) {
  const empty = parseFloat((max - current).toFixed(4));
  const percentage = Math.round((current / max) * 100) || "0";
  return (
    <h3 className="description">
      El tanque esta lleno un {percentage}% con {current}/{max} CM<sup>3</sup>{" "}
      <br />
      Hay disponibles {empty} CM<sup>3</sup>
    </h3>
  );
}

export { Description };
