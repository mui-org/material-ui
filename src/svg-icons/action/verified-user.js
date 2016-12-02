import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionVerifiedUser = (props) => (
  <SvgIcon {...props}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
  </SvgIcon>
);
ActionVerifiedUser = pure(ActionVerifiedUser);
ActionVerifiedUser.displayName = 'ActionVerifiedUser';
ActionVerifiedUser.muiName = 'SvgIcon';

export default ActionVerifiedUser;
export {ActionVerifiedUser};
