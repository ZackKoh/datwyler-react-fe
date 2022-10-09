import { useState } from 'react';

import { Form, redirect, useLoaderData, Link } from 'react-router-dom';
import BootstrapForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from './new-loan-form.module.css';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await fetch('/api/loans', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: updates.type,
      customerId: parseInt(updates.customerId),
      value: parseInt(updates.amount),
    }),
  });
  return redirect(`/customer/${updates.customerId}`);
};

const NewLoanForm = () => {
  const { id, credit, loans } = useLoaderData();
  const limit = credit - loans.reduce((acc, cur) => acc + cur.value, 0);

  const [loanType, setLoanType] = useState('personal');
  const [loanAmount, setLoanAmount] = useState(0);
  const [isError, setIsError] = useState(false);

  const handleLoanTypeChange = (e) => {
    setLoanType(e.target.value);
  };

  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value);
    if (e.target.value > limit) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  return (
    <Form method="post">
      <BootstrapForm.Label>Customer Id: </BootstrapForm.Label>
      <BootstrapForm.Control
        type="text"
        name="customerId"
        value={id}
        readOnly={true}
      />
      <BootstrapForm.Label>Select Loan Type: </BootstrapForm.Label>
      <BootstrapForm.Select
        name="type"
        value={loanType}
        onChange={handleLoanTypeChange}
      >
        <option value="personal">Personal</option>
        <option value="credit">Credit</option>
        <option value="housing">Housing</option>
        <option value="vehicle">Vehicle</option>
      </BootstrapForm.Select>
      <BootstrapForm.Label>Enter Loan Amount</BootstrapForm.Label>
      <BootstrapForm.Text></BootstrapForm.Text>
      <BootstrapForm.Control
        type="number"
        name="amount"
        value={loanAmount}
        onChange={handleLoanAmountChange}
        isInvalid={isError}
        min={0}
      />
      {isError ? (
        <p className={styles.errorMsg}>Please select an amount within limits</p>
      ) : null}
      <div className={styles.buttonGroup}>
        <Button
          variant="primary"
          type="submit"
          disabled={isError || loanAmount <= 0}
          className={styles.leftBtn}
        >
          Submit
        </Button>
        <Button variant="light" className={styles.rightBtn}>
          <Link to={`/customer/${id}`}>Cancel</Link>
        </Button>
      </div>
    </Form>
  );
};

export default NewLoanForm;
