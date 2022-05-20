import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/landing/Landing.js';
import Projects from "./components/projects/Projects.js";
import Rounds from "./components/roundPresale/presale.js";
import './App.scss';
import Staking from "./components/staking/Staking.js"
import ProjectDetail from "./components/projects/Project-detail.js"
// import useEagerConnect from './hooks/useEagerConnect'
import IdoForm from './components/idoform/IdoForm';
import Admin from './components/admin/Admin';
import Car from './components/kyc';
import AdminDetail from './components/admin/AdminDetail'
import Verification from './components/kyc-verification/Verification';
import useEagerConnect from './hooks/useEagerConnect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banner1 from './components/main-banner1/Banner1.js';

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
          draggabless
          pauseOnHover
        />
        <Switch>
          {/* <Route exact path='/' component={Landing} /> */}
          <Route exact path='/kyc1' component={Car} />
          <Route exact path='/projects' component={Projects} />
          <Route exact path='/rounds' component={Rounds} />
          <Route exact path='/' component={Staking} />
          <Route exact path='/banner1' component={Banner1} />
          <Route exact path='/projectdetail/:id' component={ProjectDetail} />
          <Route exact path='/idoform' component={IdoForm} />
          <Route exact path='/verification' component={Verification} />
          <Route exact path='/admin' component={Admin} />
          <Route exact path='/admindetail/:id' component={AdminDetail} />
        </Switch>
      </Router>
    </>
  );
}

export default App;









