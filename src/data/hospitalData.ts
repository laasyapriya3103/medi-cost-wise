/**
 * MediCompare - Dummy Data Layer
 * Simulates a backend database with hospitals, doctors, treatments, and reviews
 * In a real application, this would be fetched from REST API endpoints
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Hospital {
  id: string;
  hospital_name: string;
  image: string;
  address: string;
  city: string;
  rating: number;
  reviews_count: number;
  timings: string;
  contact_number: string;
  specialties: string[];
  established: string;
  beds: number;
}

export interface Doctor {
  id: string;
  doctor_name: string;
  specialization: string;
  qualification: string;
  experience: string;
  hospital_id: string;
  image?: string;
}

export interface Treatment {
  id: string;
  treatment_name: string;
  cost: number;
  consultation_fee: number;
  hospital_id: string;
  duration: string;
  description: string;
}

export interface Review {
  id: string;
  patient_name: string;
  rating: number;
  comment: string;
  hospital_id: string;
  date: string;
  verified: boolean;
}

export interface User {
  id: string;
  phone_number: string;
}

// ─── Cities ──────────────────────────────────────────────────────────────────

export const CITIES = [
  "Hyderabad",
  "Bangalore",
  "Chennai",
  "Mumbai",
  "Delhi",
  "Pune",
  "Kolkata",
  "Ahmedabad",
];

// ─── Treatment Names ──────────────────────────────────────────────────────────

export const TREATMENT_NAMES = [
  "Dental Treatment",
  "Heart Surgery",
  "Eye Checkup",
  "Orthopedic Treatment",
  "General Consultation",
  "Cancer Treatment",
  "Kidney Treatment",
  "Spine Surgery",
  "Maternity & Delivery",
  "Physiotherapy",
];

// ─── Hospitals ────────────────────────────────────────────────────────────────

export const HOSPITALS: Hospital[] = [
  {
    id: "H001",
    hospital_name: "Apollo Hospital",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80",
    address: "Jubilee Hills, Road No. 72, Hyderabad",
    city: "Hyderabad",
    rating: 4.7,
    reviews_count: 245,
    timings: "24/7 Emergency | OPD: 8:00 AM – 8:00 PM",
    contact_number: "+91-40-2360-7777",
    specialties: ["Cardiology", "Oncology", "Orthopedics", "Neurology"],
    established: "1996",
    beds: 500,
  },
  {
    id: "H002",
    hospital_name: "Yashoda Hospital",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
    address: "Raj Bhavan Road, Secunderabad, Hyderabad",
    city: "Hyderabad",
    rating: 4.5,
    reviews_count: 180,
    timings: "24/7 Emergency | OPD: 9:00 AM – 7:00 PM",
    contact_number: "+91-40-4567-4567",
    specialties: ["Gastroenterology", "Nephrology", "Cardiology", "General Surgery"],
    established: "2001",
    beds: 350,
  },
  {
    id: "H003",
    hospital_name: "KIMS Hospital",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80",
    address: "1-8-31/1, Minister Road, Kondapur, Hyderabad",
    city: "Hyderabad",
    rating: 4.3,
    reviews_count: 150,
    timings: "24/7 Emergency | OPD: 8:30 AM – 7:30 PM",
    contact_number: "+91-40-4488-5000",
    specialties: ["Orthopedics", "Spine Surgery", "Dental", "Pediatrics"],
    established: "2004",
    beds: 400,
  },
  {
    id: "H004",
    hospital_name: "Care Hospital",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80",
    address: "Road No. 1, Banjara Hills, Hyderabad",
    city: "Hyderabad",
    rating: 4.6,
    reviews_count: 210,
    timings: "24/7 Emergency | OPD: 8:00 AM – 9:00 PM",
    contact_number: "+91-40-3041-8888",
    specialties: ["Cancer Care", "Cardiology", "Transplant", "General Medicine"],
    established: "1998",
    beds: 450,
  },
  {
    id: "H005",
    hospital_name: "Manipal Hospital",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
    address: "Old Airport Road, HAL Area, Bangalore",
    city: "Bangalore",
    rating: 4.8,
    reviews_count: 320,
    timings: "24/7 Emergency | OPD: 8:00 AM – 8:00 PM",
    contact_number: "+91-80-2502-4444",
    specialties: ["Heart Surgery", "Neurosciences", "Transplant", "Oncology"],
    established: "1991",
    beds: 650,
  },
  {
    id: "H006",
    hospital_name: "Fortis Hospital",
    image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=600&q=80",
    address: "Bannerghatta Road, Bangalore",
    city: "Bangalore",
    rating: 4.4,
    reviews_count: 195,
    timings: "24/7 Emergency | OPD: 9:00 AM – 8:00 PM",
    contact_number: "+91-80-6621-4444",
    specialties: ["Orthopedics", "Dental", "Eye Care", "Bariatrics"],
    established: "2006",
    beds: 300,
  },
  {
    id: "H007",
    hospital_name: "Gleneagles Global Hospital",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80",
    address: "439, Cheran Nagar, Perumbakkam, Chennai",
    city: "Chennai",
    rating: 4.6,
    reviews_count: 230,
    timings: "24/7 Emergency | OPD: 8:00 AM – 8:00 PM",
    contact_number: "+91-44-4477-7000",
    specialties: ["Liver Transplant", "Cardiology", "Orthopedics", "Urology"],
    established: "1999",
    beds: 420,
  },
  {
    id: "H008",
    hospital_name: "Kokilaben Hospital",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&q=80",
    address: "Rao Saheb Achutrao Patwardhan Marg, Mumbai",
    city: "Mumbai",
    rating: 4.9,
    reviews_count: 410,
    timings: "24/7 Emergency | OPD: 8:00 AM – 10:00 PM",
    contact_number: "+91-22-3069-6969",
    specialties: ["Oncology", "Heart Surgery", "Neurology", "Robotic Surgery"],
    established: "2009",
    beds: 750,
  },
];

// ─── Doctors ──────────────────────────────────────────────────────────────────

export const DOCTORS: Doctor[] = [
  {
    id: "D001",
    doctor_name: "Dr. Rajesh Kumar",
    specialization: "Cardiologist",
    qualification: "MBBS, MD Cardiology, DM (Cardiology)",
    experience: "12 Years",
    hospital_id: "H001",
  },
  {
    id: "D002",
    doctor_name: "Dr. Priya Sharma",
    specialization: "Orthopedic Surgeon",
    qualification: "MBBS, MS Orthopedics",
    experience: "9 Years",
    hospital_id: "H001",
  },
  {
    id: "D003",
    doctor_name: "Dr. Suresh Rao",
    specialization: "Gastroenterologist",
    qualification: "MBBS, MD, DM Gastroenterology",
    experience: "15 Years",
    hospital_id: "H002",
  },
  {
    id: "D004",
    doctor_name: "Dr. Anitha Reddy",
    specialization: "General Physician",
    qualification: "MBBS, MD General Medicine",
    experience: "8 Years",
    hospital_id: "H002",
  },
  {
    id: "D005",
    doctor_name: "Dr. Vikram Nair",
    specialization: "Spine Surgeon",
    qualification: "MBBS, MS Orthopedics, Fellowship Spine",
    experience: "11 Years",
    hospital_id: "H003",
  },
  {
    id: "D006",
    doctor_name: "Dr. Meena Patel",
    specialization: "Dentist",
    qualification: "BDS, MDS Oral Surgery",
    experience: "7 Years",
    hospital_id: "H003",
  },
  {
    id: "D007",
    doctor_name: "Dr. Arun Mehta",
    specialization: "Oncologist",
    qualification: "MBBS, MD, DM Medical Oncology",
    experience: "18 Years",
    hospital_id: "H004",
  },
  {
    id: "D008",
    doctor_name: "Dr. Deepa Krishnan",
    specialization: "Cardiologist",
    qualification: "MBBS, MD, DM Cardiology, FESC",
    experience: "20 Years",
    hospital_id: "H005",
  },
  {
    id: "D009",
    doctor_name: "Dr. Ravi Balachandran",
    specialization: "Ophthalmologist",
    qualification: "MBBS, MS Ophthalmology, FRCS",
    experience: "14 Years",
    hospital_id: "H006",
  },
  {
    id: "D010",
    doctor_name: "Dr. Sanjay Iyer",
    specialization: "Hepatologist",
    qualification: "MBBS, MD, DM Hepatology",
    experience: "16 Years",
    hospital_id: "H007",
  },
  {
    id: "D011",
    doctor_name: "Dr. Kavitha Menon",
    specialization: "Neurosurgeon",
    qualification: "MBBS, MS, MCh Neurosurgery",
    experience: "13 Years",
    hospital_id: "H008",
  },
];

// ─── Treatments ───────────────────────────────────────────────────────────────

export const TREATMENTS: Treatment[] = [
  // Apollo (H001)
  { id: "T001", treatment_name: "Heart Surgery", cost: 3000, consultation_fee: 500, hospital_id: "H001", duration: "4-6 hours", description: "Advanced cardiac surgical procedures including bypass, valve replacement, and angioplasty." },
  { id: "T002", treatment_name: "Orthopedic Treatment", cost: 2500, consultation_fee: 500, hospital_id: "H001", duration: "2-3 hours", description: "Joint replacement, fracture repair, and sports injury management." },
  { id: "T003", treatment_name: "General Consultation", cost: 800, consultation_fee: 500, hospital_id: "H001", duration: "30 min", description: "Comprehensive health assessment by senior consultants." },
  { id: "T004", treatment_name: "Dental Treatment", cost: 1500, consultation_fee: 500, hospital_id: "H001", duration: "1-2 hours", description: "Full dental care including root canal, implants, and orthodontics." },
  { id: "T005", treatment_name: "Eye Checkup", cost: 1200, consultation_fee: 500, hospital_id: "H001", duration: "1 hour", description: "Comprehensive eye examination with advanced diagnostic tools." },
  { id: "T006", treatment_name: "Cancer Treatment", cost: 8000, consultation_fee: 500, hospital_id: "H001", duration: "Varies", description: "Oncology consultations and chemotherapy sessions." },

  // Yashoda (H002)
  { id: "T007", treatment_name: "General Consultation", cost: 700, consultation_fee: 400, hospital_id: "H002", duration: "30 min", description: "Expert general health consultation." },
  { id: "T008", treatment_name: "Heart Surgery", cost: 2500, consultation_fee: 400, hospital_id: "H002", duration: "3-5 hours", description: "Cardiac care with expert cardiologists." },
  { id: "T009", treatment_name: "Kidney Treatment", cost: 3500, consultation_fee: 400, hospital_id: "H002", duration: "Varies", description: "Dialysis, kidney stones, and renal care." },
  { id: "T010", treatment_name: "Orthopedic Treatment", cost: 2000, consultation_fee: 400, hospital_id: "H002", duration: "2-3 hours", description: "Joint and bone treatment by experienced orthopedic team." },

  // KIMS (H003)
  { id: "T011", treatment_name: "Orthopedic Treatment", cost: 2200, consultation_fee: 350, hospital_id: "H003", duration: "2-4 hours", description: "Minimally invasive orthopedic procedures." },
  { id: "T012", treatment_name: "Dental Treatment", cost: 1200, consultation_fee: 350, hospital_id: "H003", duration: "1-2 hours", description: "Complete dental solutions." },
  { id: "T013", treatment_name: "Spine Surgery", cost: 4000, consultation_fee: 350, hospital_id: "H003", duration: "3-5 hours", description: "Advanced spinal decompression and fusion surgeries." },
  { id: "T014", treatment_name: "General Consultation", cost: 600, consultation_fee: 350, hospital_id: "H003", duration: "30 min", description: "Multi-specialty general consultations." },

  // Care (H004)
  { id: "T015", treatment_name: "Cancer Treatment", cost: 9000, consultation_fee: 450, hospital_id: "H004", duration: "Varies", description: "State-of-the-art cancer diagnosis and treatment." },
  { id: "T016", treatment_name: "Heart Surgery", cost: 2800, consultation_fee: 450, hospital_id: "H004", duration: "4-6 hours", description: "Expert cardiac care with advanced technology." },
  { id: "T017", treatment_name: "General Consultation", cost: 750, consultation_fee: 450, hospital_id: "H004", duration: "30 min", description: "Multi-specialist consultation services." },

  // Manipal (H005)
  { id: "T018", treatment_name: "Heart Surgery", cost: 4500, consultation_fee: 700, hospital_id: "H005", duration: "4-7 hours", description: "World-class cardiac surgery with latest robotics." },
  { id: "T019", treatment_name: "Cancer Treatment", cost: 10000, consultation_fee: 700, hospital_id: "H005", duration: "Varies", description: "Comprehensive cancer care center." },
  { id: "T020", treatment_name: "General Consultation", cost: 1000, consultation_fee: 700, hospital_id: "H005", duration: "45 min", description: "Premium specialist consultations." },
  { id: "T021", treatment_name: "Orthopedic Treatment", cost: 3500, consultation_fee: 700, hospital_id: "H005", duration: "2-4 hours", description: "Advanced joint replacement and arthroscopy." },

  // Fortis (H006)
  { id: "T022", treatment_name: "Eye Checkup", cost: 800, consultation_fee: 400, hospital_id: "H006", duration: "1 hour", description: "Laser eye treatment and cataract surgery." },
  { id: "T023", treatment_name: "Dental Treatment", cost: 1000, consultation_fee: 400, hospital_id: "H006", duration: "1-2 hours", description: "Advanced dental care solutions." },
  { id: "T024", treatment_name: "Orthopedic Treatment", cost: 2800, consultation_fee: 400, hospital_id: "H006", duration: "2-3 hours", description: "Sports medicine and joint replacement." },

  // Gleneagles (H007)
  { id: "T025", treatment_name: "Heart Surgery", cost: 3200, consultation_fee: 500, hospital_id: "H007", duration: "4-6 hours", description: "Comprehensive cardiac care and surgery." },
  { id: "T026", treatment_name: "Kidney Treatment", cost: 4000, consultation_fee: 500, hospital_id: "H007", duration: "Varies", description: "Advanced kidney care and transplant services." },
  { id: "T027", treatment_name: "General Consultation", cost: 800, consultation_fee: 500, hospital_id: "H007", duration: "30 min", description: "Expert multi-specialty consultations." },

  // Kokilaben (H008)
  { id: "T028", treatment_name: "Cancer Treatment", cost: 12000, consultation_fee: 800, hospital_id: "H008", duration: "Varies", description: "Cutting-edge oncology with proton therapy." },
  { id: "T029", treatment_name: "Heart Surgery", cost: 5000, consultation_fee: 800, hospital_id: "H008", duration: "5-8 hours", description: "Robotic cardiac surgery and complex procedures." },
  { id: "T030", treatment_name: "Spine Surgery", cost: 5500, consultation_fee: 800, hospital_id: "H008", duration: "4-6 hours", description: "Minimally invasive spine procedures." },
  { id: "T031", treatment_name: "General Consultation", cost: 1200, consultation_fee: 800, hospital_id: "H008", duration: "45 min", description: "Premium specialist consultation." },
  { id: "T032", treatment_name: "Maternity & Delivery", cost: 3500, consultation_fee: 800, hospital_id: "H008", duration: "Varies", description: "Complete maternity care with NICU support." },
];

// ─── Reviews ──────────────────────────────────────────────────────────────────

export const REVIEWS: Review[] = [
  // Apollo
  { id: "R001", patient_name: "Ravi Kumar", rating: 5, comment: "Very good hospital and experienced doctors. The staff was incredibly helpful and the facilities are world-class.", hospital_id: "H001", date: "2024-12-10", verified: true },
  { id: "R002", patient_name: "Sneha Reddy", rating: 4, comment: "Good treatment and friendly staff. Waiting time could be reduced but overall excellent experience.", hospital_id: "H001", date: "2024-11-22", verified: true },
  { id: "R003", patient_name: "Mohammed Ali", rating: 5, comment: "My heart surgery was successful. Dr. Rajesh Kumar is truly one of the best cardiologists I've met.", hospital_id: "H001", date: "2024-10-05", verified: true },
  { id: "R004", patient_name: "Lakshmi Devi", rating: 4, comment: "Clean, professional, and modern facility. The pre-op and post-op care was exceptional.", hospital_id: "H001", date: "2024-09-18", verified: false },

  // Yashoda
  { id: "R005", patient_name: "Arun Prasad", rating: 5, comment: "Excellent kidney treatment. The nephrology team is outstanding and very caring.", hospital_id: "H002", date: "2024-12-01", verified: true },
  { id: "R006", patient_name: "Kavitha Singh", rating: 4, comment: "Good hospital. Doctors are knowledgeable and the nursing staff is very supportive.", hospital_id: "H002", date: "2024-11-14", verified: true },
  { id: "R007", patient_name: "Suresh Babu", rating: 4, comment: "Comfortable rooms and attentive care. Had my bypass done here and recovered quickly.", hospital_id: "H002", date: "2024-10-30", verified: false },

  // KIMS
  { id: "R008", patient_name: "Ramesh Naidu", rating: 4, comment: "Very good orthopedic department. My knee replacement surgery went smoothly.", hospital_id: "H003", date: "2024-12-05", verified: true },
  { id: "R009", patient_name: "Geeta Rao", rating: 5, comment: "Outstanding dental treatment. Pain-free and very professional. Highly recommend!", hospital_id: "H003", date: "2024-11-20", verified: true },
  { id: "R010", patient_name: "Vijay Kumar", rating: 3, comment: "Good doctors but long waiting times. The spine surgery results are great though.", hospital_id: "H003", date: "2024-10-15", verified: false },

  // Care Hospital
  { id: "R011", patient_name: "Priya Nair", rating: 5, comment: "Best cancer care in Hyderabad. The oncology team is compassionate and highly skilled.", hospital_id: "H004", date: "2024-12-08", verified: true },
  { id: "R012", patient_name: "Ashok Sharma", rating: 4, comment: "World-class facilities. The cardiac care unit is exceptional with dedicated nurses.", hospital_id: "H004", date: "2024-11-18", verified: true },

  // Manipal
  { id: "R013", patient_name: "Deepa Krishnan", rating: 5, comment: "Manipal is truly world-class. My cardiac surgery with robotic assistance was flawless.", hospital_id: "H005", date: "2024-12-12", verified: true },
  { id: "R014", patient_name: "Hari Prasad", rating: 5, comment: "Best hospital in Bangalore. The doctors and technology are simply unmatched.", hospital_id: "H005", date: "2024-11-25", verified: true },

  // Fortis
  { id: "R015", patient_name: "Seema Joshi", rating: 4, comment: "Had cataract surgery and the results are wonderful. Very professional team.", hospital_id: "H006", date: "2024-12-03", verified: true },
  { id: "R016", patient_name: "Rajendra Gupta", rating: 4, comment: "Good orthopedic department. My hip replacement recovery was smooth and fast.", hospital_id: "H006", date: "2024-11-10", verified: false },

  // Gleneagles
  { id: "R017", patient_name: "Sunita Menon", rating: 5, comment: "Excellent liver transplant center. The team is dedicated and very experienced.", hospital_id: "H007", date: "2024-12-15", verified: true },
  { id: "R018", patient_name: "Arjun Das", rating: 4, comment: "Very good cardiac care. Felt safe and well-cared for throughout my treatment.", hospital_id: "H007", date: "2024-11-28", verified: true },

  // Kokilaben
  { id: "R019", patient_name: "Meenakshi Iyer", rating: 5, comment: "Kokilaben is the absolute best. The cancer treatment with proton therapy saved my life.", hospital_id: "H008", date: "2024-12-18", verified: true },
  { id: "R020", patient_name: "Prakash Bhat", rating: 5, comment: "Robotic surgery was painless and recovery was fast. Unbeatable expertise here.", hospital_id: "H008", date: "2024-12-02", verified: true },
];

// ─── API Simulation Functions ─────────────────────────────────────────────────

/**
 * Simulates POST /api/login
 * Validates phone number format
 */
