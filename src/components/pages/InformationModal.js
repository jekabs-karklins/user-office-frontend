import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import parse from "html-react-parser";

const useStyles = makeStyles(theme => ({
  buttonLink: {
    background: "none",
    border: "none",
    padding: 0,
    fontSize: "8px;",
    fontFamily: "arial",
    color: theme.palette.primary.main,
    textDecoration: "underline",
    cursor: "pointer"
  }
}));

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function InformationDialog(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (!props.text) {
    return null;
  }
  return (
    <div>
      <Button
        className={classes.buttonLink}
        onClick={handleClickOpen}
        style={props.linkStyle}
      >
        {props.linkText}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <Typography gutterBottom>{parse(props.text)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}