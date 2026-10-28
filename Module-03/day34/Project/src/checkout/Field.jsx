import styles from "./checkout.module.css";

function Field({
  id,
  label,
  error,
  as = "input",
  type = "text",
  children,
  ...inputProps
}) {
  const controlProps = {
    ...inputProps,
    id,
    name: id,
    className: styles.input,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
  };

  let control;

  if (as === "select") {
    control = <select {...controlProps}>{children}</select>;
  } else if (as === "textarea") {
    control = <textarea {...controlProps} />;
  } else {
    control = <input type={type} {...controlProps} />;
  }

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      {control}

      {error && (
        <p className={styles.fieldError} id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default Field;
