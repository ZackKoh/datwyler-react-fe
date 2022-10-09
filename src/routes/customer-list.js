import { useLoaderData, Link } from 'react-router-dom';

const CustomerList = () => {
  const customers = useLoaderData();

  return (
    <ul>
      {customers.map((customer) => (
        <li key={customer.id}>
          <Link to={`/customer/${customer.id}`}>{customer.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default CustomerList;
