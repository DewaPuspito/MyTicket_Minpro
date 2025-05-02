import Image from "next/image";

interface EVoucherCardProps {
  eventName: string;
  buyDate: string;
  transactionCode: string;
  ticketAmount: number;
  imageUrl: string;
}

export default function EVoucherCard({
  eventName,
  buyDate,
  transactionCode,
  ticketAmount,
  imageUrl,
}: EVoucherCardProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Ticket E-Voucher</h2>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        {/* Image */}
        <div className="w-full md:w-1/3">
          <Image
            src={imageUrl}
            alt="Event Poster"
            width={400}
            height={250}
            className="rounded-md object-cover w-full h-auto"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 flex flex-col justify-between gap-2">
          <div>
            <p className="text-sm text-gray-600">Event :</p>
            <p className="text-md font-semibold">{eventName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Buy Date :</p>
            <p className="text-md font-semibold">{buyDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Transaction Code :</p>
            <p className="text-md font-semibold">{transactionCode}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Ticket Amount :</p>
            <p className="text-md font-semibold">{ticketAmount}</p>
          </div>
        </div>

        {/* E-Voucher Button */}
        <div className="mt-4 md:mt-0">
          <button className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg">
            E - Voucher
          </button>
        </div>
      </div>
    </div>
  );
}
