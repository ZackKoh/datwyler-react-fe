import { useLoaderData, Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

const CustomerDetails = () => {
  const { id, name, credit, loans } = useLoaderData();

  const customerLoanLimit =
    credit - loans.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <>
      <h3>{name}</h3>
      <p>{`Total Credit Line: ${credit}`}</p>
      <p>{`Remaining Credit: ${customerLoanLimit}`}</p>
      <h4>Customer Loans</h4>
      {loans.length === 0 ? (
        <p>This cusomter has not made loans</p>
      ) : (
        <ul>
          {loans.map((loan) => (
            <li
              key={loan.id}
            >{`Loan Type: ${loan.type} - Value: ${loan.value}`}</li>
          ))}
        </ul>
      )}

      <Button variant="info">
        <Link to={`/customer/${id}/new-loan`}>Add new loan</Link>
      </Button>
    </>
  );
};

export default CustomerDetails;
