import { describe, it, expect } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import Avatar from '@mui/material/Avatar';
import AvatarGroup, { avatarGroupClasses as classes } from '@mui/material/AvatarGroup';
import describeConformance from '../../test/describeConformance';

describe('<AvatarGroup />', () => {
  const { render } = createRenderer();

  describeConformance(
    <AvatarGroup max={2}>
      <Avatar src="/fake.png" />
      <Avatar src="/fake.png" />
      <Avatar src="/fake.png" />
    </AvatarGroup>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiAvatarGroup',
      refInstanceof: window.HTMLDivElement,
      testVariantProps: { max: 10, spacing: 'small', variant: 'square' },
      slots: {
        surplus: { expectedClassName: classes.avatar },
      },
    }),
  );

  it('should render avatars with spacing of 0px when spacing is 0', () => {
    const { container } = render(
      <AvatarGroup spacing={0}>
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
      </AvatarGroup>,
    );

    const avatarGroupRoot = container.firstChild;
    const avatarGroupStyle = avatarGroupRoot.style.getPropertyValue('--AvatarGroup-spacing');

    expect(avatarGroupStyle).to.equal('0px');
  });

  it('should display all the avatars', () => {
    const { container } = render(
      <AvatarGroup max={3}>
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
      </AvatarGroup>,
    );
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(3);
    expect(container.querySelectorAll('img').length).to.equal(3);
    expect(container.textContent).to.equal('');
  });

  it('should display 2 avatars and "+2"', () => {
    const { container } = render(
      <AvatarGroup max={3}>
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
      </AvatarGroup>,
    );
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(3);
    expect(container.querySelectorAll('img').length).to.equal(2);
    expect(container.textContent).to.equal('+2');
  });

  it('should display custom surplus element if renderSurplus prop is passed', () => {
    const { container } = render(
      <AvatarGroup renderSurplus={(num) => <span>%{num}</span>} max={3}>
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
      </AvatarGroup>,
    );
    expect(container.textContent).to.equal('%2');
  });

  it('should respect total', () => {
    const { container } = render(
      <AvatarGroup total={10}>
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
      </AvatarGroup>,
    );
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(4);
    expect(container.querySelectorAll('img').length).to.equal(3);
    expect(container.textContent).to.equal('+7');
  });

  it('should respect both total and max', () => {
    const { container } = render(
      <AvatarGroup max={2} total={3}>
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
      </AvatarGroup>,
    );
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(2);
    expect(container.querySelectorAll('img').length).to.equal(1);
    expect(container.textContent).to.equal('+2');
  });

  it('should respect total and clamp down shown avatars', () => {
    const { container } = render(
      <AvatarGroup total={1}>
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
      </AvatarGroup>,
    );
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(1);
    expect(container.querySelectorAll('img').length).to.equal(1);
    expect(container.textContent).to.equal('');
  });

  it('should display extra if clamp max is >= total', () => {
    const { container } = render(
      <AvatarGroup total={10} max={10}>
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
      </AvatarGroup>,
    );
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(3);
    expect(container.querySelectorAll('img').length).to.equal(2);
    expect(container.textContent).to.equal('+8');
  });

  it('should display all avatars if total === max === children.length', () => {
    const { container } = render(
      <AvatarGroup total={4} max={4}>
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
      </AvatarGroup>,
    );
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(4);
    expect(container.querySelectorAll('img').length).to.equal(4);
    expect(container.textContent).to.equal('');
  });

  it('should display all avatars with default (circular) variant', () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar src="/fake.png" />
      </AvatarGroup>,
    );
    const avatarGroup = container.firstChild;
    const avatar = avatarGroup.firstChild;
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(
      avatarGroup.childNodes.length,
    );
    expect(avatar).to.have.class('MuiAvatar-circular');
    expect(avatar).not.to.have.class('MuiAvatar-rounded');
    expect(avatar).not.to.have.class('MuiAvatar-square');
  });

  it('should display all avatars with the specified variant', () => {
    const { container } = render(
      <AvatarGroup variant="square">
        <Avatar src="/fake.png" />
      </AvatarGroup>,
    );
    const avatarGroup = container.firstChild;
    const avatar = avatarGroup.firstChild;
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(
      avatarGroup.childNodes.length,
    );
    expect(avatar).to.have.class('MuiAvatar-square');
    expect(avatar).not.to.have.class('MuiAvatar-circular');
    expect(avatar).not.to.have.class('MuiAvatar-rounded');
  });

  it("should respect child's avatar variant prop if specified", () => {
    const { container } = render(
      <AvatarGroup variant="square">
        <Avatar src="/fake.png" variant="rounded" />
      </AvatarGroup>,
    );
    const avatarGroup = container.firstChild;
    const roundedAvatar = avatarGroup.firstChild;
    expect(roundedAvatar).to.have.class('MuiAvatar-rounded');
    expect(roundedAvatar).not.to.have.class('MuiAvatar-circular');
    expect(roundedAvatar).not.to.have.class('MuiAvatar-square');
  });
});
