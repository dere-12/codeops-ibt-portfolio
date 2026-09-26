import { useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiMapPin,
  FiShield,
  FiStar,
  FiUser,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "../../store/authStore";
import registerSchema from "../../schemas/registerSchema";
import styles from "./JoinRegister.module.css";

const defaultValues = {
  fullName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};

function JoinRegister() {
  const navigate = useNavigate();
  const location = useLocation();
  const registerUser = useAuthStore((state) => state.registerUser);
  const [registration, setRegistration] = useState(null);

  const returnTo = location.state?.from?.pathname
    ? `${location.state.from.pathname}${location.state.from.search ?? ""}${location.state.from.hash ?? ""}`
    : "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues,
    mode: "onBlur",
  });

  function handleRegisterSubmit(data) {
    registerUser({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
    });

    setRegistration({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (registration) {
    return (
      <main className={styles.page}>
        <section className={styles.successCard}>
          <div className={styles.successIcon}>
            <FiCheck />
          </div>

          <p className={styles.successEyebrow}>
            REGISTRATION DETAILS CONFIRMED
          </p>

          <h1>Welcome to Mesob House</h1>

          <p className={styles.successText}>
            Your local Mesob House profile is ready on this browser and you are
            now signed in.
          </p>

          <div className={styles.confirmationCard}>
            <ConfirmationRow label="Full Name" value={registration.fullName} />

            <ConfirmationRow label="Phone" value={registration.phone} />

            <ConfirmationRow label="Email" value={registration.email} />
          </div>

          <div className={styles.successActions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => navigate(returnTo)}
            >
              {returnTo === "/" ? "Continue to Home" : "Continue to Checkout"}
              <FiArrowRight />
            </button>

            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => navigate("/menu")}
            >
              Browse Full Menu
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Account</span>
        <span>/</span>
        <strong>Join the Mesob Family</strong>
      </div>

      <section className={styles.layout}>
        <aside className={styles.memberPanel}>
          <div className={styles.memberBadge}>
            <FiStar />
            MEMBER CIRCLE
          </div>

          <h1>Become an Honored Table Guest</h1>

          <p className={styles.memberIntro}>
            Immerse yourself in authentic highland hospitality, where every
            shared meal honors community, connection, and craft.
          </p>

          <div className={styles.benefits}>
            <Benefit
              icon={<FiShield />}
              title="Communal Gursha Points"
              text="A member-focused dining experience built around shared meals and community."
            />

            <Benefit
              icon={<FiMapPin />}
              title="Seasonal Dining Updates"
              text="Stay connected with Mesob House seasonal dishes and dining experiences."
            />

            <Benefit
              icon={<FiArrowRight />}
              title="Convenient Addis Dining"
              text="Keep your dining details ready for a smoother Mesob House experience."
            />

            <Benefit
              icon={<FiStar />}
              title="Member Dining Experience"
              text="Enjoy a closer connection with the traditions and atmosphere of the Mesob."
            />
          </div>

          <div className={styles.proverbCard}>
            <div className={styles.proverbIcon}>
              <FiUser />
            </div>

            <div>
              <span>TRADITION IN EVERY BITE</span>

              <p>
                “Sharing from the same mesob is the ancient covenant of love and
                trust.”
              </p>

              <strong>— Habesha Proverb</strong>
            </div>
          </div>
        </aside>

        <section className={styles.formCard}>
          <div className={styles.formHeading}>
            <p className={styles.formEyebrow}>JOIN THE COMMUNITY</p>

            <h2>Create Your Mesob House Account</h2>

            <p>Join our culinary heritage circle in less than a minute.</p>
          </div>

          <div className={styles.formDivider}>
            <span>Register with your details</span>
          </div>

          <form
            className={styles.form}
            onSubmit={handleSubmit(handleRegisterSubmit)}
          >
            <FormField
              label="Full Name"
              name="fullName"
              register={register}
              error={errors.fullName}
              placeholder="Your full name"
              icon={<FiUser />}
              autoComplete="name"
            />

            <div className={styles.phoneField}>
              <label htmlFor="phone">Ethiopian Mobile Number</label>

              <div className={styles.phoneInputGroup}>
                <span className={styles.phonePrefix}>+251</span>

                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="911 234 567"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                  {...register("phone")}
                />
              </div>

              {errors.phone && (
                <p className={styles.fieldError}>{errors.phone.message}</p>
              )}

              <small>
                Use an Ethiopian mobile number beginning with 09 or 07.
              </small>
            </div>

            <FormField
              label="Email Address"
              name="email"
              register={register}
              error={errors.email}
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
            />

            <div className={styles.passwordGrid}>
              <FormField
                label="Password"
                name="password"
                register={register}
                error={errors.password}
                placeholder="Minimum 8 characters"
                type="password"
                autoComplete="new-password"
              />

              <FormField
                label="Confirm Password"
                name="confirmPassword"
                register={register}
                error={errors.confirmPassword}
                placeholder="Repeat password"
                type="password"
                autoComplete="new-password"
              />
            </div>

            <div className={styles.termsField}>
              <label className={styles.termsLabel}>
                <input
                  type="checkbox"
                  {...register("termsAccepted")}
                  aria-invalid={Boolean(errors.termsAccepted)}
                />

                <span>
                  I agree to the Mesob House Hospitality Terms and Privacy
                  Guidelines.
                </span>
              </label>

              {errors.termsAccepted && (
                <p className={styles.fieldError}>
                  {errors.termsAccepted.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Account"}

              <FiArrowRight />
            </button>
          </form>

          <p className={styles.signInPrompt}>
            Already part of our dining family?{" "}
            <Link to="/login" state={{ from: location.state?.from }}>
              Sign in here
            </Link>
          </p>
        </section>
      </section>
    </main>
  );
}

function FormField({
  label,
  name,
  register,
  error,
  type = "text",
  icon,
  ...inputProps
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>

      <div className={styles.inputWrapper}>
        {icon && <span>{icon}</span>}

        <input
          id={name}
          type={type}
          {...register(name)}
          aria-invalid={Boolean(error)}
          {...inputProps}
        />
      </div>

      {error && <p className={styles.fieldError}>{error.message}</p>}
    </div>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <div className={styles.benefit}>
      <div className={styles.benefitIcon}>{icon}</div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function ConfirmationRow({ label, value }) {
  return (
    <div className={styles.confirmationRow}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default JoinRegister;
