import "./App.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportDetails from "./pages/ReportDetails";
import MyReports from "./pages/MyReports";
import NotFound from "./pages/NotFound";
import CommunityDetails from "./pages/community/CommunityDetails";
import CreateCommunity from "./pages/community/CreateCommunity";
import CommunityList from "./pages/community/CommunityList";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ReportPage from "./pages/ReportPage";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/report/:communityId" element={<ReportPage />} />

        <Route path="/report/:id/details" element={<ReportDetails />} />
        <Route path="/my-reports" element={<MyReports />} />

        <Route path="/communities" element={<CommunityList />} />
        <Route path="/communities/:id" element={<CommunityDetails />} />
        <Route path="/create-community" element={<CreateCommunity />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
