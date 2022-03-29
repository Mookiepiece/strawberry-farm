import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortalChannel } from '@mookiepiece/starfall-utils';
import { useMount } from 'react-use';

type LiteModalFC<T extends any, R extends any> = React.ForwardRefExoticComponent<
  React.RefAttributes<LiteModalFCInstance<T, R>>
> & {
  instantiate: [T] extends [undefined] ? (args?: T) => Promise<R> : (args: T) => Promise<R>;
};

type LiteModalFCInstanceOpenOptions = {
  onClose?(): void | false;
};

type LiteModalFCInstance<T extends any = undefined, R extends any = undefined> = {
  open: [T] extends [undefined]
    ? (args?: undefined, options?: LiteModalFCInstanceOpenOptions) => Promise<R>
    : (args: T, options?: LiteModalFCInstanceOpenOptions) => Promise<R>;
  close(): void;
};

export const createLiteModal = <T extends any = undefined, R extends any = undefined>(
  Component: React.VFC<{
    visible: boolean;
    close(): void;
    resolve: [R] extends [undefined] ? (v?: R) => void : (v: R) => void;
    reject(e?: any): void;
    args?: T;
  }>
): LiteModalFC<T, R> => {
  const LiteModal: LiteModalFC<T, R> = Object.assign(
    React.forwardRef(function LiteModal(_, ref: React.ForwardedRef<LiteModalFCInstance<T, R>>) {
      const [args, setArgs] = useState<T>();
      const [visible, setVisible] = useState(false);
      const close = useCallback(() => {
        if (optionsRef.current?.onClose?.() !== false) {
          setVisible(false);
        }
      }, []);

      const optionsRef = useRef<LiteModalFCInstanceOpenOptions>();
      const resolveRef = useRef<(value?: R | PromiseLike<R>) => void>(() => {});
      const rejectRef = useRef<(e?: any) => void>(() => {});
      const resolve = useCallback(
        (v?: R | PromiseLike<R>) => {
          resolveRef.current(v);
          close();
        },
        [close]
      );
      const reject = useCallback(
        (e?: any) => {
          rejectRef.current(e);
          close();
        },
        [close]
      );

      useImperativeHandle(
        ref,
        () => ({
          open: (args?: T, options?: LiteModalFCInstanceOpenOptions) => {
            setArgs(args);
            setVisible(true);
            optionsRef.current = options;

            return new Promise<R>(
              (resolve, reject) =>
                ([resolveRef.current, rejectRef.current] = [resolve as any, reject])
            );
          },
          close,
        }),
        [close]
      );

      return (
        <Component
          {...{
            visible,
            resolve,
            reject,
            close,
            args,
          }}
        />
      );
    }),
    {
      instantiate(args?: T) {
        return new Promise<R>((resolve, reject) => {
          Modalfication.push({
            Component: LiteModal,
            args,
            resolve,
            reject,
          });
        });
      },
    }
  );

  return LiteModal;
};

type MapToInstance<A extends LiteModalFC<any, any>[]> = {
  [K in keyof A]: A[K] extends LiteModalFC<infer T, infer R> ? LiteModalFCInstance<T, R> : never;
};

export const useModals = <A extends LiteModalFC<any, any>[]>(
  ...args: A
): [MapToInstance<A>, React.ReactElement] => {
  const refs = useRef<any>(
    args.map(() => ({
      current: { open: undefined },
    }))
  );

  const modals = (
    <>
      {args.map((M, index) => (
        <M ref={current => (refs.current[index].current.open = current?.open)} key={index} />
      ))}
    </>
  );

  return [refs.current.map(({ current }: any) => current), modals];
};

type PortalChannelModalInstance = {
  Component: LiteModalFC<any, any>;
  args: any;
  resolve(res: any): void;
  reject(e: any): void;
};

const EXComponent = ({
  payload: { Component, args, resolve, reject },
  onClose,
}: {
  payload: PortalChannelModalInstance;
  onClose: () => void;
}) => {
  const ref = useRef<LiteModalFCInstance<any, any>>(null);

  useMount(() => {
    // setTimeout(() => {
      if (ref.current) {
debugger
        ref.current
          .open(args, {
            onClose() {
              onClose();
            },
          })
          .then(v => {
            resolve(v);
          })
          .catch(reject);
      }
    // }, 0);
  });

  return <Component ref={ref} />;
};

const Modalfication = createPortalChannel<PortalChannelModalInstance>({
  displayName: 'ModalPortalChannel',
  ConsumerComponent: function ModalficationConsumerComponent({ model: [modals, setModals] }) {
    useEffect(() => {}, [modals]);

    const handleClose = (id: number) => {
      setTimeout(() => {
        setModals(modals => modals.filter(m => m.id !== id));
      }, 1000);
    };
    return (
      <div>
        {modals.map(({ id, payload }) => {
          return <EXComponent key={id} payload={payload} onClose={() => handleClose(id)} />;
        })}
      </div>
    );
  },
});
