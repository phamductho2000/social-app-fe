const Input = ({ placeholder, value, onChange, onKeyPress, style = {} }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
    style={{
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d9d9d9',
      borderRadius: '6px',
      fontSize: '14px',
      outline: 'none',
      ...style,
    }}
  />
);

export default Input;
