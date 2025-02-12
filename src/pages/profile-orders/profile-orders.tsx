import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderHistoryThunk, orderHistorySelector } from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orderHistory: orders, loading } = useSelector(orderHistorySelector);

  useEffect(() => {
    dispatch(getOrderHistoryThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} loading={loading} />;
};
