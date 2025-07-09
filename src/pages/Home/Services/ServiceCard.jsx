export default function ServiceCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-xl border hover:shadow-lg transition-all text-center">
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
