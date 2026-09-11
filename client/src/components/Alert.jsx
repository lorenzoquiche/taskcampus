import { CheckCircle2, CircleAlert, TriangleAlert } from "lucide-react";

export default function Alert({ children, type = "error" }) {
  const Icon = type === "success" ? CheckCircle2 : type === "warning" ? TriangleAlert : CircleAlert;
  return <div className={`alert alert--${type}`} role={type === "error" ? "alert" : "status"}><Icon aria-hidden="true" /><span>{children}</span></div>;
}
