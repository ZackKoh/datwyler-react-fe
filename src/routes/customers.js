import { Outlet } from 'react-router-dom';

const customerDetails = () => {
  return (
    <>
      This is the customer page
      <Outlet />
    </>
  );
};

export default customerDetails;
