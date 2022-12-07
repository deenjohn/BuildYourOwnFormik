import React from 'react';
import { css } from 'glamor';
import JsonView from 'clay-react-json-view';

export const Debug = props => {
  const [isOpen, setOpen] = React.useState(true);
  return (
    <div
      {...css({
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        transform: `translateY(calc(${isOpen ? '0% ' : '100% - 40px'}))`,
        transition: `all .2s ease-out`,
        margin: '3rem 0 0',
        borderRadius: 4,
        background: '#f6f8fa',
        boxShadow: '0 0 1px  #eee inset',
      })}
    >
      <div
        onClick={() => setOpen(isOpen ? false : true)}
        {...css({
          display: 'flex',
          alignItems: 'center',
          padding: '.5rem',
          cursor: 'pointer',
          background: '#333',
          color: '#fff',
          fontSize: 11,
          fontWeight: 800,
          justifyContent: 'space-between',
        })}
      >
        <div
          {...css({
            textTransform: 'uppercase',
            letterSpacing: '1px',
          })}
        >
          Debugger
        </div>
        <div
          {...css({
            border: 0,
            outline: 0,
            background: '#222',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            margin: 0,
            padding: 4,
            paddingLeft: 8,
            borderRadius: 5,
          })}
        >
          {isOpen ? '🔽' : '🔼'}
        </div>
      </div>
      <pre
        {...css({
          fontSize: 11,
          padding: '.25rem .5rem',
          overflowX: 'scroll',
        })}
      >
        <JsonView
          src={props.formik}
          name="useFormik()"
          style={{ fontSize: 13 }}
          onEdit={edit => console.log(edit)}
        />
      </pre>
    </div>
  );
};

//  <FormikConsumer>
//       {({ validationSchema, validate, onSubmit, ...rest }) => (
//         <pre
//           style={{
//             fontSize: '.65rem',
//             padding: '.25rem .5rem',
//             overflowX: 'scroll',
//           }}
//         >
//           {JSON.stringify(rest, null, 2)}
//         </pre>
//       )}
//     </FormikConsumer>
