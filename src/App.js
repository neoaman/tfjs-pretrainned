import "./App.css";
import Layout from "./Layout";

const static_base = {
  title: "TFJS models",
  icon: "SiTensorflow",
};

function App() {
  return (
    <>
      <Layout base={static_base} />;
    </>
  );
}

export default App;
