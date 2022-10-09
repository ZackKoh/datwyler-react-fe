import { useReducer } from 'react';

import { Form, redirect, Link } from 'react-router-dom';

import BootstrapForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from './new-customer.module.css';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await fetch('/api/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: updates.customerName,
      credit: parseInt(updates.creditLine),
    }),
  });
  return redirect(`/customer`);
};

const initialState = {
  customerName: {
    value: '',
    isError: false,
  },
  creditLine: {
    value: 0,
    isError: false,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'change': {
      return {
        ...state,
        [action.inputName]: {
          ...state[action.inputName],
          value: action.value,
        },
      };
    }
    case 'error': {
      return {
        ...state,
        [action.inputName]: {
          ...state[action.inputName],
          isError: true,
        },
      };
    }
    case 'error_clear': {
      return {
        ...state,
        [action.inputName]: {
          ...state[action.inputName],
          isError: false,
        },
      };
    }
    default:
      throw new Error('This action is not supported');
  }
};

const NewCustomer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const shouldDisableSubmit =
    state.customerName.value.length === 0 ||
    state.creditLine.value <= 0 ||
    state.customerName.isError ||
    state.creditLine.isError;

  const handleCustomerNameChange = (e) => {
    dispatch({
      type: 'change',
      inputName: 'customerName',
      value: e.target.value,
    });
    if (e.target.value.length <= 0) {
      dispatch({ type: 'error', inputName: 'customerName' });
    } else {
      dispatch({ type: 'error_clear', inputName: 'customerName' });
    }
  };

  const handleCreditLineValueChange = (e) => {
    dispatch({
      type: 'change',
      inputName: 'creditLine',
      value: e.target.value,
    });
    if (e.target.value.length <= 0 || e.target.value <= 0) {
      dispatch({ type: 'error', inputName: 'creditLine' });
    } else {
      dispatch({ type: 'error_clear', inputName: 'creditLine' });
    }
  };

  return (
    <Form method="post">
      <BootstrapForm.Label>Customer Name: </BootstrapForm.Label>
      {state.customerName.isError ? (
        <p className={styles.errorMsg}>This is required</p>
      ) : null}
      <BootstrapForm.Control
        type="text"
        name="customerName"
        value={state.customerName.value}
        onChange={handleCustomerNameChange}
        isInvalid={state.customerName.isError}
        required={true}
      />
      <BootstrapForm.Label>Provide Credit Line</BootstrapForm.Label>
      {state.creditLine.isError ? (
        <p className={styles.errorMsg}>
          This is required, and must be a value greater than zero
        </p>
      ) : null}
      <BootstrapForm.Control
        type="number"
        name="creditLine"
        value={state.creditLine.value}
        onChange={handleCreditLineValueChange}
        isInvalid={state.creditLine.isError}
        required={true}
      />
      <div className={styles.buttonGroup}>
        <Button
          type="submit"
          disabled={shouldDisableSubmit}
          className={styles.leftBtn}
        >
          Submit
        </Button>
        <Button variant="light" className={styles.rightBtn}>
          <Link to={`/`}>Cancel</Link>
        </Button>
      </div>
    </Form>
  );
};

export default NewCustomer;
