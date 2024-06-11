import { krona_one } from "@/app/fonts.jsx";
import RegularTicketSVG from "./RegularTicketSVG";
import VIPTicketSVG from "./VIPTicketSVG";
import CartSummary from "./CartSummary";

// Funktion til at formatere datoen til dd-mm-yyyy
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('da-DK', options);
};

export default function SummaryPage({ bookingData, onBack, onNext }) {
  const { ticketType, ticketQuantity, personalInfo, camping, totalPrice } = bookingData;

  const TicketSVG = ticketType.toLowerCase() === "vip" ? VIPTicketSVG : RegularTicketSVG;

  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-8 pb-16 col-start-3 gap-3 flex flex-wrap items-center justify-center">
        <div className="bg-secondaryBgColor rounded-lg p-8 shadow-lg w-full max-w-xl">
          <h2 className={`${krona_one.className} text-3xl text-primaryTextColor mb-6`}>
            Opsummering
          </h2>
          
          <div className="mb-6 space-y-6">
            <div className="flex flex-wrap md:justify-between items-center mb-8 gap-4">
              <div>
                <p className="text-lg mb-2">Billetter:<br></br>
                  {ticketType.charAt(0).toUpperCase() + ticketType.slice(1)} x {ticketQuantity}
                </p>
                <div className="space-y-4 mt-4">
                  {camping.selectedArea && (
                    <p className="text-lg mb-2">Campingområde: <br></br>{camping.selectedArea}</p>
                  )}
                  {(camping.greenCamping || camping.twoPersonTent > 0 || camping.threePersonTent > 0) && (
                    <div>
                      <p className="text-lg mt-4">Tilvalg:</p>
                      {camping.twoPersonTent > 0 && (
                        <p>2 Pers telt x {camping.twoPersonTent}</p>
                      )}
                      {camping.threePersonTent > 0 && (
                        <p>3 Pers telt x {camping.threePersonTent}</p>
                      )}
                      {camping.greenCamping && (
                        <p>Green Camping {camping.greenCamping}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <TicketSVG className="w-60" aria-hidden="true" />
            </div>
            
            <div className="space-y-5">
              <h3 className="text-xl font-semibold">Personlige oplysninger</h3>
              {personalInfo.map((info, index) => (
                <div key={index} className="bg-bgColor p-4 rounded-lg space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div><b>Fornavn:</b></div>
                    <div>{info.firstName}</div>
                    <div><b>Efternavn:</b></div>
                    <div>{info.lastName}</div>
                    <div><b>Telefonnummer:</b></div>
                    <div>{info.phoneNumber}</div>
                    <div><b>Fødselsdato:</b></div>
                    <div>{formatDate(info.dateOfBirth)}</div>
                    <div><b>Email:</b></div>
                    <div>{info.email}</div>
                  </div>
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

        <div className="flex items-center justify-center w-full max-w-md mt-8">
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
