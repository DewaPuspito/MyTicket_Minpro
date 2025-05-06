'use client';

import { useState, useEffect } from 'react';
import Sidebar from './sidebar_cust/page';
import TicketsContent from './my_ticket/page';
import EditAccountContent from './edit_account/page';
import HistoryPage from './purchase_history/page'; // ✅ Import halaman Purchase History

const CustomerDashboard = () => {
    const [isClient, setIsClient] = useState(false);
    const [activeTab, setActiveTab] = useState<string | undefined>(undefined);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const storedTab = localStorage.getItem('activeTab');
            if (storedTab) {
                setActiveTab(storedTab);
            } else {
                setActiveTab('tickets');
            }
        }
    }, [isClient]);

    useEffect(() => {
        if (isClient && activeTab) {
            localStorage.setItem('activeTab', activeTab);
        }
    }, [activeTab, isClient]);

    type Ticket = {
        id: string;
        event: string;
        date: string;
        location: string;
        qrCode: string;
        status: "Active" | "Inactive";
    };

    const tickets: Ticket[] = [
        {
            id: '1',
            event: 'Heart2Heart Concert',
            date: '2025-05-01', // Sudah lewat
            location: 'Jakarta Convention Center',
            qrCode: 'VIP-1234-5678',
            status: 'Inactive' // ✅ memenuhi syarat review
        },
        {
            id: '2',
            event: 'Tech Summit 2025',
            date: '2025-06-20',
            location: 'Bandung Hall',
            qrCode: 'REG-9876-5432',
            status: 'Inactive' // ❌ belum lewat, tidak bisa review
        }
    ];
    

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    if (!isClient) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <Sidebar activeTab={activeTab || 'tickets'} setActiveTab={setActiveTab} />
            <div className="ml-64 p-8">
                {activeTab === 'tickets' && <TicketsContent tickets={tickets} />}
                {activeTab === 'edit account' && (
                    <EditAccountContent
                        fullName={fullName}
                        setFullName={setFullName}
                        email={email}
                        setEmail={setEmail}
                    />
                )}
                {activeTab === 'purchase history' && <HistoryPage />} {/* ✅ Tambahkan ini */}
            </div>
        </div>
    );
};

export default CustomerDashboard;
