/**
 * TreatmentSearchPage.tsx
 * Step 3 of MediCompare flow
 * User selects treatment type and budget range to search hospitals
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Stethoscope, IndianRupee, ArrowRight, MapPin, ChevronDown } from "lucide-react";
import { getTreatmentNames } from "@/data/hospitalData";

interface TreatmentSearchPageProps {
  selectedCity: string;
  onSearch: (treatment: string, minBudget: number, maxBudget: number) => void;
  initialTreatment?: string;
  initialMin?: number;
  initialMax?: number;
}

const TREATMENT_ICONS: Record<string, string> = {
  "Dental Treatment": "🦷",
  "Heart Surgery": "❤️",
  "Eye Checkup": "👁️",
  "Orthopedic Treatment": "🦴",
  "General Consultation": "🩺",
  "Cancer Treatment": "🎗️",
  "Kidney Treatment": "🫘",
  "Spine Surgery": "🦾",
  "Maternity & Delivery": "👶",
  "Physiotherapy": "💪",
};

const BUDGET_PRESETS = [
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1K – ₹3K", min: 1000, max: 3000 },
  { label: "₹3K – ₹5K", min: 3000, max: 5000 },
  { label: "₹5K – ₹10K", min: 5000, max: 10000 },
  { label: "₹10K+", min: 10000, max: 999999 },
];

const TreatmentSearchPage = ({
  selectedCity,
  onSearch,
  initialTreatment = "",
  initialMin = 500,
  initialMax = 5000,
}: TreatmentSearchPageProps) => {
  const navigate = useNavigate();
  const treatments = getTreatmentNames();

  const [selectedTreatment, setSelectedTreatment] = useState(initialTreatment);
  const [minBudget, setMinBudget] = useState(initialMin);
  const [maxBudget, setMaxBudget] = useState(initialMax);
  const [treatmentSearch, setTreatmentSearch] = useState(initialTreatment);
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState<{ treatment?: string; budget?: string }>({});

  // Filter treatments
  const filteredTreatments = treatments.filter((t) =>
    t.toLowerCase().includes(treatmentSearch.toLowerCase())
  );

  const handleTreatmentSelect = (t: string) => {
    setSelectedTreatment(t);
    setTreatmentSearch(t);
    setShowDropdown(false);
    setErrors((prev) => ({ ...prev, treatment: undefined }));
  };

  const handleBudgetPreset = (min: number, max: number) => {
    setMinBudget(min);
    setMaxBudget(max);
    setErrors((prev) => ({ ...prev, budget: undefined }));
  };

  const handleSearch = () => {
    const newErrors: { treatment?: string; budget?: string } = {};
    if (!selectedTreatment) newErrors.treatment = "Please select a treatment type.";
    if (minBudget >= maxBudget) newErrors.budget = "Max budget must be greater than min budget.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSearch(selectedTreatment, minBudget, maxBudget);
    navigate("/hospitals");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="hero-gradient px-6 pt-10 pb-20">
        <div className="max-w-2xl mx-auto text-primary-foreground">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-6">
            <button onClick={() => navigate("/location")} className="hover:text-primary-foreground transition-colors">
              Location
            </button>
            <span>›</span>
            <span className="text-primary-foreground font-medium">Treatment Search</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Find Your Treatment</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Searching in <strong>{selectedCity}</strong></span>
          </div>
        </div>
      </header>

      {/* Search Form */}
      <main className="max-w-2xl mx-auto px-4 -mt-12 pb-12">
        <div className="bg-card rounded-2xl card-shadow border border-border overflow-hidden animate-fade-up">
          <div className="p-6 space-y-6">

            {/* Treatment selection */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Select Treatment Type
              </label>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                <input
                  type="text"
                  value={treatmentSearch}
                  onChange={(e) => {
                    setTreatmentSearch(e.target.value);
                    setSelectedTreatment("");
                    setShowDropdown(true);
                    setErrors((p) => ({ ...p, treatment: undefined }));
                  }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="e.g. Dental Treatment, Heart Surgery..."
                  className="w-full pl-10 pr-10 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
                />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                {/* Dropdown */}
                {showDropdown && filteredTreatments.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-card-hover z-50 overflow-hidden max-h-60 overflow-y-auto">
                    {filteredTreatments.map((t) => (
                      <button
                        key={t}
                        onMouseDown={() => handleTreatmentSelect(t)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/60 transition-colors text-sm ${selectedTreatment === t ? "bg-primary-light text-primary font-medium" : "text-foreground"}`}
                      >
                        <span className="text-lg">{TREATMENT_ICONS[t] || "🏥"}</span>
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.treatment && (
                <p className="text-destructive text-xs mt-1">{errors.treatment}</p>
              )}

              {/* Selected treatment chip */}
              {selectedTreatment && (
                <div className="flex items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-full font-medium">
                    {TREATMENT_ICONS[selectedTreatment] || "🏥"} {selectedTreatment}
                    <button onClick={() => { setSelectedTreatment(""); setTreatmentSearch(""); }} className="hover:opacity-70">✕</button>
                  </span>
                </div>
              )}
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Budget Range (Treatment Cost)
              </label>

              {/* Budget preset chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {BUDGET_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handleBudgetPreset(preset.min, preset.max)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
                      minBudget === preset.min && maxBudget === preset.max
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Manual input */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Min Budget (₹)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      value={minBudget}
                      onChange={(e) => { setMinBudget(Number(e.target.value)); setErrors((p) => ({ ...p, budget: undefined })); }}
                      min={0}
                      className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Max Budget (₹)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      value={maxBudget}
                      onChange={(e) => { setMaxBudget(Number(e.target.value)); setErrors((p) => ({ ...p, budget: undefined })); }}
                      min={0}
                      className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
              {errors.budget && (
                <p className="text-destructive text-xs mt-2">{errors.budget}</p>
              )}
            </div>
          </div>

          {/* Search button */}
          <div className="px-6 pb-6">
            <button
              onClick={handleSearch}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 px-6 rounded-xl font-semibold hover:opacity-90 active:scale-95 transition-all text-sm"
            >
              <Search className="w-5 h-5" />
              Search Hospitals
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { icon: "🏥", label: "500+", desc: "Hospitals" },
            { icon: "👨‍⚕️", label: "2000+", desc: "Doctors" },
            { icon: "💰", label: "100%", desc: "Transparent" },
          ].map((item) => (
            <div key={item.label} className="bg-card border border-border rounded-xl p-4 text-center card-shadow">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-base font-bold text-primary">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Backdrop to close dropdown */}
      {showDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
      )}
    </div>
  );
};

export default TreatmentSearchPage;
