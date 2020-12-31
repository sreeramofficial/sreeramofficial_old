import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, CircularProgress } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

const StripeCheckout = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [ succeeded, setSucceeded ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ processing, setProcessing ] = useState(false);
  const [ disabled, setDisabled ] = useState(true);
  const [ clientSecret, setClientSecret ] = useState('');

  useEffect(() => {
    (async () => {
      const _res = await fetch("/api/stripe/intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [],
        }),
      });
      const data = await _res.json();
      setClientSecret(data.clientSecret);
    })();
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "12px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      // eslint-disable-next-line camelcase
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      onSuccess();
    }
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <CardElement id='card-element' options={cardStyle} onChange={handleChange} />
      <Button
        disabled={processing || disabled || succeeded}
        variant='contained'
        color='primary'
        id='submit'
        fullWidth
        onClick={handleSubmit}>
        {processing ? <CircularProgress size={20} /> : "Pay"}
      </Button>
      {error && <Alert severity='error' variant='filled'>{error}</Alert>}
      {!error && succeeded && <Alert severity='success' variant='filled'>Payment Success!</Alert>}
    </form>
  );
};

export default StripeCheckout;
