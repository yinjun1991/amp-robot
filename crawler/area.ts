import { Defer } from './utils/defer';

export class Area extends Defer<void> {
  geo: string;
  children: Area[];

  constructor(public readonly name: string, public readonly adcode: string) {
    super();
    this.geo = '';
    this.children = [];
  }
}
