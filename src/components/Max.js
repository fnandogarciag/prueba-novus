import { useState } from "react";

function Max({ max, changeMax }) {
  const [input, setInput] = useState(max);
  const onSubmit = (e) => {
    e.preventDefault();
    changeMax(parseFloat(input));
  };
  return (
    <form onSubmit={onSubmit}>
      <span>Cambiar Maximo</span>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Cambiar</button>
    </form>
  );
}

export { Max };
