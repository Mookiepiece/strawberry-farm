import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Input from '../Input';
import Popper from '../Popper';
import ScrollView from '../ScrollView';
import { useRef } from 'react';
import type { ScrollViewInstance } from '../ScrollView';
import { shift } from '@floating-ui/dom';

type SelectProps<T> = {
  value?: T;
  onChange?: (value: T) => void;
  options: {
    value: T;
    label?: string;
  }[];
  renderOptions?: (
    option: { value: T; label?: string },
    meta: {
      pending?: boolean;
      selected?: boolean;
    }
  ) => React.ReactNode;
  placeholder?: string;
  filterable?: boolean;
  filter?: (
    option: { value: T; label?: string }[],
    query: string
  ) => { value: T; label?: string }[];
};

const defaultFilter = (options: { value: any; label?: string }[], query: string) => {
  return options.filter(({ label, value }) => {
    console.log(label || (value ? value.toString() : ''));
    return (label || (value ? value.toString() : '')).startsWith(query);
  });
};

const shift10 = shift({ padding: 10 });

const Select = <T extends undefined | null | Record<string, any> | boolean | number | string>({
  value,
  onChange,
  options,
  renderOptions,
  placeholder,
  filterable = false,
  filter = defaultFilter,
}: SelectProps<T>): React.ReactElement => {
  const [visible, setVisible] = useState(false);
  const [pendingIndex, setPendingIndex] = useState(0);

  const [query, setQuery] = useState('');

  const filteredOptions = query ? filter(options, query) : options;
  const select = (index: number) => {
    onChange?.(filteredOptions[index].value);
    setVisible(false);
  };

  useEffect(() => {
    if (visible) setQuery('');
  }, [visible]);

  const scrollViewRef = useRef<ScrollViewInstance>(null);
  const optionsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollToIndex = (index: number) => {
    const optionEl = optionsRefs.current[index];
    if (!scrollViewRef.current?.container || !optionEl) return;
    scrollViewRef.current.container.scrollTop = optionEl.offsetTop - 30;
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
          const nextIndex = (pendingIndex + 1) % options.length;
          setPendingIndex(nextIndex);
          scrollToIndex(nextIndex);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (options.length) {
          setVisible(true);
          const nextIndex = (pendingIndex - 1 + options.length) % options.length;
          setPendingIndex(nextIndex);
          scrollToIndex(nextIndex);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setVisible(false);
        break;
    }
  };

  const selectedIndex = options.findIndex(({ value: v }) => v === value);

  const currentLabel = options[selectedIndex]?.label || value?.toString?.() || '';

  return (
    <>
      <Popper
        visible={visible}
        popup={
          <ScrollView containerStyle={{ maxHeight: 200 }} ref={scrollViewRef}>
            {filteredOptions.map((item: { value: T; label?: any }, index) => {
              const { value: iValue, label } = item;
              const pending = pendingIndex === index;
              const selected = value === iValue;
              return (
                <div
                  key={`${iValue}`}
                  className={clsx(
                    'st-option',
                    pending && 'st-option--pending',
                    selected && 'st-option--selected'
                  )}
                  onMouseMove={() => setPendingIndex(index)}
                  onTouchMove={() => setPendingIndex(index)}
                  onClick={() => select(index)}
                  ref={el => (optionsRefs.current[index] = el)}
                >
                  {renderOptions ? (
                    renderOptions(item, { pending, selected })
                  ) : (
                    <div className="st-option__inner">{label || iValue}</div>
                  )}
                </div>
              );
            })}
          </ScrollView>
        }
        middleware={[shift10]}
        popupClassName="sf-popper--default sf-popper--zoom-y"
        onClose={() => setVisible(false)}
      >
        <Input
          readOnly={!filterable || !visible}
          onClick={() => setVisible(true)}
          onKeyDown={handleKeyDown}
          value={visible ? query : currentLabel}
          onChange={setQuery}
          placeholder={visible && currentLabel ? currentLabel : placeholder}
        />
      </Popper>
    </>
  );
};

export default Select;
