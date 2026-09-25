import { useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiClock,
  FiCreditCard,
  FiMapPin,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCartStore from "../../store/cartStore";
import checkoutSchema from "../../schemas/checkoutSchema";
import styles from "./Checkout.module.css";

const paymentMethods = [
  {
    value: "telebirr",
    icon: "tele",
    name: "Telebirr",
    description: "Instant mobile birr",
  },
  {
    value: "cbe-birr",
    icon: "CBE",
    name: "CBE Birr",
    description: "Commercial Bank of Ethiopia",
  },
  {
    value: "cash-pos",
    icon: "POS",
    name: "Cash / Wireless POS",
    description: "Pay on delivery",
  },
  {
    value: "amole-awash",
    icon: "Awash",
    name: "Amole / Awash Birr",
    description: "Digital payment option",
  },
];

const defaultValues = {
  fullName: "",
  phone: "",
  email: "",
  subCity: "",
  street: "",
  landmark: "",
  dispatchType: "immediate",
  paymentMethod: "",
};

function Checkout() {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [submittedOrder, setSubmittedOrder] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
    mode: "onBlur",
  });

  const dispatchType = watch("dispatchType");
  const paymentMethod = watch("paymentMethod");

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.dish.priceETB * item.quantity,
    0,
  );

  const handleCheckoutSubmit = (data) => {
    const orderSnapshot = {
      data,
      items: items.map((item) => ({
        dish: item.dish,
        quantity: item.quantity,
      })),
      itemCount,
      total: subtotal,
    };

    setSubmittedOrder(orderSnapshot);
    clearCart();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (submittedOrder) {
    return (
      <main className={styles.page}>
        <section className={styles.successCard}>
          <div className={styles.successIcon}>
            <FiCheck />
          </div>

          <p className={styles.successEyebrow}>CHECKOUT COMPLETE</p>

          <h1>Order Details Confirmed</h1>

          <p className={styles.successText}>
            Your checkout information has been recorded on this device. No
            payment was processed online.
          </p>

          <div className={styles.confirmationSummary}>
            <div className={styles.confirmationRow}>
              <span>Name</span>
              <strong>{submittedOrder.data.fullName}</strong>
            </div>

            <div className={styles.confirmationRow}>
              <span>Phone</span>
              <strong>{submittedOrder.data.phone}</strong>
            </div>

            {submittedOrder.data.email && (
              <div className={styles.confirmationRow}>
                <span>Email</span>
                <strong>{submittedOrder.data.email}</strong>
              </div>
            )}

            <div className={styles.confirmationRow}>
              <span>Delivery Destination</span>
              <strong>
                {submittedOrder.data.subCity}, {submittedOrder.data.street}
              </strong>
            </div>

            <div className={styles.confirmationRow}>
              <span>Landmark</span>
              <strong>{submittedOrder.data.landmark}</strong>
            </div>

            <div className={styles.confirmationRow}>
              <span>Dispatch</span>
              <strong>
                {submittedOrder.data.dispatchType === "immediate"
                  ? "Immediate"
                  : "Dinner"}
              </strong>
            </div>

            <div className={styles.confirmationRow}>
              <span>Payment Method</span>
              <strong>
                {getPaymentMethodName(submittedOrder.data.paymentMethod)}
              </strong>
            </div>

            <div className={styles.confirmationTotal}>
              <span>Order Total</span>
              <strong>ETB {submittedOrder.total.toLocaleString()}</strong>
            </div>
          </div>

          <div className={styles.successActions}>
            <button
              type="button"
              className={styles.primaryAction}
              onClick={() => navigate("/")}
            >
              Back to Home
              <FiArrowRight />
            </button>

            <button
              type="button"
              className={styles.secondaryAction}
              onClick={() => navigate("/menu")}
            >
              View Full Menu
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className={styles.page}>
        <section className={styles.emptyCheckout}>
          <div className={styles.emptyIcon}>
            <FiShoppingBag />
          </div>

          <h1>Your basket is empty</h1>

          <p>Add dishes to your basket before continuing to checkout.</p>

          <Link to="/menu" className={styles.primaryAction}>
            Browse the Menu
            <FiArrowRight />
          </Link>
        </section>
      </main>
    );
  }

  const formattedTotal = `ETB ${subtotal.toLocaleString()}`;

  return (
    <main className={styles.page}>
      <section className={styles.checkoutHeader}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FiArrowLeft />
        </button>

        <div>
          <p>STEP 2 OF 3</p>
          <h1>Delivery &amp; Checkout</h1>
        </div>

        <div className={styles.headerCart}>
          <FiShoppingBag />
          <span>{itemCount}</span>
        </div>
      </section>

      <section className={styles.progressBar}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} />
        </div>

        <div className={styles.progressLabels}>
          <span>Review Order</span>
          <strong>Delivery &amp; Payment</strong>
          <span>Confirmation</span>
        </div>
      </section>

      <form
        className={styles.layout}
        onSubmit={handleSubmit(handleCheckoutSubmit)}
      >
        <div className={styles.formColumn}>
          <section className={styles.formCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <FiUser />
              </div>

              <div>
                <h2>Recipient Contact</h2>
                <p>For delivery updates &amp; Telegram OTP</p>
              </div>
            </div>

            <div className={styles.fieldsGrid}>
              <Field
                label="Full Name"
                name="fullName"
                register={register}
                error={errors.fullName}
                placeholder="Your full name"
                autoComplete="name"
              />

              <Field
                label="Phone (Calls & Telegram SMS)"
                name="phone"
                register={register}
                error={errors.phone}
                placeholder="+251 911 457 890"
                inputMode="tel"
                autoComplete="tel"
              />

              <div className={styles.desktopOnlyField}>
                <Field
                  label="Email for Digital Receipt"
                  name="email"
                  register={register}
                  error={errors.email}
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                />
              </div>
            </div>
          </section>

          <section className={styles.formCard}>
            <div className={styles.sectionHeader}>
              <div className={`${styles.sectionIcon} ${styles.locationIcon}`}>
                <FiMapPin />
              </div>

              <div>
                <h2>Delivery Destination</h2>
                <p>Addis Ababa Metropolitan Area</p>
              </div>
            </div>

            <div className={styles.fieldsGrid}>
              <Field
                label="Sub-City / Neighborhood"
                name="subCity"
                register={register}
                error={errors.subCity}
                placeholder="Bole Sub-city, Edna Mall area"
              />

              <Field
                label="House No. / Street"
                name="street"
                register={register}
                error={errors.street}
                placeholder="House No. 402, Main Street"
              />

              <div className={styles.fullWidthField}>
                <Field
                  label="Landmark & Gate Instructions"
                  name="landmark"
                  register={register}
                  error={errors.landmark}
                  placeholder="Opposite Boston Day Spa, entrance through gate"
                />
              </div>
            </div>
          </section>

          <section className={styles.formCard}>
            <div className={styles.sectionHeader}>
              <div className={`${styles.sectionIcon} ${styles.clockIcon}`}>
                <FiClock />
              </div>

              <div>
                <h2>Dispatch Timing</h2>
                <p>Choose when your order should be dispatched</p>
              </div>
            </div>

            <div className={styles.optionGrid}>
              <label
                className={`${styles.choiceCard} ${
                  dispatchType === "immediate" ? styles.choiceCardSelected : ""
                }`}
              >
                <input
                  type="radio"
                  value="immediate"
                  {...register("dispatchType")}
                />

                <div>
                  <strong>Immediate Dispatch</strong>
                  <span>Approx. 35–45 min</span>
                </div>

                <span className={styles.radioIndicator} />
              </label>

              <label
                className={`${styles.choiceCard} ${
                  dispatchType === "dinner" ? styles.choiceCardSelected : ""
                }`}
              >
                <input
                  type="radio"
                  value="dinner"
                  {...register("dispatchType")}
                />

                <div>
                  <strong>Schedule for Dinner</strong>
                  <span>Evening dispatch</span>
                </div>

                <span className={styles.radioIndicator} />
              </label>
            </div>

            {errors.dispatchType && (
              <p className={styles.formError}>{errors.dispatchType.message}</p>
            )}
          </section>

          <section className={styles.formCard}>
            <div className={styles.sectionHeader}>
              <div className={`${styles.sectionIcon} ${styles.paymentIcon}`}>
                <FiCreditCard />
              </div>

              <div>
                <h2>Payment Method</h2>
                <p>Select one method for your order record</p>
              </div>
            </div>

            <div className={styles.paymentList}>
              {paymentMethods.map((method) => (
                <label
                  key={method.value}
                  className={`${styles.paymentOption} ${
                    paymentMethod === method.value
                      ? styles.paymentOptionSelected
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    value={method.value}
                    {...register("paymentMethod")}
                  />

                  <span className={styles.paymentIconBadge}>{method.icon}</span>

                  <span className={styles.paymentCopy}>
                    <strong>{method.name}</strong>
                    <small>{method.description}</small>
                  </span>

                  <span className={styles.radioIndicator} />
                </label>
              ))}
            </div>

            {errors.paymentMethod && (
              <p className={styles.formError}>{errors.paymentMethod.message}</p>
            )}
          </section>

          <div className={styles.mobileOrderSummary}>
            <OrderSummary
              items={items}
              itemCount={itemCount}
              formattedTotal={formattedTotal}
            />
          </div>

          <section className={styles.promise}>
            <FiCheck />

            <div>
              <h2>The Mesob House Promise</h2>
              <p>
                Each communal platter arrives with the hospitality and care of a
                traditional Mesob experience.
              </p>
            </div>
          </section>
        </div>

        <aside className={styles.summaryColumn}>
          <OrderSummary
            items={items}
            itemCount={itemCount}
            formattedTotal={formattedTotal}
            showCheckout
            isSubmitting={isSubmitting}
          />
        </aside>

        <div className={styles.mobileSubmitBar}>
          <button
            type="submit"
            className={styles.mobileSubmit}
            disabled={isSubmitting}
          >
            <span>
              {isSubmitting ? "Confirming..." : "Confirm Order & Pay"}
            </span>

            <strong>{formattedTotal}</strong>
            <FiArrowRight />
          </button>
        </div>
      </form>
    </main>
  );
}

function Field({ label, name, register, error, type = "text", ...inputProps }) {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        type={type}
        {...register(name)}
        aria-invalid={Boolean(error)}
        {...inputProps}
      />

      {error && <p className={styles.fieldError}>{error.message}</p>}
    </div>
  );
}

function OrderSummary({
  items,
  itemCount,
  formattedTotal,
  showCheckout = false,
  isSubmitting = false,
}) {
  return (
    <section className={styles.orderSummary}>
      <div className={styles.summaryHeader}>
        <div>
          <p>YOUR CURRENT ORDER</p>
          <h2>Order Summary</h2>
        </div>

        <Link to="/cart">Edit Cart</Link>
      </div>

      <div className={styles.orderItems}>
        {items.map((item) => (
          <div className={styles.orderItem} key={item.dish.id}>
            <div className={styles.orderImage}>
              <span>Food Image</span>
            </div>

            <div className={styles.orderItemCopy}>
              <strong>{item.dish.nameEn}</strong>

              <span>
                {item.quantity} × ETB {item.dish.priceETB.toLocaleString()}
              </span>
            </div>

            <strong>
              ETB {(item.dish.priceETB * item.quantity).toLocaleString()}
            </strong>
          </div>
        ))}
      </div>

      <div className={styles.summaryRows}>
        <div>
          <span>Items Subtotal</span>
          <strong>{formattedTotal}</strong>
        </div>

        <div className={styles.summaryGrandTotal}>
          <span>Estimated Total</span>
          <strong>{formattedTotal}</strong>
        </div>
      </div>

      {showCheckout && (
        <>
          <button
            type="submit"
            className={styles.desktopSubmit}
            disabled={isSubmitting}
          >
            <span>
              {isSubmitting ? "Confirming..." : "Confirm Order & Pay"}
            </span>

            <strong>{formattedTotal}</strong>
            <FiArrowRight />
          </button>

          <p className={styles.paymentDisclaimer}>
            Payment selection is recorded as part of the checkout form. No
            online payment is processed in this version.
          </p>
        </>
      )}

      {!showCheckout && (
        <p className={styles.mobileSummaryCount}>
          {itemCount} {itemCount === 1 ? "item" : "items"} in your order
        </p>
      )}
    </section>
  );
}

function getPaymentMethodName(value) {
  const method = paymentMethods.find((item) => item.value === value);

  return method?.name || value;
}

export default Checkout;
