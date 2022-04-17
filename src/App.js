import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Footer from './layouts/Footer';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import SingIn from './pages/SignIn/SingIn';
import { HOME_ROUTE, SIGN_IN_ROUTE } from './routes';

function App() {
  return (
    <div className="bg-gray-dark2">
      <Navbar />
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={SIGN_IN_ROUTE} element={<SingIn />} />
      </Routes>
      <Footer />
    </div>
  );
}

App.propTypes = {
  location: PropTypes.string
};
App.defaultProps = {
  location: ''
};

export default App;
