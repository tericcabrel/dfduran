const isNewsletterEnabled = process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED === 'true';
const isProduction = process.env.NODE_ENV === 'production';

export { isNewsletterEnabled, isProduction };
