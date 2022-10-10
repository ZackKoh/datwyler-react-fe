import { useLoaderData, Link } from 'react-router-dom';

const CustomerList = () => {
  const customers = useLoaderData();

  return customers.length !== 0 ? (
    <ul>
      {customers.map((customer) => (
        <li key={customer.id}>
          <Link to={`/customer/${customer.id}`}>{customer.name}</Link>
        </li>
      ))}
    </ul>
  ) : (
    <p>No Customers Found</p>
  );
};

export default CustomerList;
