/* This code is defining a set of styles using the `makeStyles` function from the
`@material-ui/core/styles` library. The styles are defined as an object with keys representing CSS
selectors and values representing CSS rules. These styles are then exported as a default module. The
styles are used to style the components in a React application. */
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 5,
    margin: '20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'right',
    padding: '10px 10px',
  },
  logout: {
    '@media (min-width: 7px)': {
      display: 'flex',
    },
    display: 'none',
    // paddingTop: '2rem',
    // paddingRight: '1.5rem',
    // color: "white",
    paddingLeft: '1.5rem',
    // borderRadius: '0.5rem',
    // marginBottom: "",
    backgroundColor: "#000000",
    color: "#ffffff",
    // transitionProperty: 'background-color',
    // transitionDuration: '200ms',
    // transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: '#000000',
    },
  },
  logoutMobile: {
    // paddingTop: '2rem',
    // paddingRight: '1.5rem',
    // color: "white",
    // paddingLeft: '1.5rem',
    borderRadius: '0.5rem',
    marginBottom: "",
    backgroundColor: '#ffffff',
    // color: "white",
    // transitionProperty: 'background-color',
    // transitionDuration: '200ms',
    // transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
  clearButton: {
    '@media (min-width: 7px)': {
      display: 'flex',
    },
    display: 'none',
    // paddingTop: '2rem',
    // paddingRight: '1.5rem',
    // paddingBottom: '2rem',
    // paddingLeft: '1.5rem',
    // borderRadius: '0.5rem',
    backgroundColor: "#000000",
    color: "#ffffff",
    // color: "white",
    // transitionProperty: 'background-color',
    // transitionDuration: '200ms',
    // transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: "#BDBDBD",
      // color: "#ffffff"
    },
  },
  clearButtonMobile: {
    // paddingTop: '2rem',
    // paddingRight: '1.5rem',
    // color: "white",
    // paddingLeft: '1.5rem',
    // borderRadius: '0.5rem',
    backgroundColor: "#000000",
    color: "#ffffff",
    // color: "white",
    // transitionProperty: 'background-color',
    // transitionDuration: '200ms',
    // transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {      
      backgroundColor: "#BDBDBD",
    },
  },

  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '150px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '420px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '10px',
},
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));