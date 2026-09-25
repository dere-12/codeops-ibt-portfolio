import { useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiMail,
  FiPhone,
  FiUserPlus,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../../schemas/loginSchema";
import styles from "./GuestLogin.module.css";

function GuestLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginConfirmation, setLoginConfirmation] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginMethod: "phone",
      phone: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const loginMethod = watch("loginMethod");

  function handleLoginSubmit(data) {
    setLoginConfirmation({
      loginMethod: data.loginMethod,
      identifier: data.loginMethod === "phone" ? data.phone : data.email,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (loginConfirmation) {
    return (
      <main className={styles.page}>
        <section className={styles.confirmationCard}>
          <div className={styles.confirmationIcon}>
            <FiCheck />
          </div>

          <p className={styles.confirmationEyebrow}>
            SIGN-IN DETAILS CONFIRMED
          </p>

          <h1>Welcome Back to Mesob House</h1>

          <p className={styles.confirmationText}>
            Your sign-in information passed validation. Real authentication is
            not connected in this version.
          </p>

          <div className={styles.confirmationDetails}>
            <div>
              <span>Login Method</span>

              <strong>
                {loginConfirmation.loginMethod === "phone"
                  ? "Ethiopian Mobile"
                  : "Email Address"}
              </strong>
            </div>

            <div>
              <span>Account Identifier</span>
              <strong>{loginConfirmation.identifier}</strong>
            </div>
          </div>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => navigate("/")}
          >
            Continue to Home
            <FiArrowRight />
          </button>
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
        <strong>Guest Login</strong>
      </div>

      <section className={styles.loginCard}>
        <div className={styles.logoMark}>
          <span>MH</span>
        </div>

        <p className={styles.eyebrow}>WELCOME BACK</p>

        <h1>Sign in to Mesob House</h1>

        <p className={styles.intro}>
          Continue your Mesob House dining experience.
        </p>

        <div
          className={styles.methodSelector}
          role="tablist"
          aria-label="Login method"
        >
          <button
            type="button"
            className={
              loginMethod === "phone"
                ? styles.activeMethod
                : styles.methodButton
            }
            onClick={() =>
              setValue("loginMethod", "phone", {
                shouldDirty: true,
              })
            }
          >
            <FiPhone />
            Ethiopian Mobile
          </button>

          <button
            type="button"
            className={
              loginMethod === "email"
                ? styles.activeMethod
                : styles.methodButton
            }
            onClick={() =>
              setValue("loginMethod", "email", {
                shouldDirty: true,
              })
            }
          >
            <FiMail />
            Email Address
          </button>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit(handleLoginSubmit)}
        >
          <input type="hidden" {...register("loginMethod")} />

          {loginMethod === "phone" ? (
            <div className={styles.field}>
              <label htmlFor="phone">Ethiopian Mobile Number</label>

              <div className={styles.phoneInput}>
                <span>+251</span>

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
            </div>
          ) : (
            <div className={styles.field}>
              <label htmlFor="email">Email Address</label>

              <div className={styles.inputWrapper}>
                <FiMail />

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  {...register("email")}
                />
              </div>

              {errors.email && (
                <p className={styles.fieldError}>{errors.email.message}</p>
              )}
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="password">Secret Password / PIN</label>

            <div className={styles.inputWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                {...register("password")}
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {errors.password && (
              <p className={styles.fieldError}>{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={styles.signInButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}

            <FiArrowRight />
          </button>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <button
          type="button"
          className={styles.guestButton}
          onClick={() => navigate("/menu")}
        >
          Continue as Guest
          <FiArrowRight />
        </button>

        <div className={styles.registerPrompt}>
          <FiUserPlus />

          <span>
            New to our dining family?{" "}
            <Link to="/account">Create an account</Link>
          </span>
        </div>
      </section>
    </main>
  );
}

export default GuestLogin;
