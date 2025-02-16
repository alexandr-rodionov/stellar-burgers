import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderFeedThunk, orderFeedSelector } from '@slices';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orderFeed: orders, loading } = useSelector(orderFeedSelector);
  const [isRefresh, setIsRefresh] = useState(false);

  const handleGetFeeds = () => {
    setIsRefresh(true);
    dispatch(getOrderFeedThunk())
      .then(() => setIsRefresh(false))
      .catch(() => {
        console.error('Ошибка обновления!');
        setIsRefresh(false);
      });
  };

  useEffect(() => {
    dispatch(getOrderFeedThunk());
  }, [dispatch]);

  if (loading || isRefresh) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
