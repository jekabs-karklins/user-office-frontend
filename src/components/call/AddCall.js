import DateFnsUtils from "@date-io/date-fns";
import { getTranslation } from "@esss-swap/duo-localisation";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { useSnackbar } from "notistack";
import React from "react";
import * as Yup from "yup";
import { useDataApi } from "../../hooks/useDataApi";
import FormikUICustomDatePicker from "../common/FormikUICustomDatePicker";

const useStyles = makeStyles(theme => ({
  cardHeader: {
    fontSize: "18px",
    padding: "22px 0 0 12px"
  },
  heading: {
    textAlign: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function AddCall(props) {
  const classes = useStyles();
  const api = useDataApi();
  const { enqueueSnackbar } = useSnackbar();
  const currentDay = new Date();

  return (
    <Container component="main" maxWidth="xs">
      <Formik
        initialValues={{
          shortCode: "",
          start: currentDay,
          end: currentDay,
          startReview: currentDay,
          endReview: currentDay,
          startNotify: currentDay,
          endNotify: currentDay,
          cycleComment: "",
          surveyComment: ""
        }}
        onSubmit={async (values, actions) => {
          const {
            shortCode,
            start,
            end,
            startReview,
            endReview,
            startNotify,
            endNotify,
            cycleComment,
            surveyComment
          } = values;
          await api()
            .createCall({
              shortCode,
              startCall: start,
              endCall: end,
              startReview,
              endReview,
              startNotify,
              endNotify,
              cycleComment,
              surveyComment
            })
            .then(data =>
              data.createCall.error
                ? enqueueSnackbar(getTranslation(data.createCall.error), {
                    variant: "error"
                  })
                : null
            );
          actions.setSubmitting(false);
          props.close();
        }}
        validationSchema={Yup.object().shape({
          shortCode: Yup.string().required("Short Code is required"),
          start: Yup.date().required("Date is required"),
          end: Yup.date().required("Date is required"),
          startReview: Yup.date().required("Date is required"),
          endReview: Yup.date().required("Date is required"),
          startNotify: Yup.date().required("Date is required"),
          endNotify: Yup.date().required("Date is required"),
          cycleComment: Yup.string().required("Date is required"),
          surveyComment: Yup.string().required("Date is required")
        })}
      >
        {({ values, errors, handleChange }) => (
          <Form>
            <Typography className={classes.cardHeader}>
              Call information
            </Typography>

            <Field
              name="shortCode"
              label="Short Code"
              type="text"
              component={TextField}
              margin="normal"
              fullWidth
              data-cy="short-code"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Field
                name="start"
                label="Start"
                component={FormikUICustomDatePicker}
                margin="normal"
                fullWidth
                data-cy="start-date"
              />

              <Field
                name="end"
                label="End"
                component={FormikUICustomDatePicker}
                margin="normal"
                fullWidth
                data-cy="end-date"
              />
              <Field
                name="startReview"
                label="Start of review"
                component={FormikUICustomDatePicker}
                margin="normal"
                fullWidth
                data-cy="start-review"
              />
              <Field
                name="endReview"
                label="End of review"
                component={FormikUICustomDatePicker}
                margin="normal"
                fullWidth
              />
              <Field
                name="startNotify"
                label="Start of notification period"
                component={FormikUICustomDatePicker}
                margin="normal"
                fullWidth
              />
              <Field
                name="endNotify"
                label="End of notification period"
                component={FormikUICustomDatePicker}
                margin="normal"
                fullWidth
              />
            </MuiPickersUtilsProvider>
            <Field
              name="cycleComment"
              label="Cycle comment"
              type="text"
              component={TextField}
              margin="normal"
              fullWidth
              data-cy="cycle-comment"
            />
            <Field
              name="surveyComment"
              label="Survey Comment"
              type="text"
              component={TextField}
              margin="normal"
              fullWidth
              data-cy="survey-comment"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              data-cy="submit"
            >
              Add Call
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}