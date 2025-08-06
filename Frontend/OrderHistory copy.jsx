import React from 'react';
import styles from './OrderHistory.module.css'; // ✅ FIXED
import OrderCard from './OrderCard';

const dummyOrders = [
  {
    id: 'ORD123456',
    date: '2025-05-01',
    total: '$120.00',
    status: 'Shipped',
    items: ['T-shirt', 'Sneakers']
  },
  {
    id: 'ORD123457',
    date: '2025-04-21',
    total: '$85.50',
    status: 'Delivered',
    items: ['Backpack']
  }
];

const OrderHistory = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order History</h1>
      <div className={styles.ordersList}>
        {dummyOrders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