export function validatePhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone);
}

/**
 * Simulates GET /api/cities
 */
export function getCities(): string[] {
  return CITIES;
}

/**
 * Simulates GET /api/treatments
 */
export function getTreatmentNames(): string[] {
  return TREATMENT_NAMES;
}

/**
 * Simulates POST /api/hospitals/search
 * Filters hospitals by city, treatment, and budget range
 */
export function searchHospitals(
  city: string,
  treatmentName: string,
  minBudget: number,
  maxBudget: number
): Array<Hospital & { treatment: Treatment }> {
  // Find treatments matching the name and within budget
  const matchingTreatments = TREATMENTS.filter(
    (t) =>
      t.treatment_name === treatmentName &&
      t.cost >= minBudget &&
      t.cost <= maxBudget
  );

  // Map hospital IDs from matching treatments
  const results: Array<Hospital & { treatment: Treatment }> = [];

  matchingTreatments.forEach((treatment) => {
    const hospital = HOSPITALS.find(
      (h) =>
        h.id === treatment.hospital_id &&
        h.city.toLowerCase() === city.toLowerCase()
    );
    if (hospital) {
      results.push({ ...hospital, treatment });
    }
  });

  // Sort by rating descending
  return results.sort((a, b) => b.rating - a.rating);
}

/**
 * Simulates GET /api/hospital/:id
 */
export function getHospitalById(id: string): Hospital | undefined {
  return HOSPITALS.find((h) => h.id === id);
}

/**
 * Simulates GET /api/doctors/:hospitalId
 */
export function getDoctorsByHospital(hospitalId: string): Doctor[] {
  return DOCTORS.filter((d) => d.hospital_id === hospitalId);
}

/**
 * Simulates GET /api/reviews/:hospitalId
 */
export function getReviewsByHospital(hospitalId: string): Review[] {
  return REVIEWS.filter((r) => r.hospital_id === hospitalId);
}

/**
 * Simulates GET /api/treatments/:hospitalId
 */
export function getTreatmentsByHospital(hospitalId: string): Treatment[] {
  return TREATMENTS.filter((t) => t.hospital_id === hospitalId);
}
