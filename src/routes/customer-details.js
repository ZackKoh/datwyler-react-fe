import { useLoaderData } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

const CustomerDetails = () => {
  const customerData = useLoaderData();

  return (
    <>
      <h3>{customerData.name}</h3>
      <p>{`Credit Line: ${customerData.credit}`}</p>
      <h4>Customer Loans</h4>
      {customerData.loans.length === 0 ? (
        <p>This cusomter has not made loans</p>
      ) : (
        <ul>
          {customerData.loans.map((loan) => (
            <li
              key={loan.id}
            >{`Loan Type: ${loan.type} - Value: ${loan.value}`}</li>
          ))}
        </ul>
      )}
      <Button variant="primary">Add New Loan</Button>
    </>
  );
};

export default CustomerDetails;
