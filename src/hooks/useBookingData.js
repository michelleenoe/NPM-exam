import { useState, useCallback } from 'react';

export function useBookingData(initialData) {
  const [bookingData, setBookingData] = useState(initialData);

  const handleBookingChange = useCallback((data) => {
    setBookingData((prevData) => ({ ...prevData, ...data }));
  }, []);

  return [bookingData, handleBookingChange];
}
