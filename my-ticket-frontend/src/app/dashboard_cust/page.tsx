'use client';

import { useState, useEffect } from 'react';
import Sidebar from './sidebar_cust/page';
import TicketsContent from './my_ticket/page';
import HistoryPage from './purchase_history/page'; 

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
    
    if (!isClient) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <Sidebar activeTab={activeTab || 'tickets'} setActiveTab={setActiveTab} />
            <div className="ml-64 p-8">
                {activeTab === 'tickets' && <TicketsContent/>}
                {activeTab === 'purchase history' && <HistoryPage />}
            </div>
        </div>
    );
};

export default CustomerDashboard;