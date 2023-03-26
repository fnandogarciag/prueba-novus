import { Description } from "@/components/Description";
import { Visual } from "@/components/Visual";
import { Max } from "@/components/Max";
import { Add } from "@/components/Add";
import { useTank } from "@/CustomStates/useTank";
import { History } from "@/components/History";
import { HistorySlot } from "@/components/HistorySlot";

function HomePage() {
  const { capacity, level, setMaxLevel, addLevel, history } = useTank();
  return (
    <>
      <Description />
      <section>
        <div className="left">
          <Visual current={level} max={capacity} />
        </div>
        <div className="right">
          <Max max={capacity} changeMax={setMaxLevel} />
          <br />
          <Add addLevel={addLevel} />
        </div>
      </section>
      <section>
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
