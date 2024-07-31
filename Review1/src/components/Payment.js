import React, { useState } from 'react';
import '../Payment.css';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setShowPasswordDialog(true);
  };

  const confirmPayment = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setShowPasswordDialog(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    // Reset form
    setAmount('');
    setPassword('');
  };

  return (
    <div className="ant-payment-wrapper">
      <div className="ant-payment-card">
        <h2>Payment Details</h2>
        <form onSubmit={handlePayment} className="ant-payment-form">
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
              className="ant-payment-input"
            />
          </div>
          <div>
            <label>Payment Method</label>
            <div className="ant-payment-method-group">
              {['credit_card', 'debit_card', 'paypal'].map(method => (
                <div className="ant-payment-method-option" key={method}>
                  <input
                    type="radio"
                    id={method}
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor={method}>{method.replace('_', ' ').toUpperCase()}</label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="ant-payment-button">
            Pay Now
          </button>
        </form>
      </div>

      {showPasswordDialog && (
        <div className="ant-payment-password-dialog">
          <h3>Confirm Payment</h3>
          <p>Please enter your password to confirm the payment of ${amount} using {paymentMethod.replace('_', ' ')}.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="ant-payment-input"
          />
          <button
            onClick={confirmPayment}
            disabled={loading || !password}
            className="ant-payment-button"
          >
            {loading ? 'Processing...' : 'Confirm Payment'}
          </button>
        </div>
      )}

      {showToast && (
        <div className="ant-payment-success-toast">
          Payment confirmed successfully!
        </div>
      )}
    </div>
  );
};

export default Payment;