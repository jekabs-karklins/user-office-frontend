import { useEffect, useState } from 'react';

import { Review } from 'generated/sdk';
import { useDataApi } from 'hooks/common/useDataApi';

export function useReviewData(id: number) {
  const [reviewData, setReviewData] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  const api = useDataApi();

  useEffect(() => {
    setLoading(true);
    api()
      .getReview({ id })
      .then(data => {
        setReviewData(data.review as Review);
        setLoading(false);
      });
  }, [id, api]);

  return { loading, reviewData };
}
