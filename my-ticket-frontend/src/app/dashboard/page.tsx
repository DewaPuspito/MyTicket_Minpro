"use client";
import { useState, useEffect } from "react";
import EventsTab from "./events_tab/page";
import TransactionsTab from "./transaction/page";
import StatsTab from "./stats_tab/page";
import AttendeesTab from "./attendees/page";
import api from "@/app/utils/api/myticket.api";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

interface Transaction {
  id: number;
  status: 'PENDING' | 'PAID' | 'EXPIRED' | 'REJECTED' | 'CANCELLED';
  createdAt: string;
  ticket: {
    qty: number;
    price: number;
  };
}

interface Event {
  id: number;
  userId: number;
  title: string;
}

interface UserToken {
  id: number;
  role: string;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [statsData, setStatsData] = useState<{ month: string; sales: number; attendees: number }[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode<UserToken>(token);
      setUserId(decoded.id);

      if (decoded.role === "organizer") {
        fetchEvents(decoded.id);
      }

      fetchStatsData(token);
    }
  }, []);

  const fetchEvents = async (userId: number) => {
    try {
      const res = await api.get(`/events?userId=${userId}`);
      setEvents(res.data.data);
    } catch (error) {
      toast.error("Gagal memuat event");
    }
  };

  const fetchStatsData = async (token: string) => {
    try {
      const response = await api.get("/get-transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const transactions: Transaction[] = response.data.data;
      const paid = transactions.filter((t) => t.status === "PAID");

      const monthlyMap: { [month: string]: { sales: number; attendees: number } } = {};

      paid.forEach((t) => {
        const date = new Date(t.createdAt);
        const month = date.toLocaleString("default", { month: "short" });

        if (!monthlyMap[month]) {
          monthlyMap[month] = { sales: 0, attendees: 0 };
        }

        const price = t.ticket.price || 0;
        const qty = t.ticket.qty || 0;

        monthlyMap[month].sales += price * qty;
        monthlyMap[month].attendees += qty;
      });

      const result = Object.entries(monthlyMap).map(([month, data]) => ({
        month,
        ...data,
      }));

      setStatsData(result);
    } catch (error) {
      toast.error("Gagal memuat data statistik");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-br from-[#0f172a] to-[#1e293b] shadow-2xl border-r border-white/10">
        <div className="p-6 text-white space-y-4">
          <h2 className="text-2xl font-bold mb-8">Organizer Dashboard</h2>
          {[ "transactions", "stats", "attendees"].map((tab) => (
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
          {activeTab === "transactions" && <TransactionsTab />}
          {activeTab === "stats" && <StatsTab statsData={statsData} />}
          {activeTab === "attendees" && <AttendeesTab />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;