import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { Form, Input } from '../..';

const $ = document.querySelector.bind(document);

describe('<Form>', () => {
  it('input, validate and submit', async () => {
    const action = jest.fn();

    const Comp = () => {
      const form = Form.useForm({
        initialValue: {
          a: '',
        },
        action,
      });

      const rules = Form.defineRules({
        a: {
          required: true,
          message: 'xxx',
        },
      });

      return (
        <Form form={form}>
          <Form.Item name="a" rules={rules.a}>
            <Input />
          </Form.Item>
        </Form>
      );
    };

    render(<Comp />);

    const input = $('input') as HTMLInputElement;
    const form = $('form') as HTMLFormElement;
    // valid input
    fireEvent.change(input, { target: { value: '2' } });

    await waitFor(() => {
      expect($('span.sf-error-message')).toHaveTextContent('');
    });
    expect($('input')?.value).toBe(2);
  });

  // it('greedy projection', async () => {
  //   const Test = () => {
  //     const action = jest.fn();
  //     const form = Form.useForm<{
  //       b?: string;
  //     }>({ initialValue: {}, action });

  //     const rules = Form.defineRules({
  //       a: {
  //         required: true,
  //         message: 'xxx',
  //       },
  //     });

  //     const project = form.project;

  //     return (
  //       <Form form={form}>
  //         <button onClick={() => form.setField('b', '')}></button>
  //         <Form.Item name="a" rules={rules.a}>
  //           <Input />
  //         </Form.Item>

  //         {project(
  //           'b',
  //           (b: string | undefined) => (
  //             <span className="a1">{typeof b}</span>
  //           ),
  //           {
  //             greedy: true,
  //           }
  //         )}

  //         {project('b', (b: string | undefined) => (
  //           <span className="a2">{typeof b}</span>
  //         ))}
  //       </Form>
  //     );
  //   };

  //   const wrapper = mount(<Test />);

  //   expect(wrapper.find('span.a1').text()).toBe('undefined');
  //   expect(wrapper.exists('span.a2')).toBe(false);

  //   wrapper.find('button').simulate('click');

  //   await act(sleep);
  //   expect(wrapper.find('span.a1').text()).toBe('string');
  //   expect(wrapper.find('span.a2').text()).toBe('string');
  // });
});

// describe('<FormItem>', () => {
//   beforeAll(() => {
//     // Abvoid `attachTo: document.body` Wraning
//     const div = document.createElement('div');
//     div.setAttribute('id', 'root');
//     document.body.appendChild(div);
//   });
//   afterAll(() => {
//     const div = document.getElementById('root');
//     if (div) {
//       document.body.removeChild(div);
//     }
//   });
//   it('should focus field when failed', async () => {
//     const Test = () => {
//       const form = Form.useForm({
//         initialValue: {
//           a: '1',
//           b: '',
//           c: '',
//           d: '',
//         },
//       });

//       const rules = Form.defineRules({
//         a: {
//           type: 'enum',
//           enum: [1],
//         },
//       });

//       return (
//         <Form form={form}>
//           <Form.Item name="a" rules={rules.a}>
//             <Input />
//           </Form.Item>
//         </Form>
//       );
//     };

//     const wrapper = mount(<Test />, { attachTo: document.getElementById('root') });

//     wrapper.find('input').first().simulate('change');
//     await act(sleep);
//     wrapper.find('form').simulate('submit');
//     await act(sleep);
//     expect(document.activeElement === wrapper.find('input').first().getDOMNode()).toBe(true);
//   });
// });
