import React, { useMemo } from 'react';
import { useUpdateEffect } from 'react-use';
import { Form, Button, Input } from '🦄';

type FormValue = {
  hair: string;
  checkHair: string;
  hair2: string;
  checkHair2: string;
};

const Demo: React.FC = () => {
  const form = Form.useForm<FormValue>({
    initialValue: {
      hair: '',
      checkHair: '',
      hair2: '',
      checkHair2: '',
    },
    FormWatcher: useMemo(
      () =>
        function FormWatcher({ form, formValue }) {
          const { hair } = formValue;
          useUpdateEffect(() => {
            form.validate(['checkHair']);
          }, [hair]);
          return null;
        },
      []
    ),
    action: async value => {
      alert(`🎉${JSON.stringify(value, null, 4)}`);
    },
  });

  const rules = Form.defineRules({
    checkHair: [
      {
        validator: value => {
          if (form.value.hair !== value) {
            return 'value must equal';
          }
        },
      },
      {
        required: true,
        whitespace: true,
      },
    ],
    checkHair2: [
      {
        validator: value => {
          if (form.value.hair2 !== value) {
            return 'value must equal';
          }
        },
      },
      {
        required: true,
        whitespace: true,
      },
    ],
    userHair: {
      validator(value) {
        form.validate(['checkHair2']);
      },
    },
  });

  return (
    <>
      <div style={{ maxWidth: 300 }}>
        <Form form={form}>
          <Form.Item label="User Hair" name="hair">
            <Input />
          </Form.Item>
          <Form.Item label="Repeat User Hair" name="checkHair" rules={rules.checkHair}>
            <Input />
          </Form.Item>
          <Form.Item label="User Hair II" name="hair2" rules={rules.userHair}>
            <Input />
          </Form.Item>
          <Form.Item label="Repeat User Hair II" name="checkHair2" rules={rules.checkHair2}>
            <Input />
          </Form.Item>
          <div>
            <Form.SubmitButton primary>提交 Submit</Form.SubmitButton>
            &nbsp;
            <Button type="reset">重置 Reset</Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Demo;
