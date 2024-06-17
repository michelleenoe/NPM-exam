import { useState, useCallback } from 'react'; // Importer useState og useCallback hooks fra React

export function useBookingData(initialData) { // Definerer og eksporterer en custom React hook ved navn useBookingData
  const [bookingData, setBookingData] = useState(initialData); 
  // Initialiserer state-variabel bookingData med initialData og setter-funktionen setBookingData

  const handleBookingChange = useCallback((data) => { 
    // Definerer en funktion handleBookingChange ved brug af useCallback for at memoize funktionen
    setBookingData((prevData) => ({ ...prevData, ...data })); 
    // Opdaterer bookingData ved at sprede tidligere data (prevData) og nye data (data) ind i et nyt objekt
  }, []); // Tomt afhængighedsarray betyder, at handleBookingChange kun skabes én gang ved montering

  return [bookingData, handleBookingChange]; 
  // Returnerer et array med bookingData og handleBookingChange så de kan bruges i komponenter, der anvender denne hook
}
