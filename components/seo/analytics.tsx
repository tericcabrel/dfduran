import { isProduction } from '../../lib/env';

export const Analytics = () => {
  if (!isProduction) {
    console.log('Analytics is disabled for non production environment');

    return null;
  }

  return (
    <script
      async
      src="https://us.umami.is/script.js"
      data-website-id="c1821468-3637-4467-a2d7-0eb9702822b1"
    />
  );
};
