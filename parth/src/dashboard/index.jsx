import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./main";
import Footer from "./Footer";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
  <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
  <div className="flex flex-1">
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />
    <main className="flex-1 bg-[#ecf5fb] p-4">
      <Main />
    </main>
  </div>
  <Footer />
</div>

  );
};

export default Dashboard;
