import {IInterval} from "./IInterval";

export class CInterval implements IInterval{
  top =0;
  bottom = 0;
  lithology = '';

  constructor(top: number, bottom: number) {
    this.top = top;
    this.bottom = bottom;
  }

}
