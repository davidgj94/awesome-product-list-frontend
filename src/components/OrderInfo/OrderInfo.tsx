import React from 'react';
import styles from './styles.module.css';

interface IOrderInfoProps {
  img: string;
  text: string;
}

const OrderInfo: React.FC<IOrderInfoProps> = ({ img, text }) => {
  return (
    <div className={`${styles.recentOrders}`}>
      <img src={img} className={`${styles.recentOrderImg}`} alt="icon" />
      <p className={`${styles.recentOrdersText}`}>{text}</p>
    </div>
  );
};

export default OrderInfo;
