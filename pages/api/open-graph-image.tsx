/* eslint-disable @next/next/no-img-element */
import { Resvg } from '@resvg/resvg-js';
import { NextApiRequest, NextApiResponse } from 'next';
import satori from 'satori';

import { getAbsoluteURL } from 'lib/router-utils';
import theme from 'lib/theme';

const style = (style: React.CSSProperties) => style;

const stack = (style: React.CSSProperties = {}): React.CSSProperties => ({
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: '8px',
  ...style,
  display: 'flex',
});

const isString = (value: unknown): value is string => typeof value === 'string';

const styles = {
  container: style({
    color: theme.colors.gray['200'],
    display: 'flex',
    flexDirection: 'column',
    padding: '72px',
    position: 'relative',
  }),
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, date, readingTime, tags } = req.query;
  const computedTags = isString(tags) ? tags.split(',') : [];
  const hasTags = computedTags.length > 0;
  const isLong = title && title?.length > 35;

  const inter = await fetch('https://api.fontsource.org/v1/fonts/inter/latin-600-normal.ttf').then(
    (res) => res.arrayBuffer(),
  );

  const svg = await satori(
    <div style={styles.container}>
      <div style={stack()}>
        {date && readingTime && (
          <p style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 'bold' }}>
            {date} — {readingTime}
          </p>
        )}
      </div>

      <div style={stack({ gap: '32px', marginTop: '32px' })}>
        <h1
          style={{
            color: theme.colors.blue[600],
            fontSize: hasTags ? '80px' : '90px',
            maxWidth: isLong ? '100%' : '640px',
            minHeight: '160px',
          }}
        >
          {title}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {computedTags.map((tag) => (
            <div key={tag} style={{ display: 'flex', fontSize: '20px', opacity: 0.8 }}>
              <span style={{ color: theme.colors.blue[600] }}>#</span>
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div
        style={style({
          alignItems: 'center',
          display: 'flex',
          gap: '24px',
          marginTop: '64px',
          paddingLeft: '12px',
        })}
      >
        <div
          style={{
            alignItems: 'center',
            border: '4px solid',
            borderColor: theme.colors.blue[600],
            borderRadius: '50%',
            display: 'flex',
            height: '70px',
            justifyContent: 'center',
            overflow: 'hidden',
            width: '70px',
          }}
        >
          <img
            alt="Fabrice Durand Djiatsa"
            src={getAbsoluteURL('/static/images/durand-djiatsa.jpg')}
            width={50}
            height={50}
            style={{ borderRadius: '50%', objectFit: 'contain' }}
          />
        </div>
        <p style={{ fontSize: '20px' }}>Written by Fabrice Durand Djiatsa</p>
      </div>

      <div
        style={{
          background: theme.colors.blue[600],
          borderTopLeftRadius: '20px',
          bottom: '0px',
          color: 'black',
          fontSize: '24px',
          fontWeight: 'semibold',
          left: '860px',
          padding: '8px 16px',
          position: 'absolute',
        }}
      >
        https://dfdurand.com
      </div>
    </div>,
    {
      fonts: [
        {
          data: inter,
          name: 'Inter',
          style: 'normal',
          weight: 400,
        },
      ],
      height: 630,
      width: 1200,
    },
  );

  const resvg = new Resvg(svg, {
    background: theme.colors.gray['900'],
    fitTo: {
      mode: 'width',
      value: 2400,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate');
  res.setHeader('Content-Type', 'image/png');
  res.status(200).end(pngBuffer);
};

export default handler;
