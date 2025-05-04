const AttendeesTab = () => {
    const attendees = [
      { id: 1, name: 'John Doe', email: 'john@example.com', event: 'Heart2Heart Concert', ticketAmount: '2' },
      { id: 2, name: 'Jane Smith', email: 'jane@mail.com', event: 'Tech Summit 2025', ticketAmount: '1' },
    ];
  
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Event Attendees</h2>
        <table className="w-full text-sm text-left">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Event</th>
              <th>Ticket Amount</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{a.name}</td>
                <td>{a.email}</td>
                <td>{a.event}</td>
                <td>{a.ticketAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default AttendeesTab;
  