import "./App.css";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div className="bg-primary py-10 2xl:p-10 max-w-full h-screen lg:h-screen">
      <Header />
      <Main />
    </div>
  );
}

export default App;
