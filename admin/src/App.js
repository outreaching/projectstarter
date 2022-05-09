import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './components/admin/Admin';
import AdminDetail from './components/admin/AdminDetail';
import AdminLogin from './components/admin/AdminLogin';
import useEagerConnect from './hooks/useEagerConnect';
import KycProjects from './components/kyc-projects/KycProjects';
import KycProjectsDetail from './components/kyc-projects/KycProjectsDetail';

function App() {
  useEagerConnect()
  return (
    <>
      <Router>
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path='/' component={AdminLogin} />
          <Route exact path='/admin' component={Admin} />
          <Route exact path='/admindetail/:id' component={AdminDetail} />
          <Route exact path='/kycprojects' component={KycProjects} />
          <Route exact path='/kycprojectsdetail/:walletAddress' component={KycProjectsDetail} />
        </Switch>
      </Router>
    </>
  );
}

export default App;









