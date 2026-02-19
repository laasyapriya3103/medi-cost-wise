/**
 * HospitalDetailsPage.tsx
 * Step 5 of MediCompare flow
 * Shows complete hospital, doctor, treatment, and review information
 */

import { useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Phone,
  Clock,
  ArrowLeft,
  User,
  GraduationCap,
  Stethoscope,
  IndianRupee,
  Calendar,
  CheckCircle,
  Building2,
  BedDouble,
} from "lucide-react";
import { Hospital, Treatment, getDoctorsByHospital, getReviewsByHospital } from "@/data/hospitalData";

interface HospitalDetailsPageProps {
  hospital: Hospital & { treatment: Treatment };
}

// Full star rating display
const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) => {
  const starSize = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${
            star <= Math.floor(rating)
              ? "fill-star text-star"
              : star - 0.5 <= rating
              ? "fill-star/50 text-star"
              : "fill-muted text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
};

// Section wrapper
const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-2xl overflow-hidden card-shadow mb-5">
    <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/30">
      <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center text-primary">
        {icon}
      </div>
      <h2 className="font-bold text-foreground text-base">{title}</h2>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

// Info row
const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | React.ReactNode }) => (
  <div className="flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0">
    <div className="w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center text-primary shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  </div>
);

const HospitalDetailsPage = ({ hospital }: HospitalDetailsPageProps) => {
  const navigate = useNavigate();
  const doctors = getDoctorsByHospital(hospital.id);
  const reviews = getReviewsByHospital(hospital.id);

  // Calculate average review rating
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : hospital.rating;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero image + header */}
      <div className="relative h-64 md:h-80">
        <img
          src={hospital.image}
          alt={hospital.hospital_name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80";
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate("/hospitals")}
          className="absolute top-4 left-4 flex items-center gap-2 bg-card/80 backdrop-blur-sm text-foreground hover:bg-card rounded-full px-4 py-2 text-sm font-medium transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to List
        </button>

        {/* Hospital name on image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
              {hospital.hospital_name}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <StarRating rating={hospital.rating} size="sm" />
                <span className="text-primary-foreground font-semibold text-sm">
                  {hospital.rating}
                </span>
              </div>
              <span className="text-primary-foreground/70 text-sm">
                ({hospital.reviews_count} reviews)
              </span>
              <span className="bg-primary text-primary-foreground text-xs px-2.5 py-1 rounded-full font-medium">
                📍 {hospital.city}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 pb-24">

        {/* Hospital Information */}
        <Section title="Hospital Information" icon={<Building2 className="w-4 h-4" />}>
          <InfoRow icon={<MapPin className="w-4 h-4" />} label="Full Address" value={hospital.address} />
          <InfoRow icon={<Clock className="w-4 h-4" />} label="Timings" value={hospital.timings} />
          <InfoRow icon={<Phone className="w-4 h-4" />} label="Contact Number" value={hospital.contact_number} />
          <InfoRow icon={<BedDouble className="w-4 h-4" />} label="Total Beds" value={`${hospital.beds} beds`} />
          <InfoRow icon={<Building2 className="w-4 h-4" />} label="Established" value={hospital.established} />
          <div className="pt-3">
            <p className="text-xs text-muted-foreground mb-2">Specialties</p>
            <div className="flex flex-wrap gap-2">
              {hospital.specialties.map((s) => (
                <span key={s} className="text-xs bg-primary-light text-primary border border-primary/20 px-3 py-1 rounded-full font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Section>

        {/* Treatment Information */}
        <Section title="Treatment Information" icon={<Stethoscope className="w-4 h-4" />}>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Consultation Fee</p>
              <p className="text-xl font-bold text-primary">
                ₹{hospital.treatment.consultation_fee.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-primary-light rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Treatment Cost</p>
              <p className="text-xl font-bold text-primary">
                ₹{hospital.treatment.cost.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <InfoRow icon={<Stethoscope className="w-4 h-4" />} label="Treatment Name" value={hospital.treatment.treatment_name} />
          <InfoRow icon={<Clock className="w-4 h-4" />} label="Duration" value={hospital.treatment.duration} />
          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-1">Description</p>
            <p className="text-sm text-foreground leading-relaxed">{hospital.treatment.description}</p>
          </div>
        </Section>

        {/* Doctor Information */}
        {doctors.length > 0 && (
          <Section title="Our Doctors" icon={<User className="w-4 h-4" />}>
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                  {/* Doctor avatar */}
                  <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center shrink-0">
                    <User className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-sm">{doctor.doctor_name}</h3>
                    <p className="text-primary text-xs font-medium mb-2">{doctor.specialization}</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                        <span>{doctor.qualification}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>{doctor.experience} Experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <Section title={`Patient Reviews (${reviews.length})`} icon={<Star className="w-4 h-4" />}>
            {/* Average rating summary */}
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl mb-5">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{avgRating.toFixed(1)}</p>
                <StarRating rating={avgRating} size="sm" />
                <p className="text-xs text-muted-foreground mt-1">{reviews.length} reviews</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter((r) => Math.round(r.rating) === star).length;
                  const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-4">{star}</span>
                      <Star className="w-3 h-3 fill-star text-star" />
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-star rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-6">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual reviews */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-border/50 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary text-sm font-bold">
                        {review.patient_name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">{review.patient_name}</p>
                          {review.verified && (
                            <span title="Verified Patient">
                              <CheckCircle className="w-3.5 h-3.5 text-accent" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-10">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}
      </main>

      {/* Sticky action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border px-4 py-4 z-50">
        <div className="max-w-3xl mx-auto flex gap-3">
          <button
            onClick={() => navigate("/hospitals")}
            className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary-light rounded-xl py-3 text-sm font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </button>
          <button
            onClick={() => alert(`Appointment request sent to ${hospital.hospital_name}!\n\nIn a real app, this would open a booking form.\n\nContact: ${hospital.contact_number}`)}
            className="flex-[2] flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3 text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
          >
            <Calendar className="w-4 h-4" />
            Click for Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailsPage;
