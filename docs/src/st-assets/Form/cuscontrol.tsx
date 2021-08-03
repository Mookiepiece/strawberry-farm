import React, { useState } from 'react';
import { Button, Form } from 'starfall';

const apiUser = <T, Q>(v: T): Promise<T> => new Promise(r => setTimeout(() => r(v), 1000));

type FormSchema = {
  complexHair: [string, string] | null;
};

const List: React.FC = () => {
  const [initialValue] = useState({
    complexHair: null,
  });

  const formRef = Form.useRef<FormSchema>();

  return (
    <>
      <Form<FormSchema>
        initialValue={initialValue}
        ref={formRef}
        action={async v => alert('🎉' + JSON.stringify(v, null, 4))}
      >
        <Form.Item
          label="Complex Hair"
          name="complexHair"
          rules={[
            {
              async asyncValidator(_rules, value: [string, string] | null) {
                if (!value) return Promise.reject('reqiured');
                if (!value[1]) return Promise.reject('array[1] required');
                return Promise.resolve();
              },
            },
          ]}
        >
          <MyControl />
        </Form.Item>
        <Form.SubmitButton>提交 Submit</Form.SubmitButton>
      </Form>
    </>
  );
};

type MyControlProps = {
  value?: [string, string] | null;
  onChange?: (value: [string, string] | null) => void;
};

const MyControl: React.FC<MyControlProps> = ({ value, onChange }) => {
  const handleClick = (value: [string, string] | null) => {
    Promise.resolve().then(() => {
      onChange?.(value);
    });
  };

  return (
    <>
      {JSON.stringify(value || { null: 0 })}
      <Button primary onClick={() => handleClick(null)}>
        set it null
      </Button>
      <Button onClick={() => handleClick(['aaa', ''])}>set it {`['aaa', '']`}</Button>
      <Button onClick={() => handleClick(['aaa', 'aaa'])}>set to {`['aaa', 'aaa']`}</Button>
    </>
  );
};

export default List;
