import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import styles from "./App.module.scss";
import CoinPage from "./pages/CoinPage/CoinPage";

function App() {
  return (
    <>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<CoinPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
