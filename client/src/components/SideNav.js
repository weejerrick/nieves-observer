import React from "react";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import Calendar from "./Calendar";
import Container from "@material-ui/core/Container";
import Location from "./Location";
import TollIcon from "@material-ui/icons/Toll";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import AdjustIcon from "@material-ui/icons/Adjust";
import GitHubIcon from "@material-ui/icons/GitHub";
import logoLight from "../assets/logoLight.svg";
import logoDark from "../assets/logoDark.svg";
import SearchBar from "./SearchBar";
// import ObsStats from "./ObsStats";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  logo: {
    paddingTop: 8,
    marginLeft: 3,
    paddingBottom: 15,
  },
  options: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  icon: {
    minWidth: 35,
  },
  nav: {
    flexGrow: 1,
  },
  footer: {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 12,
  },
}));

const navObjects = [
  { text: "Deep Sky Objects", icon: <BubbleChartIcon />, link: "/" },
  { text: "Exoplanets", icon: <AdjustIcon />, link: "/exoplanets" },
  {
    text: "Eclipsing Binaries",
    icon: <TollIcon />,
    link: "/eclipsingbinaries",
  },
];

export default function SideNav(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        elevation={0}
        color="inherit"
      >
        <Toolbar>
          <Typography variant="subtitle1" className={classes.nav}>
            <Link
              component={RouterLink}
              color="inherit"
              to="/scheduler"
              style={{ textDecoration: "none" }}
            >
              Scheduler
            </Link>
          </Typography>
          <Tooltip title="See source on GitHub">
            <IconButton
              onClick={() => {
                console.log("github");
              }}
              href="https://github.com/weejerrick/nieves-observer"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle light/dark mode">
            <IconButton onClick={() => props.selectMode(!props.darkMode)}>
              {props.darkMode ? <WbSunnyIcon /> : <NightsStayIcon />}
            </IconButton>
          </Tooltip>
          <SearchBar handleSearch={(data) => props.handleSearch(data)} />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {/* <Container> */}
        <Link
          component={RouterLink}
          color="inherit"
          to="/"
          style={{ textDecoration: "none" }}
        >
          <img
            src={props.darkMode ? logoDark : logoLight}
            alt="logo"
            width={drawerWidth - 25}
            className={classes.logo}
          />
        </Link>

        <div />
        <div className={classes.options}>
          <Container>
            <Location
              locationSelection={(locationData) =>
                props.locationSelection(locationData)
              }
            />
            <Calendar
              dateSelection={(dateData) => props.dateSelection(dateData)}
            />
          </Container>
        </div>

        <Divider />
        <List>
          {navObjects.map((item, index) => (
            <Link
              component={RouterLink}
              color="inherit"
              to={item.link}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <ListItem button key={item.text}>
                <ListItemIcon className={classes.icon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>

        <div className={classes.footer}>
          <Container>
            <Typography variant="caption" style={{ fontWeight: 800 }}>
              {/* A full-stack app by Wee Jerrick */}
            </Typography>
          </Container>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
