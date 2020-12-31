export default theme => ({
  social: {
    display: 'flex',
    // padding: 14,
    marginTop: 15,
    [theme.breakpoints.up('sm')]: {
      marginTop: 20,
    },
    justifyContent: 'center',
    width: '100%',
    // borderTop: 'solid 1px #e4e4e4',
    // background: theme.background.secondary,
  },
  socialLink: {
    margin: 1,
    fontSize: 0,
  },
  socialIcon: {
    height: 30,
    width: 30,
  },
});
