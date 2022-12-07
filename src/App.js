import React from 'react';
import { COLORS } from './theme';
import { Debug } from './Debug';
import { setNestedObjectValues } from './utils';

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    case 'SET_FIELD_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          ...action.payload,
        },
      };
    case 'SUBMIT_ATTEMPT':
      return {
        ...state,
        isSubmitting: true,
        touched: setNestedObjectValues(state.values, true),
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
      };
    case 'SUBMIT_FAILURE':
      return {
        ...state,
        isSubmitting: false,
        submitError: action.payload,
      };
    default:
      return state;
  }
}

function useFormik(props) {
  if (!props.onSubmit) {
    throw new Error('You forgot to pass onSubmit to useFormik!');
  }

  const [state, dispatch] = React.useReducer(reducer, {
    values: props.initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });

  React.useEffect(
    () => {
      if (props.validate) {
        const errors = props.validate(state.values);
        dispatch({ type: 'SET_ERRORS', payload: errors });
      }
    },
    [state.values]
  );

  const handleChange = fieldName => event => {
    event.persist();
    dispatch({
      type: 'SET_FIELD_VALUE',
      payload: { [fieldName]: event.target.value },
    });
  };

  const handleBlur = field => event => {
    dispatch({
      type: 'SET_FIELD_TOUCHED',
      payload: { [fieldName]: true },
    });
  };

  const getFieldProps = fieldName => ({
    value: state.values[fieldName],
    onChange: handleChange(fieldName),
    onBlur: handleBlur(fieldName),
  });

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch({ type: 'SUBMIT_ATTEMPT' });
    const errors = props.validate(state.values);
    if (!Object.keys(errors).length) {
      try {
        await props.onSubmit(state.values);
        dispatch({ type: 'SUBMIT_SUCCESS' });
      } catch (submitError) {
        dispatch({ type: 'SUBMIT_FAILURE', payload: submitError });
      }
    } else {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      dispatch({ type: 'SUBMIT_FAILURE' });
    }
  };

  return { handleChange, handleBlur, handleSubmit, getFieldProps, ...state };
}

const FormikContext = React.createContext({});

function Formik(props) {
  const formikProps = useFormik(props);
  return (
    <FormikContext.Provider value={formikProps}>{props.children}</FormikContext.Provider>
  );
}

function useField(fieldName) {
  const formikProps = React.useContext(FormikContext);
  return formikProps.getFieldProps(fieldName);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

function NameForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    onSubmit: async values => {
      await sleep(1000);
      alert(JSON.stringify(values, null, 2));
    },
    validate: values => {
      let errors = {};
      if (values.name !== 'admin') {
        errors.name = 'You are not allowed';
      }
      return errors;
    },
  });
  const { handleSubmit, getFieldProps, touched, errors, submitError } = formik;
  return (
    <form onSubmit={handleSubmit}>
      {submitError && submitError}
      <label>
        Name:
        <input type="text" {...getFieldProps('name')} />
        {errors.name && touched.name && (
          <div style={{ color: 'red', marginTop: -10, marginBottom: 10 }}>
            {errors.name}
          </div>
        )}
      </label>
      <label>
        Email:
        <input type="text" {...getFieldProps('email')} />
        {errors.email && touched.email && (
          <div style={{ color: 'red', marginTop: -10, marginBottom: 10 }}>
            {errors.email}
          </div>
        )}
      </label>
      <Debug formik={formik} />
      <button type="submit">Submit</button>
    </form>
  );
}

export function App() {
  return <NameForm />;
}
