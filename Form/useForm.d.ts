import { FormInstance, FormProps } from './formModel';
export declare const useForm: <T extends Record<string, any>>({ initialValue, FormWatcher, action, }: FormProps<T>) => FormInstance<T>;
