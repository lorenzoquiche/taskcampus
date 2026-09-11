export default function FormField({ id, label, required = false, hint, ...inputProps }) {
  return <div className="form-field"><label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label><input id={id} required={required} aria-describedby={hint ? `${id}-hint` : undefined} {...inputProps} />{hint && <small id={`${id}-hint`}>{hint}</small>}</div>;
}
