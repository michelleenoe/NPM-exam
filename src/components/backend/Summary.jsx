import { krona_one } from "@/app/fonts.jsx";
import RegularTicketSVG from "./RegularTicketSVG";
import VIPTicketSVG from "./VIPTicketSVG";
import CartSummary from "./CartSummary";

export default function SummaryPage({ bookingData, onBack, onNext }) {
  const { ticketType, ticketQuantity, personalInfo, camping, totalPrice } = bookingData;

  const TicketSVG = ticketType.toLowerCase() === "vip" ? VIPTicketSVG : RegularTicketSVG;

  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-8 pb-16 col-start-3 gap-3 flex flex-wrap items-center justify-center ">
        <div className="bg-secondaryBgColor rounded-lg p-8 shadow-lg w-full max-w-s">
          <h2 className={`${krona_one.className} large-size text-primaryTextColor mb-6`}>
            Opsummering
          </h2>
          
          
          <div className="mb-6 space-y-6">
            <div className="flex flex-wrap md:justify-evenly items-center mb-8 gap-2">
              <div className="normal-size">
                <p className="font-semibold mb-2">Billetter:</p>
                <p className="mb-2">
                  {ticketType.charAt(0).toUpperCase() + ticketType.slice(1)} billet x {ticketQuantity}
                  <div className="space-y-4 mt-6">
                {camping.selectedArea && (
                  <p><b>Camping område:</b> {camping.selectedArea}</p>
                )}
                <p>Tilvalg:</p>
                {camping.greenCamping && (
                  <p><b>Green Camping:</b> {camping.greenCamping ? "Yes" : "No"}</p>
                )}
                {camping.twoPersonTent > 0 && (
                  <p><b>2 personers telt x</b> {camping.twoPersonTent}</p>
                )}
                {camping.threePersonTent > 0 && (
                  <p><b>3 personers telt x</b> {camping.threePersonTent}</p>
                )}
              </div>
         
                </p>
              </div>
              <TicketSVG className="w-64" aria-hidden="true" />
            </div>
            
            <div className="space-y-5">
              <h3 className="text-xl font-semibold">Personlige oplysninger</h3>
              {personalInfo.map((info, index) => (
                <div key={index} className="bg-bgColor p-4 rounded-lg">
                  <p><b>Billet {index + 1}</b> ({ticketType})</p>
                  <p><b>Fornavn:</b> {info.firstName}</p>
                  <p><b>Efternavn:</b> {info.lastName}</p>
                  <p><b>Telefonnummer:</b> {info.phoneNumber}</p>
                  <p><b>Fødselsdato:</b> {info.dateOfBirth}</p>
                  <p><b>Email:</b> {info.email}</p>
                </div>
              ))}
            </div>

          
          </div>
          
          <div className="flex justify-between mt-8">
            <button
              onClick={onBack}
              className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
              aria-label="Tilbage"
            >
              Tilbage
            </button>
            <button
              onClick={onNext}
              className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor ml-4"
              aria-label="Fortsæt til betaling"
            >
              Fortsæt til betaling
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center fixed w-full max-w-md md:w-44">
          <CartSummary
            ticketType={ticketType}
            ticketQuantity={ticketQuantity}
            campingOptions={camping}
          />
        </div>
      </div>
    </div>
  );
}
