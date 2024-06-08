import { krona_one } from "@/app/fonts.jsx";
import Button from "@/components/globals/Button";
import Link from "next/link";
import RegularTicketSVG from "./RegularTicketSVG";
import VIPTicketSVG from "./VIPTicketSVG";

export default function ConfirmationPage({ bookingData }) {
  const { orderId, ticketType, personalInfo } = bookingData;
  const email = personalInfo.length > 0 ? personalInfo[0].email : "din email";

  const TicketSVG = ticketType === "regular" ? RegularTicketSVG : VIPTicketSVG;

  return (
    <div className="flex items-center justify-center min-h-screen bg-primaryBgColor">
      <div className="bg-secondaryBgColor rounded-lg p-8 shadow-lg w-full max-w-lg">
        <h2
          className={`${krona_one.className} text-center text-3xl text-primaryTextColor mb-6`}
        >
          Ordrebekræftelse
        </h2>
        <div className="flex items-center justify-center">
          <p className="text-lg font-semibold text-primaryTextColor">
            Tak for dit køb!
          </p>
          </div>
          <div className="flex items-center justify-center">
          <TicketSVG className="h-60 w-60" />
        </div>
        <div className="text-center mb-6">
          <p className="text-lg text-primaryTextColor">Dit ordrenummer er:</p>
          <p className="text-2xl font-bold text-primaryTextColor">{orderId}</p>
        </div>
        <p className="text-center text-lg mb-8 text-primaryTextColor">
          En ordrebekræftelse er sendt til <span className="font-semibold"> {email}</span>.
        </p>
        <div className="flex justify-between">
          <Link href="/timeTable/">
            <Button title="Tidsplan" />
          </Link>
          <Link href="/lineup/">
            <Button title="Line-up" />
          </Link>
        </div>
      </div>
    </div>
  );
}
