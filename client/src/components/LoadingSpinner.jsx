export default function LoadingSpinner({ label = "Cargando" }) {
  return <div className="loading-state" role="status"><span className="spinner" aria-hidden="true" /><span>{label}</span></div>;
}
