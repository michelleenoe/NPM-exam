"use client";
import { useState } from "react";
import TicketsForm from "@/components/backend/Tickets";
import Camping from "@/components/backend/Camping";
import PersonalForm from "@/components/backend/PersonalForm";
import SummaryPage from "@/components/backend/Summary";
import PaymentPage from "@/components/backend/Payment";
import ConfirmationPage from "@/components/backend/Confirmation";
import ProgressBar from "@/components/backend/ProgressBar";
import BasketTimer from "@/components/backend/BasketTimer";
import { useBookingData } from "@/hooks/useBookingData";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [bookingData, handleBookingChange] = useBookingData({
    ticketType: "regular",
    ticketQuantity: 1,
    camping: {},
    personalInfo: [],
    totalPrice: 0,
    orderId: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleTimeExpired = () => {
    handleBookingChange({
      ticketType: "regular",
      ticketQuantity: 1,
      camping: {},
      personalInfo: [],
      totalPrice: 0,
      orderId: "",
    });
  };

  const renderStep = (step) => {
    switch (step) {
      case 1:
        return <TicketsForm bookingData={bookingData} onClick={handleBookingChange} onNext={nextStep} />;
      case 2:
        return <Camping bookingData={bookingData} onClick={handleBookingChange} onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <PersonalForm bookingData={bookingData} onClick={handleBookingChange} onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <SummaryPage bookingData={bookingData} onBack={prevStep} onNext={nextStep} />;
      case 5:
        return <PaymentPage bookingData={bookingData} onBack={prevStep} onNext={nextStep} />;
      case 6:
        return <ConfirmationPage bookingData={bookingData} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="hidden">Bookingside</h1>
      {step < 6 && <ProgressBar currentStep={step} />}
      {step < 6 && <BasketTimer step={step} onTimeExpired={handleTimeExpired} />}
      {renderStep(step)}
    </div>
  );
}
