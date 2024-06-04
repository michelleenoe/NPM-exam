import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/globals/Button";
import { krona_one } from "@/app/fonts.jsx";

function BasketTimer({ step, onTimeExpired }) {
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (step < 3 || step > 5) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 1, 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [step]);

  useEffect(() => {
    if (timeLeft === 0 && !popup) {
      setPopup(true);
      onTimeExpired();
    }
  }, [timeLeft, popup, onTimeExpired]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      {step >= 3 && step <= 5 && (
        <div className="relative flex flex-col items-center justify-center h-full">
          <h1 className={`${krona_one.className} normal-size`}>
            Tid tilbage: {formatTime(timeLeft)}
          </h1>
          {popup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="absolute inset-0 backdrop-blur-md"></div>
              <div className="relative bg-secondaryBgColor p-8 shadow-primaryColor rounded-lg shadow-lg text-center max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">Tiden er udløbet</h2>
                <p className="mb-4">Du kan starte dit køb forfra igen.</p>
                <div className="flex justify-between mt-4 space-x-4">
                  <Link href="/" passHref>
                    <Button
                      title="Gå til forsiden"
                      className="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor hover:bg-green-700 transition duration-300"
                    />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default BasketTimer;
