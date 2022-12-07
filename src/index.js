import React from 'react';
import ReactDOM from 'react-dom';
import { css } from 'glamor';
import { COLORS } from './theme';
const { base, black, ...cols } = COLORS;
import { App } from './App';
import './styles.css';

// Cool example colors.
Object.keys(cols).forEach(color => {
  css.global(
    `.formik-example.formik-example--${color} button[type='submit'],
  .formik-example.formik-example--${color} button.primary`,
    {
      background: COLORS[color][5],
    }
  );
  css.global(
    `.formik-example.formik-example--${color} button[type='submit']:focus,
    .formik-example.formik-example--${color} button.primary:focus`,
    {
      background: COLORS[color][6],
    }
  );
  css.global(
    `.formik-example.formik-example--${color} button[type='submit']:active,
    .formik-example.formik-example--${color} button.primary:active`,
    {
      background: COLORS[color][7],
    }
  );

  css.global(
    `.formik-example.formik-example--${color} input:focus, .formik-example.formik-example--${color} select:focus`,
    {
      borderColor: COLORS[color][4],
      boxShadow: `inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 0 3px ${COLORS[color][1]}`,
      outline: 'none',
    }
  );
});

const color = 'blue';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <div style={{ height: '100%' }} className="formik-example formik-example--blue">
    <div
      style={{
        height: '100%',
        background: COLORS[color][5],
        padding: '4rem 2rem',
      }}
    >
      <div
        style={{
          borderRadius: '4px',
          boxShadow: '0 8px 16px rgba(0,0,0,.2)',
          background: '#fff',
          maxWidth: 400,
          margin: '0 auto',
          padding: '2rem',
        }}
      >
        <div className="formik-example formik-example--blue">
          <App />
        </div>
      </div>
    </div>
  </div>,
  rootElement
);
