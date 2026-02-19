/**
 * LoginPage.tsx
 * Step 1 of MediCompare flow
 * Handles phone number input and simulated OTP verification
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { validatePhone } from "@/data/hospitalData";
import hospitalHero from "@/assets/hospital-hero.jpg";

// Simulated OTP for demo purposes (in real app, this would be sent via SMS)
const SIMULATED_OTP = "1234";

type Step = "phone" | "otp" | "success";

const LoginPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle phone number submission
  const handlePhoneSubmit = () => {
    setPhoneError("");
    if (!phone) {
      setPhoneError("Please enter your phone number.");
      return;
    }
    if (!validatePhone(phone)) {
      setPhoneError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 1000);
  };

  // Handle individual OTP digit input
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only digits
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only last character
    setOtp(newOtp);
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle OTP backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Verify OTP
  const handleOtpVerify = () => {
    setOtpError("");
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      setOtpError("Please enter the complete 4-digit OTP.");
      return;
    }
    if (enteredOtp !== SIMULATED_OTP) {
      setOtpError(`Incorrect OTP. (Hint: Use ${SIMULATED_OTP} for demo)`);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
      // Navigate to location page after short celebration
      setTimeout(() => navigate("/location"), 1500);
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={hospitalHero}
          alt="MediCompare Healthcare"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 hero-gradient opacity-80" />
        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 text-primary-foreground">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-2xl">🏥</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">MediCompare</h1>
                <p className="text-primary-foreground/80 text-sm">Smart Healthcare Cost Comparison</p>
              </div>
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Find the Best<br />Healthcare at the<br />Right Price
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Compare hospitals, treatments, and costs across India's top medical centers.
            </p>
          </div>
          {/* Feature pills */}
          <div className="flex flex-col gap-3">
            {[
              { icon: "✅", text: "Compare 500+ hospitals across India" },
              { icon: "💰", text: "Transparent pricing & cost estimates" },
              { icon: "⭐", text: "Verified patient reviews & ratings" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-4 py-3">
                <span>{item.icon}</span>
                <span className="text-sm text-primary-foreground/90">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Auth form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md animate-fade-up">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <span className="text-4xl">🏥</span>
            <div>
              <h1 className="text-2xl font-bold text-primary">MediCompare</h1>
              <p className="text-muted-foreground text-sm">Smart Healthcare Cost Comparison</p>
            </div>
          </div>

          {/* Phone step */}
          {step === "phone" && (
            <div className="bg-card rounded-2xl p-8 card-shadow border border-border">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-light mb-6 mx-auto">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground text-center mb-2">Welcome Back</h2>
              <p className="text-muted-foreground text-center mb-8 text-sm">
                Enter your mobile number to continue
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 bg-muted border border-border rounded-lg text-sm font-medium text-muted-foreground">
                      🇮🇳 +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setPhoneError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && handlePhoneSubmit()}
                      placeholder="Enter 10-digit number"
                      className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
                    />
                  </div>
                  {phoneError && (
                    <p className="text-destructive text-xs mt-2">{phoneError}</p>
                  )}
                </div>

                <button
                  onClick={handlePhoneSubmit}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-xl font-semibold text-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-6">
                By continuing, you agree to our{" "}
                <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>
                {" & "}
                <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
              </p>
            </div>
          )}

          {/* OTP step */}
          {step === "otp" && (
            <div className="bg-card rounded-2xl p-8 card-shadow border border-border">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-light mb-6 mx-auto">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground text-center mb-2">Verify OTP</h2>
              <p className="text-muted-foreground text-center mb-1 text-sm">
                Enter the 4-digit code sent to
              </p>
              <p className="text-primary font-semibold text-center mb-8 text-sm">
                +91 {phone}
              </p>

              {/* Demo hint */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg px-4 py-2 mb-6 text-center">
                <p className="text-xs text-accent font-medium">
                  🔔 Demo OTP: <span className="font-bold tracking-widest">1234</span>
                </p>
              </div>

              {/* OTP inputs */}
              <div className="flex gap-3 justify-center mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-14 h-14 text-center text-xl font-bold border-2 border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all otp-active"
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-destructive text-xs text-center mb-4">{otpError}</p>
              )}

              <button
                onClick={handleOtpVerify}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-xl font-semibold text-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Verify & Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                onClick={() => { setStep("phone"); setOtp(["", "", "", ""]); setOtpError(""); }}
                className="w-full mt-3 text-sm text-muted-foreground hover:text-primary transition-colors py-2"
              >
                ← Change Number
              </button>
            </div>
          )}

          {/* Success step */}
          {step === "success" && (
            <div className="bg-card rounded-2xl p-8 card-shadow border border-border text-center animate-scale-in">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-6 mx-auto">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Verified! 🎉</h2>
              <p className="text-muted-foreground text-sm">
                Login successful. Redirecting you to MediCompare...
              </p>
              <div className="mt-6 flex justify-center">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
