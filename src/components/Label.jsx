export default function Label({ label, className }) {
  return (
    <span className={`label label-lg label-inline ${className}`}>{label}</span>
  );
}
