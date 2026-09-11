export default function StatCard({ label, value, icon: Icon, tone = "primary" }) {
  return <article className="stat-card"><span className={`stat-card__icon stat-card__icon--${tone}`}><Icon aria-hidden="true" /></span><div><p>{label}</p><strong>{value}</strong></div></article>;
}
