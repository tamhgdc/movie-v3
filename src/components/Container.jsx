import React from 'react';
import PropTypes from 'prop-types';

export default function Container({ children }) {
  return <div className="flex overflow-x-scroll scroll  mb-14  scrollbar-hide">{children}</div>;
}

Container.propTypes = { children: PropTypes.node.isRequired };
