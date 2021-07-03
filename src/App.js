import Timeline from "components/timeline/Timeline";
import Layzr2Priority from "data/LayzrTV-Timeline-Example.json";
import "./App.css";

function App() {
  return (
    <div>
      <Timeline title="UPCOMING EVENTS:" data={Layzr2Priority ?? []} />
    </div>
  );
}

export default App;
