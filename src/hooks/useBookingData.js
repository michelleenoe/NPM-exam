import { useState } from 'react';

export function useBookingData(initialData) {
  const [bookingData, setBookingData] = useState(initialData);

  const handleBookingChange = (data) => {
    setBookingData((prevData) => ({ ...prevData, ...data }));
  };

  return [bookingData, handleBookingChange];
}
