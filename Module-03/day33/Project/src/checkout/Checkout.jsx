import { useState } from "react";
import Field from "./Field";
import { validate, AREAS } from "./validate";
import { placeOrder } from "../api/orders";
import { useCartStore } from "../store/cartStore";
import styles from "./checkout.module.css";

const INITIAL_FORM = {
  name: "",
  phone: "",
  area: "Bole",
  notes: "",
};

function Checkout() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clear);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const [form, setForm] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverFieldErrors, setServerFieldErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const clientErrors = validate(form);

  const errors = {
    ...serverFieldErrors,
    ...clientErrors,
  };

  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(([field]) => submitted || touched[field]),
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setServerFieldErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];

      return nextErrors;
    });

    setServerError("");
    setSuccessMessage("");
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));
  }

  function focusFirstError(fieldErrors) {
    const firstError = Object.keys(fieldErrors)[0];

    if (firstError) {
      document.getElementById(firstError)?.focus();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setSubmitted(true);
    setServerError("");
    setSuccessMessage("");

    const currentErrors = {
      ...serverFieldErrors,
      ...validate(form),
    };

    if (Object.keys(currentErrors).length > 0) {
      focusFirstError(currentErrors);
      return;
    }

    if (items.length === 0) {
      setServerError("Your cart is empty. Add a dish before placing an order.");
      return;
    }

    setSubmitting(true);

    try {
      const order = {
        ...form,
        name: form.name.trim(),
        phone: form.phone.replace(/\s+/g, ""),
        notes: form.notes.trim(),

        items: items.map((item) => ({
          dishId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),

        total,
      };

      const result = await placeOrder(order);

      clearCart();
      setForm({ ...INITIAL_FORM });
      setTouched({});
      setSubmitted(false);
      setServerFieldErrors({});

      if (result?.demo) {
        setSuccessMessage(
          `Demo checkout succeeded for ${form.name.trim()}. Total: ${total} ETB.`,
        );
      } else {
        setSuccessMessage(
          `Thank you, ${form.name.trim()}! Your order was submitted. Total: ${total} ETB.`,
        );
      }
    } catch (error) {
      if (error.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
        setServerFieldErrors(error.fieldErrors);
        focusFirstError(error.fieldErrors);
      } else {
        setServerError(
          error.message ||
            "Your order could not be submitted. Please try again.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {submitted && Object.keys(visibleErrors).length > 0 && (
        <div
          className={styles.errorSummary}
          role="alert"
          aria-labelledby="checkout-error-title"
        >
          <p id="checkout-error-title">
            Please fix {Object.keys(visibleErrors).length} field
            {Object.keys(visibleErrors).length === 1 ? "" : "s"}:
          </p>

          <ul>
            {Object.entries(visibleErrors).map(([field, message]) => (
              <li key={field}>
                <a href={`#${field}`}>{message}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Field
        id="name"
        label="Name"
        value={form.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={visibleErrors.name}
        placeholder="Full name"
        autoComplete="name"
      />

      <Field
        id="phone"
        label="TeleBirr number"
        type="tel"
        value={form.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={visibleErrors.phone}
        placeholder="0912345678 or +251911234567"
        autoComplete="tel"
      />

      <Field
        id="area"
        label="Delivery area"
        as="select"
        value={form.area}
        onChange={handleChange}
        onBlur={handleBlur}
        error={visibleErrors.area}
      >
        {AREAS.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </Field>

      <Field
        id="notes"
        label="Delivery notes (optional)"
        as="textarea"
        value={form.notes}
        onChange={handleChange}
        onBlur={handleBlur}
        error={visibleErrors.notes}
        placeholder="Anything the delivery person should know?"
        rows={3}
        maxLength={200}
      />

      <p className={styles.characterCount}>
        {form.notes.length}/200 characters
      </p>

      {serverError && (
        <p className={styles.serverError} role="alert">
          {serverError}
        </p>
      )}

      {successMessage && (
        <p className={styles.successMessage} role="status">
          {successMessage}
        </p>
      )}

      <button
        className={styles.submitButton}
        type="submit"
        disabled={submitting || total === 0}
      >
        {submitting ? "Sending your order…" : `Order — ${total} ETB`}
      </button>

      {total === 0 && (
        <p className={styles.helpText}>
          Add a dish to your cart before placing an order.
        </p>
      )}
    </form>
  );
}

export default Checkout;
