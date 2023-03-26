import React from "react";

function Visual({ current, max }) {
  return <h2>Capacidad del tanque {`${current}/${max}`} CM3</h2>;
}

export { Visual };
