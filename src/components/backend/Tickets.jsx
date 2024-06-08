import { useState } from "react";
import { krona_one } from "@/app/fonts.jsx";
import prices from "../backend/settings";
import {
  Select,
  RadioGroup,
  Radio,
  Field,
  Label,
  Legend,
  Fieldset,
} from "@headlessui/react";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import RegularTicketSVG from "./RegularTicketSVG";
import VIPTicketSVG from "./VIPTicketSVG";

export default function TicketsForm({ bookingData, onClick, onNext }) {
  const [localData, setLocalData] = useState({
    ticketType: bookingData.ticketType,
    ticketQuantity: bookingData.ticketQuantity,
  });

  const totalPrice = localData.ticketQuantity * (localData.ticketType === "regular" ? prices.regular : prices.vip);

  const handleChange = (field, value) => {
    setLocalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClick(localData);
    onNext();
  };

  const ticketOptions = [
    { name: "Regular", price: prices.regular, SVG: RegularTicketSVG, description: "Adgang til festivalen med standard faciliteter." },
    { name: "VIP", price: prices.vip, SVG: VIPTicketSVG, description: "Adgang til festivalen med VIP faciliteter, herunder eksklusiv lounge og hurtigere adgang." },
  ];

  return (
    <div className="pt-8 pb-16 col-start-3 gap-3 flex flex-wrap items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-secondaryBgColor p-10 rounded-lg shadow-md shadow-primaryColor w-full max-w-3xl"
      >
        <Fieldset className="space-y-6">
          <Legend
            className={`${krona_one.className} text-2xl mb-4 text-primaryTextColor`}
          >
            Vælg billettype
          </Legend>
          <RadioGroup
            value={localData.ticketType}
            onChange={(value) => handleChange('ticketType', value)}
            className="space-y-6"
          >
            <Label className="block text-lg font-semibold mb-2"></Label>
            {ticketOptions.map((option) => (
              <Radio
                key={option.name}
                value={option.name.toLowerCase()}
                className={({ active, checked }) =>
                  clsx(
                    "relative flex cursor-pointer rounded-lg bg-bgColor py-6 px-8 shadow-md transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor",
                    {
                      "ring-2 ring-offset-2 ring-accentColor": active,
                      "bg-primaryTextColor/10": checked,
                    }
                  )
                }
              >
                {({ checked }) => (
                  <div className="flex w-full items-center justify-between">
                    <div className="text-left">
                      <div className="flex items-center gap-4 mb-2">
                        <option.SVG className="h-16 w-16" aria-hidden="true" />
                        <div>
                          <p className="text-xl font-semibold text-primaryTextColor">
                            {option.name} - {option.price} DKK
                          </p>
                          <p className="text-sm text-primaryTextColor/80">{option.description}</p>
                        </div>
                      </div>
                    </div>
                    {checked && (
                      <CheckCircleIcon
                        className="h-8 w-8 fill-accentColor"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                )}
              </Radio>
            ))}
          </RadioGroup>
          <Field className="flex flex-col small-size">
            <Label htmlFor="ticketQuantity" className="mb-4 text-lg">
              Vælg antal billetter:
            </Label>
            <div className="relative">
              <Select
                id="ticketQuantity"
                value={localData.ticketQuantity}
                onChange={(e) => handleChange('ticketQuantity', parseInt(e.target.value, 10))}
                className={clsx(
                  "mt-0 block w-full appearance-none border-none rounded-lg bg-inputFieldColor text-bgColor py-3 px-4",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor"
                )}
                aria-describedby="ticketQuantity-description"
                required
              >
                {[...Array(10).keys()].map(i => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </Select>
              <ChevronDownIcon
                className="pointer-events-none absolute top-3 right-3 h-5 w-5 fill-bgColor"
                aria-hidden="true"
              />
            </div>
          </Field>
          <div className="text-lg mt-4">
            Total pris for billetter: {totalPrice} DKK
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-bgColor rounded-lg border-2 border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor"
              aria-label="Køb billetter"
            >
              Køb billetter
            </button>
          </div>
        </Fieldset>
      </form>
    </div>
  );
}
