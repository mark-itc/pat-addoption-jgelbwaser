import React from 'react';
import { useForm } from 'react-hook-form';
import ajv from 'ajv';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const schema = {
  type: 'object',
  properties: {
    email: { type: 'string'},
    password: { type: 'string', minLength: 8 },
  },
  required: ['email', 'password'],
};

const validator = new ajv({ allErrors: true }).compile(schema);

function SignInForm({ open, onClose }) {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    validate: (values) => {
      const isValid = validator(values);
      if (!isValid) {
        return validator.errors.reduce(
          (acc, error) => ({
            ...acc,
            [error.dataPath.slice(1)]: error.message,
          }),
          {}
        );
      }
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sign In</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            label="Email"
            name="email"
            inputRef={register('email')}
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            inputRef={register('email')}
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Sign In
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default SignInForm;