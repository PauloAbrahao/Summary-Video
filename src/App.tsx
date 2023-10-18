import "./App.css";

import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-primary py-10 min-h-screen sm:h-screen 2xl:p-10">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
