export default function Checkbox({ name, label, checked, onChange }) {
  return (
    <label className="checkbox">
      <input
        onChange={onChange}
        type="checkbox"
        checked={checked ? "checked" : null}
        name={name}
      />
      <span></span>
      {label}
    </label>
  );
}
