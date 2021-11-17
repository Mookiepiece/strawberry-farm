import React, { useMemo } from 'react';
import { Button, Form, Input } from 'starfall';

type FormValue = {
  name: string;
  hair: string[];

  /**
   * @computed
   */
  totalHairLength: number;
};

const Demo: React.FC = () => {
  const form = Form.useForm<FormValue>({
    initialValue: {
      name: '',
      hair: ['', ''],
      // computed property will recalculate in every render.
      totalHairLength: Math.PI,
    },
    useWatch(v) {
      const totalHairLength = useMemo(() => v.hair.reduce((a, b) => a + b.length, 0), [v.hair]);

      return {
        ...v,
        totalHairLength,
      };
    },
    action: async v => alert('🎉' + JSON.stringify(v, null, 4)),
  });

  const rules = Form.defineRules({
    totalHairLength: {
      type: 'number',
      min: 10,
    },
    hairItem: {
      type: 'string',
      validator: (rule, value) => {
        console.log(value);
        if (value.length < 5) {
          return new Error('too short');
        }
        return [];
      },
    },
  });

  return (
    <>
      <Form form={form}>
        <Form.Item label="User Name" name="name" rules={{ required: true }}>
          <Input />
        </Form.Item>
        <Form.List name="hair">
          {(keys, { add, remove }) => (
            <>
              {keys.map((key, index) => (
                <div key={key}>
                  <Form.Item
                    label={`User Hair ${key}`}
                    name={`hair.${index}`}
                    rules={rules.hairItem}
                  >
                    <Input />
                  </Form.Item>
                  <Button onClick={() => remove(index)}>Remove</Button>
                  <br />
                  <br />
                </div>
              ))}
              {keys.length < 4 ? <Button onClick={() => add('')}>Add</Button> : null}
              &nbsp;
              {keys.length < 10 ? (
                <Button onClick={() => add('www', 0)}>Add From Start</Button>
              ) : null}
            </>
          )}
        </Form.List>
        <Form.Item name="totalHairLength" rules={rules.totalHairLength}>
          {({ value }) => <span>total: {value}</span>}
        </Form.Item>
        <Form.SubmitButton>提交 Submit</Form.SubmitButton>
        <br />
        <br />
        <Button
          onClick={() =>
            form.set(v => ({
              ...v,
              hair: ['asd', 'asdddd'],
            }))
          }
        >
          Set list value using form instance method
        </Button>
      </Form>
    </>
  );
};
export default Demo;
