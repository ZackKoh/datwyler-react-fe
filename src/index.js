import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import RootRoute from './routes/root';
import Introduction from './routes/introduction';
import Customers from './routes/customers';
import NewCustomer, {
  action as addCustomerAction,
} from './routes/new-customer';
import CustomerList from './routes/customer-list';
import CustomerDetails from './routes/customer-details';
import NewLoanForm, { action as addLoanAction } from './routes/new-loan-form';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    children: [
      {
        index: true,
        element: <Introduction />,
      },
      {
        path: 'customer',
        element: <Customers />,
        children: [
          {
            index: true,
            element: <CustomerList />,
            loader: async () => {
              return fetch('/api/customers');
            },
          },
          {
            path: ':customerId',
            element: <CustomerDetails />,
            loader: async ({ params }) => {
              return fetch(`/api/customer-details/${params.customerId}`);
            },
          },
          {
            path: ':customerId/new-loan',
            element: <NewLoanForm />,
            loader: async ({ params }) => {
              return fetch(`/api/customer-details/${params.customerId}`);
            },
            action: addLoanAction,
          },
        ],
      },
      {
        path: 'new-customer',
        element: <NewCustomer />,
        action: addCustomerAction,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
