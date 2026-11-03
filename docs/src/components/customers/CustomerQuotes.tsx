import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const QUOTES = [
  // Using current Testimonials as placeholders just to visualize

  {
    quote:
      '"We\'ve relied on Material UI really heavily. I override a lot of default styles to try and make things our own, but the time we save with complex components like the Autocomplete and the Data Grid are so worth it. Every other library I try has 80% of what I\'m looking for when it comes to complex use cases, Material UI has it all under one roof which is a huge help for our small team."',
    profile: {
      avatarSrc: 'https://avatars.githubusercontent.com/u/21114044?s=58',
      avatarSrcSet: 'https://avatars.githubusercontent.com/u/21114044?s=116 2x',
      name: 'Kyle Gill',
      role: 'Engineer & Designer',
      company: (
        <img
          src="/static/branding/companies/particl-dark.svg"
          width="90"
          height="16"
          alt="Particl logo"
          loading="lazy"
          style={{
            marginLeft: '-12px',
            filter:
              'brightness(0) saturate(100%) invert(71%) sepia(5%) saturate(5550%) hue-rotate(182deg) brightness(102%) contrast(102%)',
          }}
        />
      ),
      gridArea: 'one',
    },
  },
  {
    quote:
      '"Material UI looks great and lets us deliver fast, thanks to their solid API design and documentation - it\'s refreshing to use a component library where you get everything you need from their site. We\'re extremely grateful to the team for the time and effort spent maintaining the project."',
    profile: {
      avatarSrc: 'https://avatars.githubusercontent.com/u/197016?s=58',
      avatarSrcSet: 'https://avatars.githubusercontent.com/u/197016?s=116 2x',
      name: 'Jean-Laurent de Morlhon',
      role: 'VP of Engineering',
      company: (
        <img
          src="/static/branding/companies/docker-blue.svg"
          width="81"
          height="21"
          alt="Docker logo"
          loading="lazy"
        />
      ),
      gridArea: 'two',
    },
  },
  {
    quote:
      '"Material UI offers a wide variety of high quality components that have allowed us to ship features faster. It has been used by more than a hundred engineers in our organization. What\'s more, Material UI\'s well architected customization system has allowed us to differentiate ourselves in the marketplace."',
    profile: {
      avatarSrc: 'https://avatars.githubusercontent.com/u/28296253?s=58',
      avatarSrcSet: 'https://avatars.githubusercontent.com/u/28296253?s=116 2x',
      name: 'Joona Rahko',
      role: 'Staff Software Engineer',
      company: (
        <img
          src="/static/branding/companies/unity-blue.svg"
          width="56"
          height="21"
          alt="Unity logo"
          loading="lazy"
        />
      ),
      gridArea: 'three',
    },
  },
  {
    quote:
      '"After much research on React component libraries, we decided to ditch our in-house library for Material UI, using its powerful customization system to implement our Design System. This simple move did a rare thing in engineering: it lowered our maintenance costs while enhancing both developer and customer experience. All of this was done without sacrificing the organization\'s branding and visual identity."',
    profile: {
      avatarSrc: 'https://avatars.githubusercontent.com/u/732422?s=58',
      avatarSrcSet: 'https://avatars.githubusercontent.com/u/732422?s=116 2x',
      name: 'Gustavo de Paula',
      role: 'Specialist Software Engineer',
      company: (
        <img
          src="/static/branding/companies/loggi-blue.svg"
          width="61"
          height="20"
          alt="Loggi logo"
          loading="lazy"
        />
      ),
      gridArea: 'four',
    },
  },
];

function Data({
  quote,
  profile,
}: {
  quote: string;
  profile: {
    avatarSrc: string;
    avatarSrcSet: string;
    name: string;
    role: string;
    gridArea: string;
    company?: React.ReactElement<unknown>;
  };
}) {
  const isFirstColumn = profile.gridArea === 'one';
  const isLastColumn = profile.gridArea === 'four';

  return (
    <Box
      sx={(theme) => ({
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        color: 'text.primary',
        backgroundColor: 'background.paper',
        background:
          isFirstColumn || isLastColumn
            ? `radial-gradient(#ebf5ff 1.8px, transparent 1.8px) 0% 50% / 22px 22px repeat,
              linear-gradient(180deg, ${(theme.vars || theme).palette.primary[50]} 5%, #FFF 20%)`
            : undefined,
        ...theme.applyDarkStyles({
          background:
            isFirstColumn || isLastColumn
              ? `radial-gradient(#131C23 1.8px, transparent 1.8px) 0% 50% / 22px 22px repeat,
                linear-gradient(180deg, #131C23 5%, #15181A 20%)`
              : undefined,
        }),
        gap: 2,
      })}
    >
      <div>{profile.company}</div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            width: '100%',
          }}
        >
          {quote}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <div>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              {profile.name}
            </Typography>
            <Typography variant="body2">{profile.role}</Typography>
          </div>
          <Avatar
            src={profile.avatarSrc}
            srcSet={profile.avatarSrcSet}
            sx={{
              boxShadow: 1,
              width: { xs: 40, md: isFirstColumn || isLastColumn ? 48 : 40 },
              height: { xs: 40, md: isFirstColumn || isLastColumn ? 48 : 40 },
            }}
            alt={`${profile.name}'s profile picture`}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default function CustomerQuotes() {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: '1px',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '3fr 3fr 3fr',
        },
        gridTemplateRows: {
          xs: 'auto',
          sm: 'auto',
          md: '50% 50%',
        },
        gridTemplateAreas: {
          xs: `
            'one'
            'two'
            'three'
            'four'
          `,
          sm: `
            'one two'
            'three four'
          `,
          md: `
            'one two four'
            'one three four'
          `,
        },
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'divider',
      }}
    >
      {QUOTES.map((item) => (
        <Box key={item.profile.name} sx={{ gridArea: item.profile.gridArea }}>
          <Data {...item} />
        </Box>
      ))}
    </Box>
  );
}
