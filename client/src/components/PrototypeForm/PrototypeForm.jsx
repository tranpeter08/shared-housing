import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Input,
  Container,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[100],
    height: '100%',
  },
  form: {
    margin: theme.spacing(4),
    width: '100%',
    maxWidth: 600,
  },
  paper: {
    padding: theme.spacing(4),
  },
  heading: {
    textAlign: 'center',
  },
  control: {
    marginTop: theme.spacing(4),
  },
  label: theme.typography.h5,
  input: {
    'label + &': {
      marginTop: theme.spacing(1),
      border: '1px solid #ced4da',
      borderRadius: 4,
      paddingLeft: theme.spacing(1),
    },
  },
  numberInput: {
    width: 80,
  },
  button: {
    marginTop: theme.spacing(4),
  },
  subQuestion: {
    paddingLeft: theme.spacing(4),
  },
}));

const PrototypeForm = () => {
  const classes = useStyles();

  const formDefaults = {
    age: '',
    hasChildren: '',
    children: '',
    hasPets: '',
    pets: '',
    isOutgoing: '',
    likeMusic: '',
  };

  const [formState, setFormState] = useState(formDefaults);

  const handleChange = e => {
    const { name, type, value } = e.target;

    if (type === 'checkbox') {
      setFormState({ ...formState, [name]: !formState[name] });
      return;
    }

    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('formState:', formState);
  };

  const radioConfig = [['Yes', 'true'], ['No', 'false']];

  const radioInputs = config => {
    return config.map(param => (
      <FormControlLabel
        key={param[0]}
        label={param[0]}
        value={param[1]}
        control={<Radio color="primary" />}
      />
    ));
  };

  return (
    <Container className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Paper className={classes.paper}>
          <Typography variant="h4" component="h2" className={classes.heading}>
            Tell Us About Yourself!
          </Typography>

          <FormControl className={classes.control} fullWidth>
            <FormLabel htmlFor="age" className={classes.label}>
              What is your age?
            </FormLabel>
            <Input
              className={clsx(classes.input, classes.numberInput)}
              id="age"
              name="age"
              onChange={handleChange}
              type="number"
              value={formState.age}
              required
              disableUnderline
            />
          </FormControl>

          <FormControl className={classes.control}>
            <FormLabel className={classes.label}>
              Do you have any children?
            </FormLabel>
            <RadioGroup
              aria-label="Do you have any children"
              name="hasChildren"
              value={formState.hasChildren}
              onChange={handleChange}
            >
              {radioInputs(radioConfig)}
            </RadioGroup>
          </FormControl>

          {formState.hasChildren === 'true' && (
            <FormControl
              className={clsx(classes.control, classes.subQuestion)}
              fullWidth
            >
              <FormLabel htmlFor="children" className={classes.label}>
                How many children?
              </FormLabel>
              <Input
                className={clsx(classes.input, classes.numberInput)}
                id="children"
                name="children"
                onChange={handleChange}
                type="number"
                required
                disableUnderline
              />
            </FormControl>
          )}

          <FormControl className={classes.control} fullWidth>
            <FormLabel className={classes.label}>
              Do you have any pets?
            </FormLabel>
            <RadioGroup
              aria-label="Do you have any pets?"
              name="hasPets"
              value={formState.hasPets}
              onChange={handleChange}
              required
            >
              {radioInputs(radioConfig)}
            </RadioGroup>
          </FormControl>

          {formState.hasPets === 'true' && (
            <FormControl
              className={clsx(classes.control, classes.subQuestion)}
              fullWidth
            >
              <FormLabel htmlFor="petKind" className={classes.label}>
                What kind of pets?
              </FormLabel>
              <Input
                className={classes.input}
                id="pets"
                name="pets"
                onChange={handleChange}
                type="text"
                required
                disableUnderline
              />
            </FormControl>
          )}

          <FormControl className={classes.control} fullWidth>
            <FormLabel className={classes.label}>Are you outgoing?</FormLabel>
            <RadioGroup
              aria-label="Are you out going?"
              name="isOutgoing"
              value={formState.isOutgoing}
              onChange={handleChange}
              required
            >
              {radioInputs(radioConfig)}
            </RadioGroup>
          </FormControl>

          <FormControl className={classes.control} fullWidth>
            <FormLabel className={classes.label}>
              Do you like loud music?
            </FormLabel>
            <RadioGroup
              aria-label="Do you like music?"
              name="likeMusic"
              value={formState.likeMusic}
              onChange={handleChange}
              required
            >
              {radioInputs(radioConfig)}
            </RadioGroup>
          </FormControl>

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

export default PrototypeForm;
