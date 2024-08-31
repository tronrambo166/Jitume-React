import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';
import Homepage from './components/pages/Homepage';
import Servicepage from './components/pages/Servicepage';
import ListingResults from './components/partials/listingResults';
import ListingDetails from './components/partials/ListingDetails';
import Dashboard from './components/pages/Dashboard';
import MyBusinesses from './components/partials/MyBusinesses';
import Dashhome from './components/partials/Dashhome';
import AddMilestone from './components/partials/Addmilestone';
import Milestones from './components/partials/Milestone';
import InvestmentBids from './components/partials/InvestmentBids';
import AddService from './components/partials/Addservice';
import ServiceMilestone from './components/partials/ServiceMilestone';
import ServiceBookings from './components/partials/Servicebookings';
import Messages from './components/partials/Messages';
import AccountPage from './components/partials/AccountPage';
import AddBusiness from './components/partials/Addbusiness';
import PaymentForm from './components/partials/PaymentForm';
import ServiceDetails from './components/partials/ServiceDetails';
import MilestonesPage from './components/partials/Milestonepage';
import ServiceResults from './components/partials/Serviceresults';
import Subscribepage from './components/partials/Subscribepage';
import Mile from './components/partials/mile';
import Invest from './components/partials/Investequip';
import Users from './views/users'; // Ensure this path is correct
import UserForm from './views/userForm';
import Register from './views/register';
import Login from './views/login';
import ServiceTable from './components/partials/servicestable';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/home', element: <Homepage /> },
      { path: '/services', element: <Servicepage /> },
      { path: '/users', element: <Users /> },
      { path: '/listingResults/:resIds/:loc', name: 'listingResults', element: <ListingResults /> },
      { path: '/listing/:id', element: <ListingDetails /> },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          { path: '', element: <Dashhome /> },
          { path: 'my-businesses', element: <MyBusinesses /> },
          { path: 'add-milestone', element: <AddMilestone /> },
          { path: 'milestones', element: <Milestones /> },
          { path: 'investment-bids', element: <InvestmentBids /> },
          { path: 'add-service', element: <AddService /> },
          { path: 'service-milestone', element: <ServiceMilestone /> },
          { path: 'service-bookings', element: <ServiceBookings /> },
          { path: 'messages', element: <Messages /> },
          { path: 'account', element: <AccountPage /> },
          { path: 'add-business', element: <AddBusiness /> },
          { path: 'payment-form', element: <PaymentForm /> },
		  { path: 'services-table', element: <ServiceTable/> },

        ],


      },
      { path: '/service-details/:id', element: <ServiceDetails /> },
      { path: '/business-milestones/:id', element: <MilestonesPage /> },
      { path: '/checkout/:amount/:listing_id/:percent/:purpose', element: <PaymentForm /> },
      { path: '/serviceresults/:resIds/:loc', name: 'serviceresults', element: <ServiceResults /> },
      { path: '/subscribe', element: <Subscribepage /> },
      { path: '/checkout', element: <PaymentForm /> },
      { path: '/mile', element: <Mile /> },
      { path: '/invest', element: <Invest /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/user-form', element: <UserForm /> },
    ],
  },
]);

export default router;
