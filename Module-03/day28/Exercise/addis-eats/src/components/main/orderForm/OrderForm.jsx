import { useState } from "react";

function OrderForm({ total }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
  });

  const isValid = /^(?:\+251|0)9\d{8}$/.test(form.phone);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Order submitted for ${form.name}. Total: ${total} ETB`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Delivery Details</h3>
      <div>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Customer Name"
        />
      </div>
      <div>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number (09... or +2519...)"
        />
      </div>
      {form.phone && !isValid && (
        <p className="err">Use a valid format 09... or +2519...</p>
      )}
      <select name="area" value={form.area} onChange={handleChange}>
        <option value="Bole">Bole</option>
        <option value="Kazanchis">Kazanchis</option>
        <option value="Piassa">Piassa</option>
      </select>
      <div>
        <button disabled={!isValid || total === 0}>
          Pay {total} ETB with TeleBirr
        </button>
      </div>
    </form>
  );
}

export default OrderForm;
