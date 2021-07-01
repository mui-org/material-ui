import * as React from 'react';
import {
  AppBar,
  Avatar,
  Backdrop,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  ClickAwayListener,
  Collapse,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Divider,
  Drawer,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Fade,
  FormControlLabel,
  FormGroup,
  Grid,
  ImageList,
  ImageListItem,
  Grow,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  MobileStepper,
  Paper,
  Popover,
  Select,
  Snackbar,
  SnackbarContent,
  SwipeableDrawer,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import { ButtonBaseActions } from '@material-ui/core/ButtonBase';
import { IconButtonProps } from '@material-ui/core/IconButton';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import { expectType } from '@material-ui/types';

const log = console.log;
const FakeIcon = () => <div>ICON</div>;

const TestOverride = React.forwardRef<HTMLDivElement, { x?: number }>((props, ref) => (
  <div ref={ref} />
));

const AppBarTest = () => (
  <AppBar position="static">
    <Toolbar>
      <IconButton color="inherit" aria-label="menu">
        <FakeIcon />
      </IconButton>
      <Typography variant="h6" color="inherit">
        Title
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
);

const AvatarTest = () => (
  <div>
    <Avatar
      ref={(elem) => {
        expectType<HTMLDivElement | null, typeof elem>(elem);
      }}
      onClick={(event) => {
        expectType<React.MouseEvent<HTMLDivElement, MouseEvent>, typeof event>(event);
        log(event);
      }}
      alt="Image Alt"
      src="example.jpg"
    />
    <Avatar<'button'>
      component="button"
      ref={(elem) => {
        expectType<HTMLButtonElement | null, typeof elem>(elem);
      }}
      onClick={(event) => {
        expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof event>(event);
        log(event);
      }}
      alt="Image Alt"
      src="example.jpg"
    />
    <Avatar
      component="button"
      ref={(elem: HTMLButtonElement) => {}}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => log(event)}
      alt="Image Alt"
      src="example.jpg"
    />
    <Avatar component={TestOverride} x={3} alt="Image Alt" src="example.jpg" />
    <Avatar<typeof TestOverride>
      component={TestOverride}
      ref={(elem) => {
        expectType<HTMLDivElement | null, typeof elem>(elem);
      }}
      x={3}
      alt="Image Alt"
      src="example.jpg"
    />
    {/* @ts-expect-error onClick isn't allowed since we're overriding with a component that doesn't have that prop: */}
    <Avatar component={TestOverride} onClick={log} />
  </div>
);

const AvatarClassName = () => <Avatar className="foo" />;

const BadgeTest = () => (
  <Badge badgeContent={4} color="primary">
    <FakeIcon />
  </Badge>
);

const BottomNavigationTest = () => {
  const value = 123;

  return (
    <BottomNavigation value={value} onChange={(e) => log(e)} showLabels>
      <BottomNavigationAction label="Recents" icon={<FakeIcon />} />
      <BottomNavigationAction label="Favorites" />
      <BottomNavigationAction label={<span>Nearby</span>} icon={<FakeIcon />} />
    </BottomNavigation>
  );
};

const IconButtonTest = () => (
  <div>
    <IconButton aria-label="delete">
      <FakeIcon />
    </IconButton>
    <IconButton aria-label="delete" disabled>
      <FakeIcon />
    </IconButton>
    <IconButton color="secondary" aria-label="add an alarm">
      <FakeIcon />
    </IconButton>
    <IconButton color="inherit" aria-label="add to shopping cart">
      <FakeIcon />
    </IconButton>
    <IconButton color="primary" aria-label="add to shopping cart">
      <FakeIcon />
    </IconButton>
    {() => {
      const ForwardedLink = React.forwardRef<HTMLAnchorElement, ReactRouterLinkProps>(
        (props, ref) => <ReactRouterLink {...props} innerRef={ref} />,
      );
      const ExtendedIconButton: React.FC<IconButtonProps<typeof ForwardedLink>> = (props) => (
        <IconButton component={ForwardedLink} {...props} />
      );
      return (
        <ExtendedIconButton color="secondary" aria-label="Go to top page." to="/" target="_self">
          <FakeIcon />
        </ExtendedIconButton>
      );
    }}
  </div>
);

