import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Form, Input } from '../..';
import { get, sleep } from '@mookiepiece/starfall-utils';

describe('<Form>', () => {
  it('input, validate and submit', async () => {
    const action = jest.fn();

    const Test = () => {
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

    const wrapper = mount(<Test />);

    wrapper.find('input').simulate('change', { target: { value: '1' } });
    await act(sleep);
    wrapper.find('input').simulate('change', { target: { value: '' } });
    await act(sleep);

    expect(
      wrapper.find('.st-error-message').getDOMNode().classList.contains('st-error-message--active')
    ).toBe(true);
    expect(wrapper.find('.st-error-message').text()).toBe('xxx');

    wrapper.find('form').simulate('submit');
    await act(sleep);
    expect(action).toBeCalledTimes(0);

    wrapper.find('input').simulate('change', { target: { value: '2' } });
    await act(sleep);
    expect(
      wrapper.find('.st-error-message').getDOMNode().classList.contains('st-error-message--active')
    ).toBe(false);

    wrapper.find('form').simulate('submit');
    await act(sleep);
    expect(action).toBeCalledWith({ a: '2' });
  });
});
