import { useEffect } from "react";
import { Description } from "@/components/Description";
import { Visual } from "@/components/Visual";
import { Max } from "@/components/Max";
import { Add } from "@/components/Add";
import { useTank } from "@/CustomStates/useTank";
import { History } from "@/components/History";
import { HistorySlot } from "@/components/HistorySlot";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";

function HomePage() {
  // Obtención de los valores del estado del tanque y sus funciones de modificación usando el hook useTank
  const { capacity, level, setMaxLevel, addLevel, history } = useTank();
  const notify = () => toast("Wow so easy!");
  useEffect(() => {
    window.alert = function (data) {
      if (data.type === "warning") {
        toast.warn(data.msg, {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
      if (data.type === "error") {
        toast.error(data.msg, {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    };
  }, []);
  return (
    <>
      <ToastContainer />
      {/* Título de la página */}
      <h1 className="title">Tank App</h1>
      <Row>
        <Col sm={4}>
          {/* Componente Visual que muestra la visualización gráfica del tanque */}
          <Visual current={level} max={capacity} />
        </Col>
        {/* Componente Description que muestra información textual sobre el nivel
        y capacidad del tanque, y los componentes Max y Add para modificarlos */}
        <Col>
          <Description current={level} max={capacity} />
          <Max max={capacity} changeMax={setMaxLevel} />
          <br />
          <Add addLevel={addLevel} />
        </Col>
      </Row>
      {/* Sección para mostrar el historial de cambios en el nivel y capacidad del tanque */}
      <section className="section_history">
        {/* Título de la sección de historial */}
        <h3>Historial</h3>
        {/* Componente History que muestra la lista de registros históricos del nivel y capacidad del 
        tanque, usando el componente HistorySlot para cada registro */}
        <History>
          {history.map((state) => (
            <HistorySlot
              key={state._id}
              capacity={state.capacity}
              level={state.level}
              date={state.date}
            />
          ))}
        </History>
      </section>
    </>
  );
}

export default HomePage;
