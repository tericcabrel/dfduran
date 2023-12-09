import { PropsWithChildren } from 'react';

export const Emoji = (props: PropsWithChildren<{ label: string }>) => {
  const { label, ...rest } = props;

  return <span role="img" aria-label={label} {...rest} />;
};
