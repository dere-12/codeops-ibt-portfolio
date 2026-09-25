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
    shortName: "tele",
    name: "Telebirr",
  },
  {
    value: "cbe-birr",
    shortName: "CBE",
    name: "CBE Birr",
  },
  {
    value: "cash-pos",
    shortName: "POS",
    name: "Cash / Wireless POS",
  },
  {
    value: "amole-awash",
    shortName: "Awash",
    name: "Amole / Awash Birr",
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

  const selectedDispatchType = watch("dispatchType");
  const selectedPaymentMethod = watch("paymentMethod");

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.dish.priceETB * item.quantity,
    0,
  );

  const formattedTotal = `ETB ${subtotal.toLocaleString()}`;

  function handleCheckoutSubmit(formData) {
    const orderSnapshot = {
      customer: formData,
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
  }

  if (submittedOrder) {
    return (
      <CheckoutSuccess
        order={submittedOrder}
        onHome={() => navigate("/")}
        onMenu={() => navigate("/menu")}
      />
    );
  }

  if (items.length === 0) {
    return <EmptyCheckout onBrowseMenu={() => navigate("/menu")} />;
  }

  return (
    <main className={styles.page}>
      <CheckoutMobileHeader itemCount={itemCount} navigate={navigate} />

      <section className={styles.desktopHeader}>
        <div>
          <p className={styles.eyebrow}>STEP 2 OF 3</p>
          <h1>Delivery &amp; Checkout</h1>
        </div>

        <div className={styles.desktopProgress}>
          <span className={styles.completedStep}>
            <strong>✓</strong>
            Review Order
          </span>

          <span>/</span>

          <span className={styles.activeStep}>
            <strong>2</strong>
            Delivery &amp; Payment
          </span>

          <span>/</span>

          <span>
            <strong>3</strong>
            Confirmation
          </span>
        </div>
      </section>

      <section className={styles.mobileProgress}>
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
            <SectionHeader
              icon={<FiUser />}
              title="Recipient Contact"
              subtitle="Your contact details for order communication"
            />

            <div className={styles.fieldsGrid}>
              <FormField
                label="Full Name"
                name="fullName"
                register={register}
                error={errors.fullName}
                placeholder="Your full name"
                autoComplete="name"
              />

              <FormField
                label="Phone"
                name="phone"
                register={register}
                error={errors.phone}
                placeholder="+251 911 457 890"
                inputMode="tel"
                autoComplete="tel"
              />

              <div className={styles.emailField}>
                <FormField
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
            <SectionHeader
              icon={<FiMapPin />}
              title="Delivery Destination"
              subtitle="Enter where your order should be delivered"
              iconClassName={styles.locationIcon}
            />

            <div className={styles.fieldsGrid}>
              <FormField
                label="Sub-City / Neighborhood"
                name="subCity"
                register={register}
                error={errors.subCity}
                placeholder="Bole Sub-city"
              />

              <FormField
                label="House No. / Street"
                name="street"
                register={register}
                error={errors.street}
                placeholder="House No. 402, Main Street"
              />

              <div className={styles.fullWidthField}>
                <FormField
                  label="Landmark & Gate Instructions"
                  name="landmark"
                  register={register}
                  error={errors.landmark}
                  placeholder="Near a recognizable landmark or gate"
                />
              </div>
            </div>
          </section>

          <section className={styles.formCard}>
            <SectionHeader
              icon={<FiClock />}
              title="Dispatch Timing"
              subtitle="Choose when your order should be dispatched"
              iconClassName={styles.clockIcon}
            />

            <div className={styles.optionGrid}>
              <ChoiceCard
                value="immediate"
                selected={selectedDispatchType === "immediate"}
                register={register}
                name="dispatchType"
                title="Immediate Dispatch"
                description="Send the order as soon as possible"
              />

              <ChoiceCard
                value="dinner"
                selected={selectedDispatchType === "dinner"}
                register={register}
                name="dispatchType"
                title="Schedule for Dinner"
                description="Prepare for your evening meal"
              />
            </div>

            {errors.dispatchType && (
              <p className={styles.formError}>{errors.dispatchType.message}</p>
            )}
          </section>

          <section className={styles.formCard}>
            <SectionHeader
              icon={<FiCreditCard />}
              title="Payment Method"
              subtitle="Choose one payment method for your order"
              iconClassName={styles.paymentIcon}
            />

            <div className={styles.paymentList}>
              {paymentMethods.map((method) => (
                <label
                  key={method.value}
                  className={`${styles.paymentOption} ${
                    selectedPaymentMethod === method.value
                      ? styles.selectedOption
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    value={method.value}
                    {...register("paymentMethod")}
                  />

                  <span className={styles.paymentBadge}>
                    {method.shortName}
                  </span>

                  <span className={styles.paymentName}>{method.name}</span>

                  <span className={styles.radioCircle} />
                </label>
              ))}
            </div>

            {errors.paymentMethod && (
              <p className={styles.formError}>{errors.paymentMethod.message}</p>
            )}
          </section>

          <div className={styles.mobileSummary}>
            <OrderSummary items={items} total={formattedTotal} />
          </div>

          <section className={styles.promise}>
            <FiCheck />

            <div>
              <h2>The Mesob House Promise</h2>
              <p>
                Every order is prepared with the warmth and care of a
                traditional Mesob experience.
              </p>
            </div>
          </section>
        </div>

        <aside className={styles.summaryColumn}>
          <OrderSummary
            items={items}
            total={formattedTotal}
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

function CheckoutMobileHeader({ itemCount, navigate }) {
  return (
    <section className={styles.mobileHeader}>
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
  );
}

function SectionHeader({ icon, title, subtitle, iconClassName = "" }) {
  return (
    <div className={styles.sectionHeader}>
      <div className={`${styles.sectionIcon} ${iconClassName}`}>{icon}</div>

      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  register,
  error,
  type = "text",
  ...inputProps
}) {
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

function ChoiceCard({ value, selected, register, name, title, description }) {
  return (
    <label
      className={`${styles.choiceCard} ${
        selected ? styles.selectedOption : ""
      }`}
    >
      <input type="radio" value={value} {...register(name)} />

      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <span className={styles.radioCircle} />
    </label>
  );
}

function OrderSummary({
  items,
  total,
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

            <div className={styles.orderItemInfo}>
              <strong>{item.dish.nameEn}</strong>

              <span>
                {item.quantity} × ETB {item.dish.priceETB.toLocaleString()}
              </span>
            </div>

            <strong className={styles.itemTotal}>
              ETB {(item.dish.priceETB * item.quantity).toLocaleString()}
            </strong>
          </div>
        ))}
      </div>

      <div className={styles.summaryRows}>
        <div>
          <span>Items Subtotal</span>
          <strong>{total}</strong>
        </div>

        <div className={styles.grandTotal}>
          <span>Estimated Total</span>
          <strong>{total}</strong>
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

            <strong>{total}</strong>

            <FiArrowRight />
          </button>

          <p className={styles.paymentDisclaimer}>
            Payment selection is recorded with your checkout information. No
            online payment is processed in this version.
          </p>
        </>
      )}
    </section>
  );
}

function CheckoutSuccess({ order, onHome, onMenu }) {
  const paymentMethod = getPaymentMethodName(order.customer.paymentMethod);

  return (
    <main className={styles.page}>
      <section className={styles.successCard}>
        <div className={styles.successIcon}>
          <FiCheck />
        </div>

        <p className={styles.successEyebrow}>CHECKOUT COMPLETE</p>

        <h1>Order Details Confirmed</h1>

        <p className={styles.successText}>
          Your checkout information has been recorded. No online payment was
          processed.
        </p>

        <div className={styles.confirmationSummary}>
          <ConfirmationRow label="Name" value={order.customer.fullName} />

          <ConfirmationRow label="Phone" value={order.customer.phone} />

          {order.customer.email && (
            <ConfirmationRow label="Email" value={order.customer.email} />
          )}

          <ConfirmationRow
            label="Delivery"
            value={`${order.customer.subCity}, ${order.customer.street}`}
          />

          <ConfirmationRow label="Landmark" value={order.customer.landmark} />

          <ConfirmationRow
            label="Dispatch"
            value={
              order.customer.dispatchType === "immediate"
                ? "Immediate"
                : "Dinner"
            }
          />

          <ConfirmationRow label="Payment Method" value={paymentMethod} />

          <div className={styles.confirmationTotal}>
            <span>Order Total</span>

            <strong>ETB {order.total.toLocaleString()}</strong>
          </div>
        </div>

        <div className={styles.successActions}>
          <button
            type="button"
            className={styles.primaryAction}
            onClick={onHome}
          >
            Back to Home
            <FiArrowRight />
          </button>

          <button
            type="button"
            className={styles.secondaryAction}
            onClick={onMenu}
          >
            View Full Menu
          </button>
        </div>
      </section>
    </main>
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

function EmptyCheckout({ onBrowseMenu }) {
  return (
    <main className={styles.page}>
      <section className={styles.emptyCheckout}>
        <div className={styles.emptyIcon}>
          <FiShoppingBag />
        </div>

        <h1>Your basket is empty</h1>

        <p>Add some dishes to your basket before continuing to checkout.</p>

        <button
          type="button"
          className={styles.primaryAction}
          onClick={onBrowseMenu}
        >
          Browse the Menu
          <FiArrowRight />
        </button>
      </section>
    </main>
  );
}

function getPaymentMethodName(value) {
  const method = paymentMethods.find((item) => item.value === value);

  return method?.name || value;
}

export default Checkout;
