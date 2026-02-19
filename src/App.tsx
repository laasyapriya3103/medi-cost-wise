/**
 * App.tsx
 * Main application router for MediCompare
 * Manages global state: selectedCity, treatment search params, hospital results
 */

import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Pages
import LoginPage from "./pages/LoginPage";
import LocationPage from "./pages/LocationPage";
import TreatmentSearchPage from "./pages/TreatmentSearchPage";
import HospitalListPage from "./pages/HospitalListPage";
import HospitalDetailsPage from "./pages/HospitalDetailsPage";
import NotFound from "./pages/NotFound";

// Data types
import { searchHospitals, Hospital, Treatment } from "./data/hospitalData";

interface HospitalResult extends Hospital {
  treatment: Treatment;
}

const queryClient = new QueryClient();

/**
 * AppRoutes handles all routing and shared state.
 * Must be inside BrowserRouter to use useNavigate.
 */
function AppRoutes() {
  const navigate = useNavigate();

  // ── Shared state ──────────────────────────────────────────────────────────
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedTreatment, setSelectedTreatment] = useState<string>("");
  const [minBudget, setMinBudget] = useState<number>(500);
  const [maxBudget, setMaxBudget] = useState<number>(5000);
  const [searchResults, setSearchResults] = useState<HospitalResult[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<HospitalResult | null>(null);

  /**
   * Called from TreatmentSearchPage when user clicks Search.
   * Filters hospitals and navigates to results.
   */
  const handleSearch = (treatment: string, min: number, max: number) => {
    setSelectedTreatment(treatment);
    setMinBudget(min);
    setMaxBudget(max);
    const results = searchHospitals(selectedCity, treatment, min, max);
    setSearchResults(results);
    navigate("/hospitals");
  };

  /**
   * Called from HospitalListPage when user clicks "View Details".
   * Stores hospital and navigates to detail page.
   */
  const handleViewDetails = (hospital: HospitalResult) => {
    setSelectedHospital(hospital);
    navigate(`/hospital/${hospital.id}`);
  };

  return (
    <Routes>
      {/* Step 1: Login */}
      <Route path="/" element={<LoginPage />} />

      {/* Step 2: Location selection */}
      <Route
        path="/location"
        element={
          <LocationPage
            onCitySelect={setSelectedCity}
            selectedCity={selectedCity}
          />
        }
      />

      {/* Step 3: Treatment search — requires city */}
      <Route
        path="/search"
        element={
          selectedCity ? (
            <TreatmentSearchPage
              selectedCity={selectedCity}
              onSearch={handleSearch}
              initialTreatment={selectedTreatment}
              initialMin={minBudget}
              initialMax={maxBudget}
            />
          ) : (
            <Navigate to="/location" replace />
          )
        }
      />

      {/* Step 4: Hospital list results */}
      <Route
        path="/hospitals"
        element={
          <HospitalListPage
            results={searchResults}
            selectedCity={selectedCity}
            selectedTreatment={selectedTreatment}
            minBudget={minBudget}
            maxBudget={maxBudget}
            onViewDetails={handleViewDetails}
          />
        }
      />

      {/* Step 5: Hospital details — requires selected hospital */}
      <Route
        path="/hospital/:id"
        element={
          selectedHospital ? (
            <HospitalDetailsPage hospital={selectedHospital} />
          ) : (
            <Navigate to="/hospitals" replace />
          )
        }
      />

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
