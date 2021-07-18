import React from 'react';
import { styled } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withPrefix, navigate } from 'gatsby';

const PREFIX = 'Iframe';

const classes = {
  iframe: `${PREFIX}-iframe`,
  loader: `${PREFIX}-loader`
};

const Root = styled('div')({
  [`& .${classes.iframe}`]: {
    display: 'block',
    width: '100%',
    minHeight: 400,
    maxHeight: 'calc(100vh - 187px)',
  },
  [`& .${classes.loader}`]: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 400,
    alignItems: 'center',
  },
});

const onPathnameChange = ({ pathname, search }) => {
  // After logout
  if (pathname === '/') {
    window.location = withPrefix('/');
    return;
  }

  // For Dokan
  // Contributor theme edit /items/material-dashboard/edit/
  if (/^\/items\/(.*)\/edit\/$/.test(pathname)) {
    return;
  }

  const match = /^(\/items\/|\/contributors\/|\/order-cart\/|\/my-account\/lost-password\/)/.test(
    pathname,
  );

  if (match) {
    navigate(`${pathname}${search}`);
    return;
  }

  const orderDownload = /^\/order-payment\/order-received\/(.*)\/$/.exec(pathname);

  if (orderDownload) {
    const orderId = parseInt(orderDownload[1], 10);
    const key = search.replace(/^\?key=/, '');
    navigate(`/order-download/?orderId=${orderId}&key=${key}`);
  }
};

function Iframe(props) {

  const [loaded, setLoaded] = React.useState(false);
  const [iframeHeight, setIframeHeight] = React.useState(null);

  React.useEffect(() => {
    const handler = (event) => {
      console.log('event.data', event.data);
      const scrollHeight = event.data.scrollHeight;

      if (scrollHeight) {
        setIframeHeight(scrollHeight);
      }

      if (event.data.redirect) {
        window.location = event.data.redirect;
      }

      if (event.data.pathname) {
        onPathnameChange({
          pathname: event.data.pathname,
          search: event.data.search,
        });
      }
    };

    window.addEventListener('message', handler, false);

    return () => {
      window.removeEventListener('message', handler, false);
    };
  }, []);

  return (
    <Root>
      {loaded === false ? (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      ) : null}
      <iframe
        className={classes.iframe}
        title="body"
        style={{
          visibility: loaded ? 'visible' : 'hidden',
          height: loaded ? null : 100,
          minHeight: iframeHeight,
        }}
        onLoad={() => {
          if (props.onLoad) {
            props.onLoad();
          }
          setLoaded(true);
        }}
        frameBorder="0"
        {...props}
      />
    </Root>
  );
}

export default Iframe;
