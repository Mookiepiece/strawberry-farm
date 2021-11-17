import React, { useEffect, useMemo } from 'react';
import { Form, Input } from 'starfall';

type FormValue = {
  user: {
    name: string;
    hair: string;
    hair2: string;
    /**
     * @computed
     */
    hairFieldVisible: boolean;
  };
};

const Demo: React.FC = () => {
  const form = Form.useForm<FormValue>({
    initialValue: {
      user: {
        name: '',
        hair: '',
        hair2: '',
        hairFieldVisible: false,
      },
    },
    useWatch(v) {
      const hairFieldVisible = useMemo(() => !!v.user.name, [v.user.name]);
      useEffect(() => {
        form.value.user.hair && form.set(v => ({ ...v, user: { ...v.user, hair: '' } }));
      }, [hairFieldVisible]);

      return {
        ...v,
        user: {
          ...v.user,
          hairFieldVisible,
        },
      };
    },
    action: async v => alert('🎉' + JSON.stringify(v, null, 4)),
  });

  const { project } = form;

  return (
    <>
      <Form form={form}>
        <Form.Item name="user">
          {({ value: user }) => {
            return (
              <p>
                I got {user.name} and {user.hair}
              </p>
            );
          }}
        </Form.Item>

        <Form.Item label="User Name" name="user.name">
          <Input />
        </Form.Item>

        {project('user.hairFieldVisible', visible =>
          visible ? (
            <Form.Item label="User Hair" name="user.hair">
              <Input />
            </Form.Item>
          ) : null
        )}

        {project(['user.name', 'user.hair'], ([name, hair]: [string, string]) =>
          name.length && hair.length ? (
            <Form.Item label="User Hair II" name="user.hair2">
              <Input />
            </Form.Item>
          ) : null
        )}

        <Form.SubmitButton>提交 Submit</Form.SubmitButton>
      </Form>
    </>
  );
};
export default Demo;
