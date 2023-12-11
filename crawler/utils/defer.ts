function noop() {}

export class Defer<T> {
  public readonly promise: Promise<T>;

  public resolve: (value: T) => void = noop;

  public reject: (err: Error) => void = noop;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
