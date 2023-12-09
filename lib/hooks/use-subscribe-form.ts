import { useRef, useState } from 'react';
import useSWR from 'swr';

import { fetcher } from '../fetcher';

export const useSubscribeForm = () => {
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');

  const { data } = useSWR<{ count: number }>('/api/subscribers', fetcher);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = async () => {
    setState('loading');

    const inputElement = inputRef.current;

    if (!inputElement) {
      return;
    }

    const response = await fetch('/api/subscribe', {
      body: JSON.stringify({ email: inputElement.value }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });

    const { error } = await response.json();

    if (!response.ok) {
      setMessage(error);
      setState('error');
    } else {
      inputElement.value = '';
      setState('success');
      setMessage('Thanks for subscribing!');
    }
  };

  return {
    data,
    hasError: state === 'error',
    inputRef,
    message,
    state,
    submit,
  };
};
