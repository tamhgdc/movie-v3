import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NAVLink({ to, text, active }) {
  return (
    <NavLink
      className={`${
        active === to ? 'text-light' : ''
      } hover:text-light ml-2 transition-all ease-in delay-50 uppercase`}
      to={to}>
      {text}
    </NavLink>
  );
}

NAVLink.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
  active: PropTypes.string
};
