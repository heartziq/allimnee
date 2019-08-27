import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
// import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
// import AddExpensePage from '../components/AddExpensePage';
// import EditExpensePage from '../components/EditExpensePage';
// import HelpPage from '../components/HelpPage';
// import NotFoundPage from '../components/NotFoundPage';
// import Header from '../components/Header';
import App from '../components/App'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={() => <App initialData={window.initialData} />} exact={true} />
        {/* <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} /> */}
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
