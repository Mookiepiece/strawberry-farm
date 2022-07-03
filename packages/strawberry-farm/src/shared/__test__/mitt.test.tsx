import { Mitt } from '../mitt';

describe('Mitt', () => {
  const spy = jest.fn();
  const spyB = jest.fn();
  const mitt = Mitt<{ A: number; B: void }>();

  it('mitt', () => {
    const offA = mitt.on('A', spy);
    mitt.on('B', spyB);
    expect(spy).toBeCalledTimes(0);

    mitt.emit('A', 1);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(1);

    offA();
    mitt.emit('A', 2);
    expect(spy).toBeCalledTimes(1);

    mitt.off('B', spyB);
    mitt.emit('B');
    expect(spyB).toBeCalledTimes(0);
  });
});
