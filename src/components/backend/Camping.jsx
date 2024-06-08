import { useState, useEffect } from "react";
import prices from "../backend/settings.js";
import { fetchAPI } from "@/app/api/api.js";
import { calculateTotalPrice } from "@/utils/calculateTotalPrice";
import { krona_one } from "@/app/fonts.jsx";
import {
  Field,
  Label,
  Select,
  Checkbox,
  Fieldset,
  Legend,
} from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import CartSummary from "./CartSummary";

export default function Camping({ bookingData, onClick, onNext, onBack }) {
  const { ticketQuantity, ticketType, camping: campingOptions } = bookingData;

  const [localCampingData, setLocalCampingData] = useState({
    greenCamping: campingOptions.greenCamping || false,
    twoPersonTent: campingOptions.twoPersonTent || 0,
    threePersonTent: campingOptions.threePersonTent || 0,
    selectedArea: campingOptions.selectedArea || "",
  });
  const [campingAreas, setCampingAreas] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const totalPrice = calculateTotalPrice(ticketQuantity, ticketType, localCampingData);

  useEffect(() => {
    const loadCampingAreas = async () => {
      const data = await fetchAPI("/available-spots");
      setCampingAreas(data);
    };
    loadCampingAreas();
  }, []);

  useEffect(() => {
    onClick({ camping: localCampingData });
  }, [localCampingData]);

  const handleChange = (field, value) => {
    setLocalCampingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuantityChange = (type, increment) => {
    setLocalCampingData(prev => {
      const newValue = Math.max(0, prev[type] + increment);
      const totalTents = (type === "twoPersonTent" ? newValue : prev.twoPersonTent) +
                         (type === "threePersonTent" ? newValue : prev.threePersonTent);

      return totalTents <= ticketQuantity ? { ...prev, [type]: newValue } : prev;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!localCampingData.selectedArea) {
      setErrorMessage("Du skal vælge et campingområde, inden du kan gå videre.");
      return;
    }

    const reservation = await fetchAPI("/reserve-spot", {
      method: "PUT",
      body: JSON.stringify({ area: localCampingData.selectedArea, amount: ticketQuantity }),
    });

    onClick({ area: localCampingData.selectedArea, orderId: reservation.id });
    onNext();
  };

  const filteredCampingAreas = campingAreas.filter(
    (area) => area.available >= ticketQuantity
  );

  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-8 pb-16 col-start-3 gap-3 flex flex-wrap items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-secondaryBgColor rounded-lg p-8 shadow-md shadow-primaryColor w-full max-w-md"
        >
          <Fieldset className="space-y-6">
            <Legend
              className={`${krona_one.className} large-size text-primaryTextColor`}
            >
              Camping Tilvalg
            </Legend>

            <Field className="space-y-4">
              <Label htmlFor="campingArea">Nedenunder skal du vælge campingområde. <br></br> Dette er inkluderet i billetprisen.</Label>
              <div className="relative">
                <Select
                  id="campingArea"
                  value={localCampingData.selectedArea}
                  onChange={(e) => handleChange('selectedArea', e.target.value)}
                  className={clsx(
                    "mt-1 block w-full appearance-none border-none rounded-lg bg-inputFieldColor text-bgColor py-2 px-5",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor"
                  )}
                  aria-label="Vælg campingområde"
                  required
                >
                  <option value="">Vælg campingområde</option>
                  {filteredCampingAreas.map((area) => (
                    <option key={area.area} value={area.area}>
                      {area.area} (Ledige pladser: {area.available})
                    </option>
                  ))}
                </Select>
                <ChevronDownIcon
                  className="pointer-events-none absolute top-2.5 right-2.5 size-5 fill-bgColor"
                  aria-hidden="true"
                />
              </div>
            </Field>
            

            <table className="min-w-full rounded-lg">
              <thead>
              
                <tr>
                  <th className="text-left px-4 py-3 rounded-tl-lg text-bgColor bg-primaryTextColor">
                    Tilvalg
                  </th>
                  <th className="text-center px-4 py-3 text-bgColor bg-primaryTextColor">
                    Antal
                  </th>
                  <th className="text-right px-4 py-3 rounded-tr-lg text-bgColor bg-primaryTextColor">
                    Pris
                  </th>
                </tr>
              </thead>
              
              <tbody>
              
                <tr>
                  <td className="px-4 pb-2 pt-6">2 pers telt</td>
                  <td className="px-4 pb-2 pt-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("twoPersonTent", -1)}
                        aria-label="Decrease 2 person tent quantity"
                        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      >
                        -
                      </button>
                      <span>{localCampingData.twoPersonTent}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("twoPersonTent", 1)}
                        aria-label="Increase 2 person tent quantity"
                        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 pb-2 pt-6 text-right">
                    {prices.TwoPersonsTent} DKK
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">3 pers telt</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("threePersonTent", -1)}
                        aria-label="Decrease 3 person tent quantity"
                        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      >
                        -
                      </button>
                      <span>{localCampingData.threePersonTent}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("threePersonTent", 1)}
                        aria-label="Increase 3 person tent quantity"
                        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">
                    {prices.ThreePersonsTent} DKK
                  </td>
                </tr>
                <tr>
                  <td className="px-4 pb-6 pt-2">
                    Grøn camping{" "}<br></br>
                    <span className="text-xs text-primaryTextColor/60">
                      (Lav miljøpåvirkning)
                    </span>
                  </td>
                  <td className="px-4 pb-6 pt-4 flex justify-center text-center items-center">
                    <Checkbox
                      checked={localCampingData.greenCamping}
                      onChange={(value) => handleChange('greenCamping', value)}
                      className="h-6 w-6 rounded bg-inputFieldColor text-accentColor focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-accentColor"
                    >
                      {({ checked }) => (
                        <div
                          className={clsx(
                            checked ? "bg-accentColor" : "bg-inputFieldColor",
                            "flex items-center justify-center h-6 w-6 rounded "
                          )}
                        >
                          {checked && (
                            <CheckIcon
                              className="w-4 h-4 text-bgColor"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      )}
                    </Checkbox>
                  </td>
                  <td className="px-4 pb-6 pt-2 text-right">
                    {prices.greenCamping} DKK
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-right">
                    Booking gebyr: {prices.fee} DKK
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    className="text-center px-4 py-3 bg-primaryTextColor rounded-b-lg text-bgColor"
                  >
                    <strong>Total Pris: {totalPrice} DKK</strong>
                  </td>
                </tr>
                {errorMessage && (
                  <tr>
                    <td colSpan="3" className=" text-right px-4 py-2">
                      {errorMessage}
                    </td>
                  </tr>
                )}
              </tfoot>
            </table>
            <p className="xsmall-size">
              Hvis du vælger en teltløsning er opsætning inkluderet i prisen af vores team.
            </p>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onBack}
                className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                aria-label="Tilbage"
              >
                Tilbage
              </button>
              <button
                type="submit"
                className="bg-bgColor border-2 rounded-lg border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
                aria-label="Fortsæt"
              >
                Fortsæt
              </button>
            </div>
          </Fieldset>
        </form>

        <CartSummary
          ticketType={ticketType}
          ticketQuantity={ticketQuantity}
          campingOptions={localCampingData}
        />
      </div>
    </div>
  );
}
