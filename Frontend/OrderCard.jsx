import React from 'react';
import styles from './OrderCard.module.css';

const OrderCard = ({ order }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.orderId}>#{order.id}</span>
        <span className={styles.status}>{order.status}</span>
      </div>
      <div className={styles.details}>
        <div><strong>Date:</strong> {order.date}</div>
        <div><strong>Total:</strong> {order.total}</div>
        <div><strong>Items:</strong> {order.items.join(', ')}</div>
      </div>
    </div>
  );
};

export default OrderCard;
