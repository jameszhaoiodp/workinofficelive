import {Injectable} from '@angular/core';
import {CInterval} from "../Models/CInterval";
import {IInterval} from "../Models/IInterval";

@Injectable({
  providedIn: 'root'
})
export class IntervalService {
  private intervals = [] as CInterval[];

  //interface way
  // public xxx2: Interval_I[] = [];
  // let commentData = {} as Interval_I;
  // this.xxx2.push(commentData);

  constructor() {

  }

  test() {
    console.log('this is inside service.');
  }

  add() {

    let newInterval = new CInterval(10, 100);
    this.intervals.push(newInterval)

    this.intervals.push(new CInterval(100, 200));

    this.intervals.push(new CInterval(250, 400));

    this.intervals.push(new CInterval(400, 550));

    this.intervals.push(new CInterval(550, 700));



    console.log('add...');
    this.print();


  }

  print() {
    this.intervals.map(m => console.log(m.top, '-', m.bottom));
  }

  getIntervals(): CInterval[]{
    return this.intervals;
  }

}
