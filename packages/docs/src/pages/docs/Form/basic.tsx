import React from 'react';
import { Form, Button, Input } from '🦄';

type FormValue = {
  name: string;
  hair: string;
};

const Demo: React.FC = () => {
  const form = Form.useForm<FormValue>({
    initialValue: {
      name: '12',
      hair: '',
    },
    action: async value =>
      new Promise(resolve => {
        setTimeout(() => {
          alert(`submit${JSON.stringify(value)}`);
          resolve();
        }, 2000);
      }),
  });

  const rules = Form.defineRules({
    name: [
      { required: true },
      {
        type: 'string',
        min: 5,
      },
    ],
    hair: [
      { type: 'string', min: 5, message: 'User hair must longer than 5' },
      { required: true, message: 'hair is rrrrrrequired' },
    ],
    hairPlus: [
      {
        type: 'string',
        asyncValidator: value => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (value.length < 10) {
                reject('too short');
              } else {
                resolve();
              }
            }, 2000);
          });
        },
      },
    ],
  });

  return (
    <>
      <div style={{ maxWidth: 300 }}>
        <Form<{
          name: string;
          hair: string;
        }>
          form={form}
        >
          <Form.Item label="User Name" name="name" rules={rules.name}>
            <Input />
          </Form.Item>
          <Form.Item label="User Hair" name="hair" rules={rules.hair}>
            <Input />
          </Form.Item>
          <Form.Item label="User Hair Plus" name="hair" rules={rules.hair}>
            <Input />
          </Form.Item>
          <div>
            <Form.SubmitButton primary>提交 Submit</Form.SubmitButton>
            &nbsp;
            <Button type="reset">重置 Reset</Button>
          </div>
        </Form>
      </div>
      <br />
      <br />
    </>
  );
};
export default Demo;
