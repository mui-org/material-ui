import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function CustomSurplusAvatars() {
  return (
    // @focus-start @padding 2
    <AvatarGroup
      renderSurplus={(surplus) => <span>+{surplus.toString()[0]}k</span>}
      total={4251}
    >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
    </AvatarGroup>
    // @focus-end
  );
}
