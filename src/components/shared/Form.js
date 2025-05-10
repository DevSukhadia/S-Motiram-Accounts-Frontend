const Form = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit} className="p-3">{children}</form>
);

export default Form;
