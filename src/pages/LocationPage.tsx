/**
 * LocationPage.tsx
 * Step 2 of MediCompare flow
 * User selects their city/location before searching for hospitals
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, Navigation, ArrowRight, ChevronRight } from "lucide-react";
import { getCities } from "@/data/hospitalData";

const CITY_ICONS: Record<string, string> = {
  Hyderabad: "🏙️",
  Bangalore: "🌆",
  Chennai: "🌇",
  Mumbai: "🌃",
  Delhi: "🏛️",
  Pune: "🌁",
  Kolkata: "🌉",
  Ahmedabad: "🏗️",
};

interface LocationPageProps {
  onCitySelect: (city: string) => void;
  selectedCity: string;
}

const LocationPage = ({ onCitySelect, selectedCity }: LocationPageProps) => {
  const navigate = useNavigate();
  const cities = getCities();
  const [searchQuery, setSearchQuery] = useState(selectedCity || "");
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState("");

  // Filter cities based on search input
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle city selection from suggestions
  const handleCitySelect = (city: string) => {
    setSearchQuery(city);
    onCitySelect(city);
    setError("");
  };

  // Simulate GPS location detection
  const handleCurrentLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      handleCitySelect("Hyderabad"); // Simulated result
    }, 1500);
  };

  // Proceed to treatment search
  const handleContinue = () => {
    const matchedCity = cities.find(
      (c) => c.toLowerCase() === searchQuery.toLowerCase()
    );
    if (!matchedCity) {
      setError("Please select a valid city from the list.");
      return;
    }
    onCitySelect(matchedCity);
    navigate("/search");
  };

  const selectedCityObj = cities.find(
    (c) => c.toLowerCase() === searchQuery.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="hero-gradient px-6 pt-12 pb-20">
        <div className="max-w-xl mx-auto text-center text-primary-foreground">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Select Your Location</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Welcome to MediCompare
          </h1>
          <p className="text-primary-foreground/80 text-base">
            Tell us where you are to find the best hospitals near you
          </p>
        </div>
      </header>

      {/* Main card - overlaps header */}
      <main className="max-w-xl mx-auto px-4 -mt-12 pb-12">
        <div className="bg-card rounded-2xl card-shadow border border-border overflow-hidden animate-fade-up">
          {/* Search input section */}
          <div className="p-6 border-b border-border">
            <label className="block text-sm font-semibold text-foreground mb-3">
              Enter City Name
            </label>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setError("");
                  if (e.target.value === "") onCitySelect("");
                }}
                placeholder="Search city (e.g. Hyderabad)"
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
              />
              {selectedCityObj && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">✓</span>
                </div>
              )}
            </div>

            {/* Current location button */}
            <button
              onClick={handleCurrentLocation}
              disabled={isLocating}
              className="w-full flex items-center justify-center gap-2 border-2 border-primary/20 text-primary hover:bg-primary-light rounded-xl py-3 text-sm font-medium transition-all disabled:opacity-60"
            >
              {isLocating ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  Detecting location...
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4" />
                  Use Current Location
                </>
              )}
            </button>

            {error && (
              <p className="text-destructive text-xs mt-3">{error}</p>
            )}
          </div>

          {/* City list */}
          <div className="p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-2">
              {searchQuery ? "Matching Cities" : "Popular Cities"}
            </p>

            {filteredCities.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No cities found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all hover:bg-muted/60 ${
                      selectedCityObj?.toLowerCase() === city.toLowerCase()
                        ? "bg-primary-light border border-primary/20"
                        : ""
                    }`}
                  >
                    <span className="text-xl">{CITY_ICONS[city] || "🌆"}</span>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${selectedCityObj?.toLowerCase() === city.toLowerCase() ? "text-primary" : "text-foreground"}`}>
                        {city}
                      </p>
                      <p className="text-xs text-muted-foreground">India</p>
                    </div>
                    {selectedCityObj?.toLowerCase() === city.toLowerCase() ? (
                      <span className="text-primary text-xs font-medium">Selected ✓</span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Continue button */}
          <div className="p-4 pt-0">
            <button
              onClick={handleContinue}
              disabled={!selectedCityObj}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 px-6 rounded-xl font-semibold text-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue to Search
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocationPage;
