import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { Fragment, useState, useCallback } from 'react';

const defaultOptions = {
  title: '',
  description: '',
  confirmationText: 'OK',
  cancellationText: 'Cancel',
  dialogProps: {},
  onClose: (): void => {},
  onCancel: (): void => {},
};
//
const withConfirm = <T extends unknown>(
  WrappedComponent: (props: T) => JSX.Element
) => (props: Omit<T, 'confirm'>): JSX.Element => {
  const classes = makeStyles(() => ({
    title: {
      marginTop: '12px',
    },
  }))();
  const [onConfirm, setOnConfirm] = useState<Function | null>(null);
  const [options, setOptions] = useState(defaultOptions);
  const {
    title,
    description,
    confirmationText,
    cancellationText,
    dialogProps,
    onClose,
    onCancel,
  } = options;
  const handleClose = useCallback(() => {
    onClose();
    setOnConfirm(null);
  }, [onClose]);
  const handleCancel = useCallback(() => {
    onCancel();
    handleClose();
  }, [onCancel, handleClose]);
  const handleConfirm = useCallback(
    (...args) => {
      if (onConfirm) {
        onConfirm(...args);
      }
      handleClose();
    },
    [onConfirm, handleClose]
  );
  /* Returns function opening the dialog, passed to the wrapped component. */
  const confirm = useCallback(
    (onConfirm, options: Options) => (): void => {
      setOnConfirm(() => onConfirm);
      setOptions({ ...defaultOptions, ...options });
    },
    []
  );

  // @ts
  return (
    <Fragment>
      {/* 
      // @ts-ignore-line */}
      <WrappedComponent {...props} confirm={confirm} />
      <Dialog
        fullWidth
        {...dialogProps}
        open={!!onConfirm}
        onClose={handleCancel}
      >
        {title && <DialogTitle className={classes.title}>{title}</DialogTitle>}
        {description && (
          <DialogContent>
            <DialogContentText>{description}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCancel}>{cancellationText}</Button>
          <Button onClick={handleConfirm} color="primary">
            {confirmationText}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

interface Options {
  title: string;
  description: string;
  confirmationText?: string;
  cancellationText?: string;
  dialogProps?: object;
  onClose?: () => void;
  onCancel?: () => void;
}

export type WithConfirmType = (
  callback: () => void,
  params: Options
) => Function;

export default withConfirm;
