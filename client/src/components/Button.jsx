import { Link } from "react-router-dom";

export default function Button({ children, variant = "primary", to, className = "", ...props }) {
  const classes = `button button--${variant} ${className}`.trim();
  if (to) return <Link className={classes} to={to} {...props}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}
