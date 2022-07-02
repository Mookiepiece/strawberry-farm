import React from 'react';
import { Form, Input, Collapse } from '🦄';

type FormValue = {
  name: string;
  name2: string;
  hair: string;
};

const Demo: React.FC = () => {
  const form = Form.useForm<FormValue>({
    initialValue: {
      name: '12',
      name2: '12',
      hair: '',
    },
    action: async value =>
      new Promise(resolve => {
        setTimeout(() => {
          alert(`submit${JSON.stringify(value)}`);
          resolve();
        }, 500);
      }),
  });
  const rules = Form.defineRules({
    name: [
      { required: true },
      {
        type: 'string',
        min: 5,
        message:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni error, quibusdam exercitationem, quidem reprehenderit molestiae dolorem sint consequatur pariatur earum labore natus quis repellendus laudantium fuga accusamus corrupti sapiente incidunt!',
      },
    ],
    hair: [
      { type: 'string', min: 5, message: 'User hair must longer than 5' },
      { required: true, message: 'hair is rrrrrrequired' },
    ],
  });

  return (
    <>
      <div style={{ maxWidth: 300 }}>
        <Form form={form}>
          <Form.Item label="User Name" name="name" rules={rules.name}>
            <Input />
          </Form.Item>
          <Form.Item label="User Name" name="name2" rules={rules.name}>
            {(control, meta) => (void meta.alert, (<Input {...control} />))}
          </Form.Item>
          <Form.Item label="User Hair" name="hair" rules={rules.hair}>
            {(control, { error, alert }) => (
              <div>
                <Input {...control} />
                {alert(
                  error && (
                    <div style={{ margin: '12px 0' }}>
                      <span style={{ fontSize: 25 }}>🍓</span>
                      <br />
                      <span>message就是用普通的Collapse实现的</span>
                    </div>
                  )
                )}
                {
                  <Collapse>
                    {error === 'hair is rrrrrrequired' && (
                      <div>
                        <span>比如这个</span>
                      </div>
                    )}
                  </Collapse>
                }
              </div>
            )}
          </Form.Item>
          <Form.SubmitButton primary>提交 Submit</Form.SubmitButton>
        </Form>
      </div>
      <br />
      <br />
    </>
  );
};
export default Demo;