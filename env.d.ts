export type EnvironmentVariables = {
  SENDGRID_API_KEY: string;
  SENDGRID_LIST_ID: string;
  NEXT_PUBLIC_NEWSLETTER_ENABLED: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}

export {};