const CardTest = () => (
  <Card>
    <CardContent>
      <Typography variant="body1">Word of the Day</Typography>
      <Typography variant="h5" component="h2">
        be-nev-o-lent
      </Typography>
      <Typography variant="body1">adjective</Typography>
      <Typography component="p">
        well meaning and kindly.
        <br />a benevolent smile
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
);

const CardMediaTest = () => (
  <Card>
    <CardHeader
      avatar={<Avatar aria-label="recipe">R</Avatar>}
      title="Shrimp and Chorizo Paella"
      subheader="September 14, 2016"
    />
    <CardMedia image="src.png" component="div">
      <img src="image/src.png" alt="Contemplative Reptile" />
    </CardMedia>
    <CardContent>
      <Typography component="p">
        This impressive paella is a perfect party dish and a fun meal to cook together with your
        guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FakeIcon />
      </IconButton>
      <IconButton aria-label="share">
        <FakeIcon />
      </IconButton>
      <IconButton aria-label="show more">
        <FakeIcon />
      </IconButton>
    </CardActions>
    <Collapse in timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph variant="body2">
          Method:
        </Typography>
        <Typography paragraph>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
          minutes.
        </Typography>
        <Typography paragraph>
          Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat.
          Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6
          to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo
          in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
          stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and
          remaining 4 1/2 cups chicken broth; bring to a boil.
        </Typography>
        <Typography paragraph>
          Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
          without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
          medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
          again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes
          more. (Discard any mussels that don’t open.)
        </Typography>
        <Typography>
          Set aside off of the heat to let rest for 10 minutes, and then serve.
        </Typography>
      </CardContent>
    </Collapse>
  </Card>
);

const ChipsTest = () => (
  <div>
    <Chip label="Basic Chip" />
    <Chip avatar={<Avatar>M</Avatar>} label="Clickable Chip" onClick={(e) => log(e)} />
    <Chip avatar={<Avatar src="image.bmp" />} label="Deletable Chip" onDelete={(e) => log(e)} />
    <Chip
      avatar={
        <Avatar>
          <FakeIcon />
        </Avatar>
      }
      label="Clickable Deletable Chip"
      onClick={(e) => log(e)}
      onDelete={(e) => log(e)}
    />
  </div>
);

