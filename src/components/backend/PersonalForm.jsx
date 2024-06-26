import { useState, useEffect } from "react";
import { handlePhoneKeyPress, validateForm } from "../../utils/formUtils";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
  Field,
  Label,
  Description,
} from "@headlessui/react";
import clsx from "clsx";
import prices from "../backend/settings.js";
import { krona_one } from "@/app/fonts.jsx";
import CartSummary from "./CartSummary";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const countryCodes = [
  { code: "+45", label: "DK" },
  { code: "+46", label: "SE" },
  { code: "+47", label: "NO" },
  { code: "+49", label: "DE" },
];

export default function PersonalForm({ bookingData, onClick, onNext, onBack }) {
  const { personalInfo, ticketQuantity, ticketType, camping } = bookingData;
  const [localPersonalInfo, setLocalPersonalInfo] = useState(personalInfo);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (localPersonalInfo.length === 0) {
      const initialInfo = Array.from({ length: ticketQuantity }, () => ({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dateOfBirth: "",
        email: "",
        countryCode: "+45",
      }));
      setLocalPersonalInfo(initialInfo);
    }
  }, [ticketQuantity]);

  useEffect(() => {
    const ticketPrice = ticketQuantity * (ticketType === "regular" ? prices.regular : prices.vip);
    const addOnPrice =
      (camping.greenCamping ? prices.greenCamping : 0) +
      camping.twoPersonTent * prices.TwoPersonsTent +
      camping.threePersonTent * prices.ThreePersonsTent;
    setTotalPrice(ticketPrice + addOnPrice + prices.fee);
  }, [ticketQuantity, ticketType, camping]);

  const handleInputChange = (index, field, value) => {
    setLocalPersonalInfo((prev) => {
      const newPersonalInfo = [...prev];
      newPersonalInfo[index] = { ...newPersonalInfo[index], [field]: value };
      return newPersonalInfo;
    });
  };

  // Nyt --> tilføjet dato til at validere at køber er 18 år 
  const isOldEnough = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    return age > 18 || (age === 18 && m >= 0 && today.getDate() >= birthDate.getDate());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    let message = "";

    localPersonalInfo.forEach((info, index) => {
      if (!isOldEnough(info.dateOfBirth)) {
        valid = false;
        message = `Billet ${index + 1} skal være mindst 18 år gammel.`;
      }
    });

    if (validateForm(event.target) && valid) {
      setErrorMessage("");
      onClick({ personalInfo: localPersonalInfo, totalPrice });
      onNext();
    } else {
      setErrorMessage(message || "Formularen er ikke korrekt udfyldt.");
    }
  };

  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-8 pb-16 col-start-3 gap-3 flex flex-wrap items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-secondaryBgColor rounded-lg p-8 shadow-md shadow-primaryColor w-full max-w-md"
        >
          <fieldset className="space-y-6">
            <legend
              className={`${krona_one.className} large-size text-primaryTextColor`}
            >
              Personlig information
            </legend>

            {localPersonalInfo.map((info, index) => (
              <Disclosure key={index} defaultOpen={index === 0}>
                {({ open }) => (
                  <>
                    <div className="relative mb-2">
                      <DisclosureButton
                        className={clsx(
                          "w-full py-2 text-center small-size rounded-lg bg-bgColor text-primaryTextColor shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accentColor",
                          { "": open }
                        )}
                        aria-expanded={open}
                        aria-controls={`panel-${index}`}
                      >
                        Billet {index + 1} ({ticketType})
                      </DisclosureButton>
                      {open ? (
                        <ChevronUpIcon
                          className="pointer-events-none absolute top-2.5 right-2.5 size-5 fill-primaryTextColor"
                          aria-hidden="true"
                        />
                      ) : (
                        <ChevronDownIcon
                          className="pointer-events-none absolute top-2.5 right-2.5 size-5 fill-primaryTextColor"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <DisclosurePanel className="pb-2" id={`panel-${index}`}>
                      <div className="space-y-4">
                        <Field className="space-y-2">
                          <Label htmlFor={`firstName-${index}`}>Fornavn:</Label>
                          <input
                            id={`firstName-${index}`}
                            type="text"
                            value={info.firstName}
                            className="peer w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                            aria-label={`Fornavn for billet ${index + 1}`}
                            pattern="^[A-Za-zæøåÆØÅ ]+$"
                            title="Fornavn må kun indeholde bogstaver."
                            required
                            onChange={(e) =>
                              handleInputChange(index, "firstName", e.target.value)
                            }
                          />
                          <Description className="xsmall-size hidden peer-focus:block">
                            Fornavn må kun indeholde bogstaver
                          </Description>
                        </Field>

                        <Field className="space-y-2">
                          <Label htmlFor={`lastName-${index}`}>
                            Efternavn:
                          </Label>
                          <input
                            id={`lastName-${index}`}
                            type="text"
                            value={info.lastName}
                            className="peer w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                            aria-label={`Efternavn for billet ${index + 1}`}
                            pattern="^[A-Za-zæøåÆØÅ ]+$"
                            title="Efternavn må kun indeholde bogstaver."
                            required
                            onChange={(e) =>
                              handleInputChange(index, "lastName", e.target.value)
                            }
                          />
                          <Description className=" xsmall-size hidden peer-focus:block">
                            Efternavn må kun indeholde bogstaver
                          </Description>
                        </Field>

                        <Field className="space-y-2">
                          <Label htmlFor={`phoneNumber-${index}`}>
                            Telefonnummer:
                          </Label>
                          <div className="flex space-x-2">
                            <select
                              value={info.countryCode}
                              onChange={(e) => handleInputChange(index, "countryCode", e.target.value)}
                              className="p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                              aria-label="Vælg landekode"
                              required
                            >
                              {countryCodes.map((country) => (
                                <option key={country.code} value={country.code}>
                                  {country.label} {country.code}
                                </option>
                              ))}
                            </select>
                            <input
                              id={`phoneNumber-${index}`}
                              type="tel"
                              value={info.phoneNumber}
                              className="peer w-full p-2 border bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                              aria-label={`Telefonnummer for billet ${index + 1}`}
                              pattern="\d+"
                              title="Telefonnummeret skal kun indeholde tal."
                              onKeyPress={handlePhoneKeyPress}
                              onChange={(e) =>
                                handleInputChange(index, "phoneNumber", e.target.value)
                              }
                            />
                          </div>
                          <Description className=" xsmall-size hidden peer-focus:block">
                            Telefonnummeret skal kun indeholde tal
                          </Description>
                        </Field>

                        <Field className="space-y-2">
                          <Label htmlFor={`dateOfBirth-${index}`}>
                            Fødselsdato:
                          </Label>
                          <input
                            id={`dateOfBirth-${index}`}
                            type="date"
                            value={info.dateOfBirth}
                            className="peer w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                            aria-label={`Fødselsdato for billet ${index + 1}`}
                            min="1923-01-01"
                            required
                            onChange={(e) =>
                              handleInputChange(index, "dateOfBirth", e.target.value)
                            }
                          />
                          <Description className="xsmall-size hidden peer-focus:block">
                            Du skal være mindst 18 år gammel
                          </Description>
                        </Field>

                        <Field className="space-y-2">
                          <Label htmlFor={`email-${index}`}>Email:</Label>
                          <input
                            id={`email-${index}`}
                            type="email"
                            value={info.email}
                            className="peer w-full p-2 bg-inputFieldColor text-bgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-accentColor"
                            aria-label={`Email for billet ${index + 1}`}
                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                            title="Email skal være en gyldig emailadresse."
                            required
                            onChange={(e) =>
                              handleInputChange(index, "email", e.target.value)
                            }
                          />
                          <Description className="xsmall-size hidden peer-focus:block">
                            Email skal være en gyldig emailadresse og indeholde
                            @
                          </Description>
                        </Field>
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}
          </fieldset>

          {errorMessage && (
            <div className="text-red-600 text-sm mt-4">{errorMessage}</div>
          )}

          <div className="flex justify-between mt-8">
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
        </form>
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
