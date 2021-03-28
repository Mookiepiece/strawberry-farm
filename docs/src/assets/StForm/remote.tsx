import React, { useState } from 'react';
import { StForm, StButton, StInput } from '🦄';
import { RuleItem } from 'async-validator';

const apiUser = (s: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (/^\d/.test(s)) {
        reject({
          code: 666,
          message: 'username cannot starts with number 1234567890',
        });
      }
      resolve(0);
    }, 2000);
  });
};

const BasicUsage: React.FC = () => {
  const [value, setValue] = useState({
    name: '',
    hair: '',
  });
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = StForm.useRef();

  const [nameRule, setNameRule] = useState<RuleItem[]>([{ required: true }]);

  return (
    <>
      <StForm<{
        name: string;
        hair: string;
      }>
        value={value}
        onChange={setValue}
        ref={formRef}
        onSubmit={v => {
          setIsSubmitting(true);
          apiUser(v.name)
            .then(() => {
              alert('🎉');
            })
            .catch(e => {
              if (e.code === 666 && e.message) {
                formRef.current?.setValidateStatus('name', { state: 'error', message: e.message });
              }
              setNameRule([
                { required: true },
                {
                  validator(r, value, callback) {
                    if (value === v.name) {
                      callback('our api seems to not like this name, please pick another');
                    }
                    callback();
                  },
                },
              ]);
            })
            .finally(() => {
              setIsSubmitting(false);
            });
        }}
        onValidateStatusChange={setIsValidating}
      >
        <StForm.Item label="User Name" name="name" rules={nameRule}>
          <StInput />
        </StForm.Item>
        <StForm.Item
          label="User Hair Plus"
          name="hair"
          rules={[
            {
              type: 'string',
              asyncValidator: (rule, value) => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if (value.length < 5) {
                      reject('too short');
                    } else {
                      resolve();
                    }
                  }, 2000);
                });
              },
            },
          ]}
        >
          {({ value, onChange }) => <StInput value={value} onChange={onChange} />}
        </StForm.Item>
        <StButton type="submit">提交 Submit</StButton>
      </StForm>
      <br />
      <p>{isValidating || isSubmitting ? 'Validating...' : 'Idle'}</p>
    </>
  );
};
export default BasicUsage;
