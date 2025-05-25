
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Validator {
  id: string;
  validator_address: string;
  name: string;
  commission: number;
  apy: number;
  total_staked: number;
  uptime: number;
  status: 'active' | 'inactive' | 'delinquent';
  identity_verified: boolean;
  website?: string;
  description?: string;
}

export const useValidators = () => {
  const [validators, setValidators] = useState<Validator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValidators = async () => {
      try {
        const { data, error } = await supabase
          .from('validators')
          .select('*')
          .eq('status', 'active')
          .order('apy', { ascending: false });

        if (error) {
          console.error('Error fetching validators:', error);
        } else {
          // Type cast the data properly
          const typedValidators: Validator[] = (data || []).map(validator => ({
            ...validator,
            status: validator.status as 'active' | 'inactive' | 'delinquent'
          }));
          setValidators(typedValidators);
        }
      } catch (error) {
        console.error('Error fetching validators:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchValidators();
  }, []);

  return {
    validators,
    loading,
  };
};
