// mirror of starfall
import mitt from 'mitt';

export interface Emitter<T> {
  on<K extends keyof T>(type: K, handler: (event: T[K]) => void): void;
  off<K extends keyof T>(type: K, handler: (event: T[K]) => void): void;
  emit<K extends keyof T>(type: K, event: T[K]): void;
}

const Mitt = <T>(): Emitter<T> => (mitt() as unknown) as Emitter<T>;

export default Mitt;