const DialogTest = () => {
  const emails = ['username@gmail.com', 'user02@gmail.com'];
  return (
    <Dialog onClose={(event) => log(event)} open>
      <DialogTitle>Set backup account</DialogTitle>
      <div>
        <List>
          {emails.map((email) => (
            <ListItem button onClick={(e) => log(e)} key={email}>
              <ListItemAvatar>
                <Avatar>
                  <FakeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItem>
          ))}
          <ListItem
            ref={(elem) => {
              expectType<HTMLLIElement | null, typeof elem>(elem);
            }}
            onClick={(e) => {
              expectType<React.MouseEvent<HTMLLIElement, MouseEvent>, typeof e>(e);
              log(e);
            }}
          >
            <ListItemIcon>
              <FakeIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem
            button
            ref={(elem) => {
              expectType<HTMLDivElement | null, typeof elem>(elem);
            }}
            onClick={(e) => {
              expectType<React.MouseEvent<HTMLDivElement, MouseEvent>, typeof e>(e);
              log(e);
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <FakeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="add account" />
          </ListItem>
          <ListItem<'a'>
            component="a"
            ref={(elem) => {
              expectType<HTMLAnchorElement | null, typeof elem>(elem);
            }}
            onClick={(e) => {
              expectType<React.MouseEvent<HTMLAnchorElement, MouseEvent>, typeof e>(e);
              log(e);
            }}
            button
          >
            <ListItemIcon>
              <FakeIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FakeIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
        </List>
      </div>
      <DialogContent>
        <DialogContentText variant="body2" color="primary">
          Some text
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

const DividerTest = () => (
  <div>
    <Divider />
    <Divider light />
  </div>
);

const DrawerTest = () => {
  const open = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };
  return (
    <div>
      <Drawer
        variant="persistent"
        open={open.left}
        onClose={(event) => log(event)}
        onClick={(e) => log(e)}
      >
        List
      </Drawer>
      <Drawer
        variant="temporary"
        anchor="top"
        open={open.top}
        onClose={(event) => log(event)}
        onClick={(e) => log(e)}
        ModalProps={{
          hideBackdrop: true,
        }}
      >
        List
      </Drawer>
      <Drawer
        anchor="bottom"
        variant="temporary"
        open={open.bottom}
        onClose={(event) => log(event)}
        onClick={(e) => log(e)}
      >
        List
      </Drawer>
      <Drawer
        variant="persistent"
        anchor="right"
        open={open.right}
        onClose={(event) => log(event)}
        onClick={(e) => log(e)}
      >
        List
      </Drawer>
    </div>
  );
};

const SwipeableDrawerTest = () => {
  const open = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };
  return (
    <div>
      <SwipeableDrawer
        open={open.left}
        onClose={(event) => log(event)}
        onClick={(e) => log(e)}
        onOpen={(e) => log(e)}
      >
        List
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="top"
        open={open.top}
        onClose={(event) => log(event)}
        onClick={(e) => log(e)}
        onOpen={(e) => log(e)}
        ModalProps={{
          hideBackdrop: true,
        }}
      >
        List
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="bottom"
        open={open.bottom}
        onClose={(event) => log(event)}
        onClick={(e) => log(e)}
        onOpen={(e) => log(e)}
      >
        List
      </SwipeableDrawer>
      <SwipeableDrawer
        variant="temporary"
        anchor="right"
        open={open.right}
        onClose={(event) => log(event)}
        onClick={(e) => log(e)}
        onOpen={(e) => log(e)}
      >
        List
      </SwipeableDrawer>
    </div>
  );
};

const AccordionTest = () => (
  <div>
    <Accordion onChange={(e) => log(e)} expanded disabled>
      <AccordionSummary />
      <AccordionDetails />
    </Accordion>
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<FakeIcon />}>
        <Typography>...</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>...</Typography>
      </AccordionDetails>
      <AccordionActions>
        <Button size="small">Save</Button>
      </AccordionActions>
    </Accordion>
  </div>
);

const GridTest = () => (
  <Grid component={Paper} container>
    <Grid item xs={12}>
      ...
    </Grid>
    <Grid item sm={12}>
      ...
    </Grid>
    <Grid item xl>
      ...
    </Grid>
    <Grid item style={{ color: 'red' }}>
      ...
    </Grid>
  </Grid>
);

const ImageListTest = () => (
  <ImageList rowHeight={160} cols={3} onClick={(e) => log(e)}>
    <ImageListItem cols={1} rows={4} onClick={(e) => log(e)}>
      <img src="img.png" alt="alt text" />
    </ImageListItem>
    ,
  </ImageList>
);

const ListTest = () => (
  <List>
    {[0, 1, 2, 3].map((value) => (
      <ListItem dense button selected={false} key={value} onClick={(e) => log(e)}>
        <Checkbox checked tabIndex={-1} disableRipple />
        <ListItemText primary={`Line item ${value + 1}`} />
        <ListItemSecondaryAction>
          <IconButton aria-label="comments">
            <FakeIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
    <ListItem ContainerComponent="div" ContainerProps={{ className: 'demo' }}>
      an item
    </ListItem>
  </List>
);

const MenuTest = () => {
  const anchorEl = document.getElementById('foo')!;
  const options = [
    'Show all notification content',
    'Hide sensitive notification content',
    'Hide all notification content',
  ];
  const buttonActionRef = React.useRef<ButtonBaseActions | null>(null);

  return (
    <Menu
      id="lock-menu"
      anchorEl={anchorEl}
      open
      onClose={(event) => log(event)}
      PopoverClasses={{ paper: 'foo' }}
    >
      {options.map((option, index) => (
        <MenuItem
          key={option}
          selected={false}
          ref={(elem) => {
            expectType<HTMLLIElement | null, typeof elem>(elem);
          }}
          onClick={(e) => {
            expectType<React.MouseEvent<HTMLLIElement, MouseEvent>, typeof e>(e);
            log(e);
          }}
        >
          {option}
        </MenuItem>
      ))}
      <MenuItem<'a'>
        action={(action) => {
          buttonActionRef.current = action;
        }}
        component="a"
        ref={(elem) => {
          expectType<HTMLAnchorElement | null, typeof elem>(elem);
        }}
        onClick={(e) => {
          expectType<React.MouseEvent<HTMLAnchorElement, MouseEvent>, typeof e>(e);
          log(e);
        }}
      >
        Link Item
      </MenuItem>
      <MenuItem
        ref={(elem) => {
          expectType<HTMLLIElement | null, typeof elem>(elem);
        }}
      />
      <MenuItem
        action={(action) => {
          buttonActionRef.current = action;
        }}
        ref={(elem) => {
          // inferred from `button={false}` instead of `action`
          expectType<HTMLLIElement | null, typeof elem>(elem);
        }}
      />
    </Menu>
  );
};

const CircularProgressTest = () => (
  <div>
    <CircularProgress />
    <CircularProgress size={50} />
    <CircularProgress color="secondary" />
    <CircularProgress color="secondary" size={50} />
  </div>
);

const LinearProgressTest = () => (
  <div>
    <LinearProgress variant="determinate" value={12} />
    <LinearProgress color="secondary" variant="determinate" value={76} />
  </div>
);

const SelectionControlTest = () => {
  const state = {
    checkedA: true,
    checkedB: false,
    checkedF: true,
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    log({ [event.target.name]: event.target.checked });

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
            value="checkedA"
          />
        }
        label="Option A"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            value="checkedB"
          />
        }
        label="Option B"
      />
      <FormControlLabel control={<Checkbox value="checkedC" />} label="Option C" />
      <FormControlLabel disabled control={<Checkbox value="checkedD" />} label="Disabled" />
      <FormControlLabel disabled control={<Checkbox checked value="checkedE" />} label="Disabled" />
      <FormControlLabel
        disabled
        control={<Checkbox checked value="checkedE" indeterminate />}
        label="Indeterminate"
      />
      <FormControlLabel
        control={<Checkbox checked onChange={handleChange} name="checkedF" value="checkedF" />}
        label="Custom color"
      />
    </FormGroup>
  );
};

const SwitchTest = () => {
  const state = {
    checkedA: true,
    checkedB: false,
    checkedE: true,
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    log({ [event.target.name]: event.target.checked });

  return (
    <div>
      <Switch
        checked={state.checkedA}
        onChange={handleChange}
        name="checkedA"
        aria-label="checkedA"
      />
      <Switch
        checked={state.checkedB}
        onChange={handleChange}
        name="checkedB"
        aria-label="checkedB"
      />
      <Switch checked={false} aria-label="checkedC" disabled />
      <Switch checked aria-label="checkedD" disabled />
      <Switch
        checked={state.checkedE}
        onChange={handleChange}
        name="checkedE"
        aria-label="checkedD"
      />
    </div>
  );
};

const SnackbarTest = () => (
  <div>
    <Button onClick={(e) => log(e)}>Open simple snackbar</Button>
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open
      autoHideDuration={6000}
      onClose={(event) => log(event)}
      ContentProps={
        {
          // 'aria-describedby': 'message-id',
          // ^ will work once https://github.com/DefinitelyTyped/DefinitelyTyped/pull/22582 is merged.
        }
      }
      message={<span id="message-id">Note archived</span>}
      action={[
        <Button key="undo" color="secondary" size="small" onClick={(e) => log(e)}>
          UNDO
        </Button>,
        <IconButton key="close" aria-label="close" color="inherit" onClick={(e) => log(e)}>
          <FakeIcon />
        </IconButton>,
      ]}
    />
  </div>
);

const SnackbarContentTest = () => {
  const action = (
    <Button color="secondary" size="small">
      lorem ipsum dolorem
    </Button>
  );
  return (
    <div>
      <SnackbarContent message="I love snacks." action={action} />
      <SnackbarContent
        message={
          'I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate.'
        }
      />
      <SnackbarContent message="I love candy. I love cookies. I love cupcakes." action={action} />
      <SnackbarContent
        message={
          'I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate.'
        }
        action={action}
      />
    </div>
  );
};

const StepperTest = () =>
  class DotsMobileStepper extends React.Component<{
    classes: { root: string };
  }> {
    state = {
      activeStep: 0,
    };

    handleNext = () => {
      this.setState({
        activeStep: this.state.activeStep + 1,
      });
    };

    handleBack = () => {
      this.setState({
        activeStep: this.state.activeStep - 1,
      });
    };

    render() {
      const classes = this.props.classes;
      const defaultProps = {
        steps: 2,
        nextButton: <Button>Next</Button>,
        backButton: <Button>Back</Button>,
      };
      return (
        <MobileStepper
          {...defaultProps}
          variant="dots"
          steps={6}
          position="static"
          activeStep={this.state.activeStep}
          className={classes.root}
        />
      );
    }
  };

const TableTest = () => {
  const styles = (theme: Theme) => {
    const backgroundColor: string = theme.palette.secondary.light;
    return createStyles({
      paper: {
        width: '100%',
        marginTop: theme.spacing(3),
        backgroundColor,
        overflowX: 'auto',
      },
    });
  };

  let id = 0;
  function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
  }

  const data = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
};

const TextFieldTest = () => (
  <div>
    <TextField id="name" label="Name" value="Alice" />
    <TextField id="name" label={<strong>Name</strong>} value="Alice" />
    <TextField
      id="name"
      label="Name"
      value="Alice"
      onChange={(event) => log({ name: event.currentTarget.value })}
    />
    <TextField id="name" label="Name" value="Alice" InputProps={{ classes: { root: 'foo' } }} />
    <TextField
      type="number"
      inputProps={{
        min: '0',
        max: '10',
        step: '1',
        style: {
          // just a long css property to test autocompletion
          WebkitAnimationIterationCount: 0,
        },
      }}
    />
    <Input inputComponent="input" />
  </div>
);

const SelectTest = () => (
  <Select input={<Input />} value={10} onChange={(e) => log(e.currentTarget.value)}>
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
);

const InputAdornmentTest = () => (
  <InputAdornment position="end" onClick={() => alert('Hello')}>
    Some Icon
  </InputAdornment>
);

const TooltipComponentTest = () => (
  <div>
    <Tooltip id="tooltip-top-start" title="Add" placement="top-start">
      <Button>top-start</Button>
    </Tooltip>
    <Tooltip id="tooltip-top-start" title={<strong>Add</strong>} placement="top-start">
      <Button>top-start</Button>
    </Tooltip>
  </div>
);

const ClickAwayListenerComponentTest = () => (
  <ClickAwayListener onClickAway={() => {}}>
    <div />
  </ClickAwayListener>
);

const TransitionTest = () => (
  <React.Fragment>
    <Fade in={false}>
      <div />
    </Fade>
    <Collapse in={false} mountOnEnter unmountOnExit timeout={200}>
      <div />
    </Collapse>
    <Grow in={false} timeout="auto" onEnter={() => {}}>
      <div />
    </Grow>
  </React.Fragment>
);

const BackdropTest = () => <Backdrop open onTouchMove={() => {}} />;

const PopoverTest = () => <Popover open />;

const InputLabelTest = () => (
  <InputLabel
    classes={{
      root: 'foo',
      asterisk: 'foo',
      disabled: 'foo',
      error: 'foo',
      filled: 'foo',
      focused: 'foo',
      required: 'foo',
    }}
  />
);

const LinkTest = () => {
  const dudUrl = 'javascript';
  return (
    <Typography>
      <Link href={dudUrl}>Link</Link>
      <Link href={dudUrl} color="inherit">
        inherit
      </Link>
      <Link href={dudUrl} variant="body1">
        body1
      </Link>
    </Typography>
  );
};

const refTest = () => {
  // for a detailed explanation of refs in react see https://github.com/mui-org/material-ui/pull/15199
  const genericRef = React.createRef<Element>();
  const divRef = React.createRef<HTMLDivElement>();
  const inputRef = React.createRef<HTMLInputElement>();

  // @ts-expect-error too generic
  <Paper ref={genericRef} />;
  <Paper ref={divRef} />;
  // undesired: throws when assuming inputRef.current.value !== undefined
  <Paper ref={inputRef} />;
  // recommended: soundness is the responsibility of the dev
  // alternatively use React.useRef<unknown>()  or React.createRef<unknown>()
  <Paper
    ref={(ref) => {
      // with runtime overhead, sound usage
      if (ref instanceof HTMLInputElement) {
        const i: number = ref.valueAsNumber;
      }
      // unsafe casts, sound usage, no runtime overhead
      const j: number = (ref as HTMLInputElement).valueAsNumber;
      // unsafe casts, unsound usage, no runtime overhead
      const k: number = (ref as any).valueAsNumber;
      // @ts-expect-error unsound usage, no runtime overhead, least syntax
      const n: number = ref.valueAsNumber;
    }}
  />;
};

const CssBaselineTest = () => <CssBaseline>Test</CssBaseline>;

const ScopedCssBaselineTest = () => <ScopedCssBaseline>Test</ScopedCssBaseline>;
