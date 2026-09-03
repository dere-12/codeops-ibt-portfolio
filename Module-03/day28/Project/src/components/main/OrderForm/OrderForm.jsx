import { useState } from "react";
import styles from "./orderForm.module.css";

function OrderForm({ total }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
  });

  const isValid = /^(?:\+251|0)9\d{8}$/.test(form.phone);

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Order submitted for ${form.name}. Total: ${total} ETB`);

    setForm({
      name: "",
      phone: "",
      area: "Bole",
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Delivery Details</h3>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            name="phone"
            id="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+2519xxx or 09xxx"
          />
        </div>
        {form.phone && !isValid && (
          <p className={styles.err}>Use a valid format +2519... or 09...</p>
        )}
        <div>
          <select name="area" value={form.area} onChange={handleChange}>
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Piassa">Piassa</option>
          </select>
        </div>
        <div>
          <button disabled={!isValid || total === 0} className={styles.formBtn}>
            Pay {total} ETB with TeleBirr
          </button>
        </div>
      </form>
    </>
  );
}

export default OrderForm;
