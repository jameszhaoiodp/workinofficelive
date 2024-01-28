import { Component, OnInit } from '@angular/core';
import {CdkDragEnd,   CdkDragDrop,
  CdkDragEnter,
  CdkDragMove,} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.css']
})
export class DragComponent implements OnInit{
  show = false;
  intersectionRatio: number = 0;
  rgb: any;

  constructor() {
  }
  ngOnInit() {
    let xx = document?.querySelector('#resize-horizontal-svg');
    console.log(xx);
    try{
      // @ts-ignore
      new ResizeObserver(this.outputsize).observe(xx);
    } catch (e){

    }
  }
  outputsize() {
      console.log('aa');
      let horizontal = document.getElementById("resize-horizontal-svg")
      let width = horizontal?.offsetWidth
      let height = horizontal?.offsetHeight
      console.log('width, height:'+ width, height);
  }

  // License: MIT - https://opensource.org/licenses/MIT
  // Author: Michele Locati <michele@locati.it>
  // Source: https://gist.github.com/mlocati/7210513
  perc2color(perc: number) {
    console.log(perc);
    let r, g, b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    } else {
      g = 255;
      r = Math.round(510 - 5.10 * perc);
    }
    let h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
  }

  onIntersectionRatioChange(event: number) {
    console.log(event);
    this.intersectionRatio = event;
    this.rgb = this.perc2color(this.intersectionRatio);
  }

  dragEnd($event: CdkDragEnd) {
    console.log($event.source.getFreeDragPosition());
  }

  dragMoved(event: CdkDragMove) {
    console.log(event.pointerPosition);
  }


}
