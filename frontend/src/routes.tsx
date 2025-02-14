import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Arena from "./pages/Arena";
import { WebSocketProvider } from "./context/WebSocketContext";

const AppRoutes = () => {
  return (
    <WebSocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Arena />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </WebSocketProvider>
  );
};

export default AppRoutes;
