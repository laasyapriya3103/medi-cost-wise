/**
 * HospitalListPage.tsx
 * Step 4 of MediCompare flow
 * Displays filtered hospital cards in grid layout based on city, treatment, and budget
 */

import { useNavigate } from "react-router-dom";
import { Star, MapPin, ArrowLeft, Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import { Hospital, Treatment } from "@/data/hospitalData";

interface HospitalResult extends Hospital {
  treatment: Treatment;
}

interface HospitalListPageProps {
  results: HospitalResult[];
  selectedCity: string;
  selectedTreatment: string;
  minBudget: number;
  maxBudget: number;
  onViewDetails: (hospital: HospitalResult) => void;
}

// Star rating display component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.floor(rating)
              ? "fill-star text-star"
              : star - 0.5 <= rating
              ? "fill-star/50 text-star"
              : "fill-muted text-muted-foreground/40"
          }`}
        />
      ))}
    </div>
  );
};

// Individual hospital card
const HospitalCard = ({
  hospital,
  onViewDetails,
}: {
  hospital: HospitalResult;
  onViewDetails: (h: HospitalResult) => void;
}) => {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 group">
      {/* Hospital image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={hospital.image}
          alt={hospital.hospital_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80";
          }}
        />
        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-star text-star" />
          <span className="text-xs font-bold text-foreground">{hospital.rating}</span>
        </div>
        {/* City badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-primary/90 text-primary-foreground backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-medium">
          <MapPin className="w-3 h-3" />
          {hospital.city}
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="font-bold text-foreground text-base mb-1 line-clamp-1">
          {hospital.hospital_name}
        </h3>

        {/* Stars and reviews */}
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={hospital.rating} />
          <span className="text-xs text-muted-foreground">
            ({hospital.reviews_count} reviews)
          </span>
        </div>

        {/* Address */}
        <div className="flex items-start gap-1.5 mb-3">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground line-clamp-2">{hospital.address}</p>
        </div>

        {/* Cost info */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Consultation Fee</p>
            <p className="text-sm font-bold text-primary">
              ₹{hospital.treatment.consultation_fee.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-primary-light rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Treatment Cost</p>
            <p className="text-sm font-bold text-primary">
              ₹{hospital.treatment.cost.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* View details button */}
        <button
          onClick={() => onViewDetails(hospital)}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
        >
          View Details
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};

const HospitalListPage = ({
  results,
  selectedCity,
  selectedTreatment,
  minBudget,
  maxBudget,
  onViewDetails,
}: HospitalListPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="hero-gradient px-4 pt-8 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate("/search")}
            className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
            Hospitals Near You
          </h1>
          <p className="text-primary-foreground/80 text-sm">
            {results.length} hospitals found in {selectedCity} for{" "}
            <span className="font-semibold text-primary-foreground">{selectedTreatment}</span>
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 -mt-8 pb-12">
        {/* Filters summary card */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-6 card-shadow animate-fade-up">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Active Filters:
            </div>
            <span className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-full font-medium">
              📍 {selectedCity}
            </span>
            <span className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-medium">
              🩺 {selectedTreatment}
            </span>
            <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium">
              💰 ₹{minBudget.toLocaleString("en-IN")} – ₹{maxBudget === 999999 ? "10,000+" : maxBudget.toLocaleString("en-IN")}
            </span>
            <button
              onClick={() => navigate("/search")}
              className="ml-auto text-xs text-primary hover:underline flex items-center gap-1"
            >
              <Search className="w-3 h-3" />
              Modify Search
            </button>
          </div>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center card-shadow animate-fade-up">
            <div className="text-5xl mb-4">🏥</div>
            <h3 className="text-xl font-bold text-foreground mb-2">No Hospitals Found</h3>
            <p className="text-muted-foreground text-sm mb-6">
              No hospitals match your search criteria. Try adjusting your budget range or treatment type.
            </p>
            <button
              onClick={() => navigate("/search")}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all"
            >
              Modify Search
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4 animate-fade-up">
              Showing <span className="font-semibold text-foreground">{results.length}</span> results • Sorted by rating
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((hospital, index) => (
                <div
                  key={hospital.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <HospitalCard
                    hospital={hospital}
                    onViewDetails={onViewDetails}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default HospitalListPage;
