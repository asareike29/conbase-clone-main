// pages/SignUp.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DemoNotice from "../components/ui/DemoNotice";
import { registerUser } from "../api";
import { useAuth } from "../context/AuthContext";

const InputField = ({ label, name, type = "text", placeholder, autoComplete, form, errors, updateField, onEnter }) => (
  <div style={{ marginBottom: "20px" }}>
    <label style={{ fontSize: "14px", fontWeight: 600, display: "block", marginBottom: "8px" }}>{label}</label>
    <input
      type={type}
      value={form[name]}
      onChange={(e) => updateField(name, e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onKeyDown={(e) => { if (e.key === "Enter") onEnter(); }}
      style={{
        width: "100%", background: "#1c1d20",
        border: `1px solid ${errors[name] ? "#f04124" : "rgba(255,255,255,0.1)"}`,
        borderRadius: "10px", padding: "14px 16px",
        fontSize: "15px", color: "white", outline: "none", transition: "border-color 0.2s",
      }}
      onFocus={(e) => { if (!errors[name]) e.target.style.borderColor = "#0052ff"; }}
      onBlur={(e) => { if (!errors[name]) e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
    />
    {errors[name] && <p style={{ color: "#f04124", fontSize: "13px", margin: "6px 0 0" }}>{errors[name]}</p>}
  </div>
);

const PasswordStrength = ({ password }) => {
  const p = password;
  const checks = [p.length >= 8, /[A-Z]/.test(p), /[0-9]/.test(p), /[^A-Za-z0-9]/.test(p)];
  const score = checks.filter(Boolean).length;
  const colors = ["#f04124", "#f04124", "#ffa500", "#05b169"];
  const labels = ["", "Weak", "Weak", "Medium", "Strong"];
  if (!p) return null;
  return (
    <div style={{ marginTop: "8px" }}>
      <div style={{ display: "flex", gap: "4px", marginBottom: "6px" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, height: "4px", borderRadius: "2px", background: i < score ? colors[score - 1] : "rgba(255,255,255,0.1)", transition: "background 0.3s" }} />
        ))}
      </div>
      <p style={{ fontSize: "12px", color: colors[score - 1] || "#8a919e", margin: 0 }}>
        {labels[score] && `Password strength: ${labels[score]}`}
      </p>
    </div>
  );
};

export default function SignUp() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", agree: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const updateField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    else if (!/(?=.*[0-9])/.test(form.password)) e.password = "Password must include a number";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    if (!form.agree) e.agree = "You must agree to the terms";
    return e;
  };

  const handleNext = () => {
    const e = validateStep1();
    setErrors(e);
    if (Object.keys(e).length === 0) setStep(2);
  };

  const handleSubmit = async () => {
    const e = validateStep2();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setLoading(true);
      try {
        const res = await registerUser({ firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password });
        if (res.token || res.user) {
          setUser(res,user);
          setStep(3);
        } else {
          setErrors({ confirmPassword: res.message || "Registration failed" });
        }
      } catch (err) {
        setErrors({ confirmPassword: "Something went wrong. Try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ background: "#0a0b0d", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "460px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Link to="/">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ display: "inline-block" }}>
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.75a6.75 6.75 0 110-13.5 6.75 6.75 0 010 13.5z" fill="#0052ff"/>
            </svg>
          </Link>
          {step < 3 && (
            <>
              <h1 style={{ fontSize: "28px", fontWeight: 800, margin: "16px 0 8px", letterSpacing: "-0.02em" }}>Create your account</h1>
              <p style={{ color: "#8a919e", margin: 0, fontSize: "15px" }}>
                {step === 1 ? "Step 1 of 2: Your information" : "Step 2 of 2: Secure your account"}
              </p>
            </>
          )}
        </div>

        {step < 3 && <DemoNotice />}

        {step < 3 && (
          <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", marginBottom: "32px", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: "2px", background: "#0052ff", width: step === 1 ? "50%" : "100%", transition: "width 0.4s ease" }} />
          </div>
        )}

        {step === 1 && (
          <div style={{ background: "#111214", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <InputField label="First name" name="firstName" placeholder="John" autoComplete="given-name"
                form={form} errors={errors} updateField={updateField} onEnter={handleNext} />
              <InputField label="Last name" name="lastName" placeholder="Smith" autoComplete="family-name"
                form={form} errors={errors} updateField={updateField} onEnter={handleNext} />
            </div>
            <InputField label="Email address" name="email" type="email" placeholder="you@example.com" autoComplete="email"
              form={form} errors={errors} updateField={updateField} onEnter={handleNext} />
            <button className="btn-primary" onClick={handleNext} style={{ width: "100%", padding: "16px", fontSize: "16px", borderRadius: "12px" }}>
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ background: "#111214", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "32px" }}>
            <div>
              <label style={{ fontSize: "14px", fontWeight: 600, display: "block", marginBottom: "8px" }}>Password</label>
              <input
                type="password" value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="Create a strong password"
                style={{ width: "100%", background: "#1c1d20", border: `1px solid ${errors.password ? "#f04124" : "rgba(255,255,255,0.1)"}`, borderRadius: "10px", padding: "14px 16px", fontSize: "15px", color: "white", outline: "none" }}
                onFocus={(e) => { if (!errors.password) e.target.style.borderColor = "#0052ff"; }}
                onBlur={(e) => { if (!errors.password) e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
              />
              <PasswordStrength password={form.password} />
              {errors.password && <p style={{ color: "#f04124", fontSize: "13px", margin: "6px 0 0" }}>{errors.password}</p>}
            </div>

            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <InputField label="Confirm password" name="confirmPassword" type="password" placeholder="Repeat your password"
                form={form} errors={errors} updateField={updateField} onEnter={handleSubmit} />
            </div>

            <label style={{ display: "flex", gap: "12px", alignItems: "flex-start", cursor: "pointer", marginBottom: "24px" }}>
              <input type="checkbox" checked={form.agree} onChange={(e) => updateField("agree", e.target.checked)}
                style={{ marginTop: "2px", width: "16px", height: "16px", flexShrink: 0 }} />
              <span style={{ fontSize: "14px", color: "#8a919e", lineHeight: 1.6 }}>
                I agree to the{" "}
                <a href="#" style={{ color: "#0052ff", textDecoration: "none" }}>User Agreement</a>,{" "}
                <a href="#" style={{ color: "#0052ff", textDecoration: "none" }}>Privacy Policy</a>, and{" "}
                <a href="#" style={{ color: "#0052ff", textDecoration: "none" }}>Cookie Policy</a>.
              </span>
            </label>
            {errors.agree && <p style={{ color: "#f04124", fontSize: "13px", margin: "-16px 0 16px" }}>{errors.agree}</p>}

            <div style={{ display: "flex", gap: "12px" }}>
              <button className="btn-secondary" onClick={() => setStep(1)} style={{ padding: "16px 24px", fontSize: "15px", flex: "0 0 auto" }}>← Back</button>
              <button className="btn-primary" onClick={handleSubmit} disabled={loading}
                style={{ flex: 1, padding: "16px", fontSize: "16px", borderRadius: "12px", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ background: "#111214", border: "1px solid rgba(5,177,105,0.3)", borderRadius: "20px", padding: "48px 32px", textAlign: "center" }}>
            <div style={{ width: "72px", height: "72px", background: "rgba(5,177,105,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#05b169" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 12px" }}>Account created!</h2>
            <p style={{ color: "#8a919e", fontSize: "16px", margin: "0 0 32px", lineHeight: 1.7 }}>
              Welcome, {form.firstName}! Your Conbase account is ready. Start exploring crypto today.
            </p>
            <button className="btn-primary" onClick={() => navigate("/")} style={{ padding: "16px 40px", fontSize: "16px", borderRadius: "12px" }}>
              Go to Conbase →
            </button>
          </div>
        )}

        {step < 3 && (
          <p style={{ textAlign: "center", color: "#8a919e", fontSize: "14px", marginTop: "24px" }}>
            Already have an account?{" "}
            <Link to="/signin" style={{ color: "#0052ff", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
          </p>
        )}
      </div>
    </div>
  );
}