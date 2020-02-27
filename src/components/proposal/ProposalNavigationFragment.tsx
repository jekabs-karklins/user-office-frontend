import {
  makeStyles,
  Button,
  CircularProgress,
  StandardProps
} from "@material-ui/core";
import { Fragment, Component } from "react";
import React from "react";
import { ButtonProps, ButtonClassKey } from "@material-ui/core/Button";

const ProposalNavigationFragment = (props: {
  back?: IButtonConfig;
  reset?: IButtonConfig;
  save?: IButtonConfig;
  saveAndNext?: IButtonConfig;
  isLoading: boolean;
  disabled?: boolean;
}) => {
  if (props.disabled === true) {
    return <div></div>;
  }
  const classes = makeStyles({
    buttons: {
      marginTop: "15px",
      display: "flex",
      justifyContent: "flex-end"
    },
    button: {
      margin: "25px 10px 0 10px",
      "&:first-child": {
        marginLeft: "0"
      },
      "&:last-child": {
        marginRight: "0"
      }
    },
    lastLeftButton: {
      marginRight: "auto"
    }
  })();

  const backbutton = props.back ? (
    <NavigButton
      onClick={() => props.back!.callback()}
      className={`${classes.button} ${classes.lastLeftButton}`}
      type="button"
      disabled={props.back.disabled}
      isbusy={props.back.isBusy}
    >
      {props.back.label || "Back"}
    </NavigButton>
  ) : null;
  const resetButton = props.reset ? (
    <NavigButton
      onClick={() => props.reset!.callback()}
      className={classes.button}
      type="button"
      disabled={props.reset.disabled}
      isbusy={props.reset.isBusy}
    >
      {props.reset.label || "Reset"}
    </NavigButton>
  ) : null;
  const saveButton = props.save ? (
    <NavigButton
      onClick={() => props.save!.callback()}
      className={classes.button}
      type="button"
      variant="contained"
      color="primary"
      disabled={props.save.disabled}
      isbusy={props.save.isBusy}
    >
      {props.save.label || "Save"}
    </NavigButton>
  ) : null;
  const saveAndNextButton = props.saveAndNext ? (
    <NavigButton
      onClick={() => props.saveAndNext!.callback()}
      className={classes.button}
      type="button"
      variant="contained"
      color="primary"
      disabled={props.saveAndNext.disabled}
      isbusy={props.saveAndNext.isBusy}
    >
      {props.saveAndNext.label || "Save and continue"}
    </NavigButton>
  ) : null;
  const buttonArea = props.isLoading ? (
    <CircularProgress />
  ) : (
    <Fragment>
      {backbutton}
      {resetButton}
      {saveButton}
      {saveAndNextButton}
    </Fragment>
  );

  return <div className={classes.buttons}>{buttonArea}</div>;
};

export default ProposalNavigationFragment;

interface IButtonConfig {
  callback: () => void;
  label?: string;
  disabled?: boolean;
  isBusy?: boolean;
}

class NavigButton extends Component<
  StandardProps<ButtonProps & { isbusy?: boolean }, ButtonClassKey>
> {
  render() {
    var { className, ...other } = this.props;
    return (
      <div className={className} style={{ position: "relative" }}>
        <Button {...other} />
        {this.props.isbusy && (
          <CircularProgress
            size={24}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: -12,
              marginLeft: -12
            }}
          />
        )}
      </div>
    );
  }
}