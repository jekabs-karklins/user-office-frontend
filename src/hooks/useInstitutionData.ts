import { useEffect, useState } from 'react';

import { Institution } from '../generated/sdk';
import { useDataApi } from './useDataApi';

export function useInstitutionData() {
  const [institutionData, setInstitutionData] = useState<Institution[] | null>(
    null
  );

  const api = useDataApi();

  useEffect(() => {
    api()
      .getInstitutions()
      .then(data => {
        setInstitutionData(data.institutions);
      });
  }, [api]);

  return { institutionData, setInstitutionData };
}
