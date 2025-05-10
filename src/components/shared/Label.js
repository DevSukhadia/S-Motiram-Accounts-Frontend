const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="form-label fw-bold">
    {children}
  </label>
);

export default Label;
