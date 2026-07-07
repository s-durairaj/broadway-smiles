import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

function getSessionId(): string {
  const key = 'bs_session_id';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    supabase.from('page_views').insert({
      page: location.pathname,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      session_id: getSessionId(),
    });
  }, [location.pathname]);
}
