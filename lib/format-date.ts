export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const localeString = date.toLocaleString('default', { month: 'long' });

  return {
    iso: date.toISOString(),
    pretty: `${localeString} ${date.getDate()}, ${date.getFullYear()}`,
  };
};

export const formatPublishDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = {
    day: 'numeric' as const,
    month: 'short' as const,
    year: 'numeric' as const,
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const formatYouTubeDuration = (value: string) => {
  // PT13M21S or PT54S
  const [minutes] = value.replace('PT', '').split('M');

  if (/^\d+$/.test(minutes)) {
    return `${minutes} min`;
  }

  return `${parseInt(minutes, 10)} sec`;
};
