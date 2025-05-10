const Input = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
}) => (
  <input
    id={id}
    name={name} // ✅ FIXED: Add name prop
    className="form-control mb-3"
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
  />
);

export default Input;
