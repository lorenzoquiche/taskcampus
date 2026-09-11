import { ClipboardList } from "lucide-react";
import Button from "./Button.jsx";

export default function EmptyState({ title, description, actionLabel, actionTo }) {
  return <div className="empty-state"><span className="empty-state__icon"><ClipboardList aria-hidden="true" /></span><h3>{title}</h3><p>{description}</p>{actionTo && <Button to={actionTo}>{actionLabel}</Button>}</div>;
}
