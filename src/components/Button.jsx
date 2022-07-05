import PropTypes from 'prop-types';

function Button({ text, css, icon, click }) {
  return (
    <button
      className={`text-lg flex self-start gap-1 text-light items-center justify-center border border-primary mt-2  bg-primary  ${css} hover:border-light transition-all ease-in-out delay-75 hover:bg-dark rounded capitalize`}
      onClick={click}>
      <i className={`ri-${icon} ri-lg`}></i>
      {text}
    </button>
  );
}
Button.propTypes = {
  text: PropTypes.string,
  css: PropTypes.string,
  icon: PropTypes.string,
  click: PropTypes.func
};
Button.defaultProps = {
  text: '',
  css: '',
  icon: '',
  click: () => {}
};
export default Button;
