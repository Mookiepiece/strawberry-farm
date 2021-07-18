import React, { useState } from 'react';
import clsx from 'clsx';
import Input from '../Input';
import Popper from '../Popper';

type SelectProps<T> = {
  value?: T;
  onChange?: (value: T) => void;
  options: {
    value: T;
    label?: any;
  }[];
  renderOptions?: (option: { value: any; label?: any }) => React.ReactNode;
};

const Select = <T extends undefined | null | Record<string, any> | boolean | number | string>({
  value,
  onChange,
  options,
  renderOptions,
}: SelectProps<T>): React.ReactElement => {
  const [visible, setVisible] = useState(false);
  const [pendingIndex, setPendingIndex] = useState(0);

  const select = (index: number) => {
    onChange?.(options[index].value);
    setVisible(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (pendingIndex > -1 && pendingIndex < options.length) {
          select(pendingIndex);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (options.length) {
          setVisible(true);
          setPendingIndex((pendingIndex + 1) % options.length);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (options.length) {
          setVisible(true);
          setPendingIndex((pendingIndex - 1 + options.length) % options.length);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setVisible(false);
        break;
    }
  };

  return (
    <>
      <Popper
        visible={visible}
        popup={
          <div>
            {options.map((item: { value: T; label?: any }, index) => {
              const { value: iValue, label } = item;
              return (
                <div
                  key={`${iValue}`}
                  className={clsx(
                    'st-option',
                    pendingIndex === index && 'st-option--pending',
                    value === iValue && 'st-option--selected'
                  )}
                  onMouseMove={() => setPendingIndex(index)}
                  onTouchMove={() => setPendingIndex(index)}
                  onClick={() => select(index)}
                >
                  {renderOptions ? (
                    renderOptions(item)
                  ) : (
                    <div className="st-option__inner">{label || iValue}</div>
                  )}
                </div>
              );
            })}
          </div>
        }
        modifiers={[Popper.modifiers.sameWidth]}
        popupClassName="st-popper--default st-popper--zoom-y"
        onClose={() => setVisible(false)}
      >
        <Input
          readOnly
          onClick={() => setVisible(true)}
          onKeyDown={handleKeyDown}
          value={value?.toString() || ''}
        />
      </Popper>
    </>
  );
};

export default Select;
