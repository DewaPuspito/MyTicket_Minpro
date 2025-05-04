// Dashboard.tsx
"use client";
import { useState, useEffect } from "react";
import EventsTab from "./events_tab/page";
import TransactionsTab from "./transaction/page";
import StatsTab from "./stats_tab/page";
import AttendeesTab from "./attendees/page";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("events");
  const [isMounted, setIsMounted] = useState(false);

  const events = [
    { id: 1, name: "Heart2Heart Concert", date: "2025-05-15", location: "Jakarta", ticketsSold: 1500, status: "active" },
    { id: 2, name: "Tech Summit 2025", date: "2025-06-20", location: "Bandung", ticketsSold: 850, status: "active" },
  ];

  const transactions = [
    { id: 1, user: "john@example.com", event: "Heart2Heart", amount: 2, total: "Rp 1.000.000", status: "pending", proof: "proof1.jpg" },
    { id: 2, user: "sarah@mail.com", event: "Tech Summit", amount: 1, total: "Rp 500.000", status: "accepted", proof: "proof2.jpg" },
  ];

  const statsData = [
    { month: "Jan", sales: 4000, attendees: 2400 },
    { month: "Feb", sales: 3000, attendees: 1398 },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-br from-[#0f172a] to-[#1e293b] shadow-2xl border-r border-white/10">
        <div className="p-6 text-white space-y-4">
          <h2 className="text-2xl font-bold mb-8">My Dashboard</h2>
          {["events", "transactions", "stats", "attendees"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                activeTab === tab ? "bg-white text-gray-800" : "hover:bg-white/10"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="space-y-8">
          {activeTab === "events" && <EventsTab events={events} />}
          {activeTab === "transactions" && <TransactionsTab transactions={transactions} />}
          {activeTab === "stats" && <StatsTab statsData={statsData} />}
          {activeTab === "attendees" && <AttendeesTab />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
