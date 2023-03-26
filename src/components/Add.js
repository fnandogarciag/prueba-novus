import { useState } from "react";

function Add({ addLevel }) {
  const [inputValue, setInputValue] = useState(0);
  const [selectValue, setSelectValue] = useState("cm3");
  const measures = {
    cm3: 1,
    lts: 1000,
    mm3: 0.001,
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addLevel(parseFloat(inputValue) * measures[selectValue], selectValue);
  };
  return (
    <form onSubmit={onSubmit}>
      <span>Agregar al Tanque</span>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <select
        name="select"
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
      >
        {Object.keys(measures).map((measure) => (
          <option key={measure} value={measure}>
            {measure}
          </option>
        ))}
      </select>
      <button type="submit">Agregar</button>
    </form>
  );
}

export { Add };
