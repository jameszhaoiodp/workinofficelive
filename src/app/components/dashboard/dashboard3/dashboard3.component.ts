import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit
} from '@angular/core';
import {CdkDragEnd, CdkDragMove} from "@angular/cdk/drag-drop";
import * as d3 from 'd3';
import {IntervalService} from "../services/IntervalService";
import {DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW} from "@angular/cdk/keycodes";
import {fromEvent} from "rxjs";
import {merge} from "rxjs/internal/operators/merge";
@Component({
  selector: 'app-dashboard3',
  templateUrl: './dashboard3.component.html',
  styleUrls: ['./dashboard3.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard3Component implements OnInit, AfterViewInit {

  show = false;
  intersectionRatio: number = 0;
  cdkDragDisabled_interval = false;
  cdkDragDisabled_image = false;
  rgb: any;
  private svg: any;
  imageWidth = 0;
  imageHeight = 0;

  drag_condition = false;


  offsetY = 0;//image offset to the top border

  public scrollBarHeight = 50;
  // public offsetY_OnBar = 0;

  public barHeight = 882; // when image with is 40, the height of bar is 882
  public dragPositionBar = {x: 0, y: 0};
  public dragPositionImage ={x: 0, y: 0};

  margin = 40;

  private scaleWidth = 40 - (this.margin * 2);
  private scaleHeight = 1137;

  public isKeyPressed : boolean = false;

  public m_pos =0;
  public panel: any;
  public BORDER_SIZE = 4;


  // viewboxHeight = 882;

  constructor(private cdr: ChangeDetectorRef, intervalService: IntervalService) {
    intervalService.add();
  }
  private resize(e: MouseEvent){
    const dx = this.m_pos - e.x;
    console.log('resize:' + dx);
    this.m_pos = e.x;
    this.panel.style.width = (parseInt(getComputedStyle(this.panel, '').width) + dx) + "px";
  }
  ngOnInit() {
    // let resizableDiv = document?.querySelector('#resize-horizontal-svg');
    // console.log(resizableDiv);

    let horizontal = document.getElementById("resize-horizontal-svg")

    // let panel = horizontal;

    let width = horizontal?.offsetWidth || 0;
    let height = horizontal?.offsetHeight || 0;


    console.log('W:' + width, 'H:' + height);

    let horizontal2 = document.getElementById("imageId")
    this.imageWidth = horizontal2?.getClientRects()[0].width || 0;
    this.imageHeight = horizontal2?.getClientRects()[0].height || 0;

    this.scrollBarHeight = height * this.barHeight / this.imageHeight;
    console.log(' ngOnInit scrollBarHeight: ' + this.scrollBarHeight);

    this.createSvg();
    this.drawBars();

    //-------------------------------------------------------------------------------

    // const BORDER_SIZE = 4;
      const panel = document.getElementById("resize-horizontal-svg");

    let m_pos=0;


    this.panel.addEventListener("mousedown", this.onMouseDown);
    this.panel.addEventListener("mouseup", this.onMouseUp);

    // document.addEventListener("mouseup", function(){
    //   document.removeEventListener("mousemove",  this.resize(event), false);
    // }, false);

    // const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
    // const keyPress$ = fromEvent<KeyboardEvent>(document, 'keyup');
    // const mergeBothEvents = merge(keyPress$, mouseMove$);
    // const interval$ = timer(60000);
    //
    // mergeBothEvents
    //   .pipe(
    //     startWith('initial'),
    //     switchMap(() => {
    //       return interval$;
    //     })
    //   )
    //   .subscribe(() => {
    //     console.log('60 seconds past');
    //     console.log('Perform function here');
    //   });


    this.cdr.detectChanges();



  }

  onMouseDown: { (e: MouseEvent): void } = (e: MouseEvent) => {
    console.log( e.pageX);
    console.log(e.offsetX);

    if (e.offsetX -e.pageX < this.BORDER_SIZE) {
      this.m_pos = e.x;
      document.addEventListener("mousemove", this.onMouseMove, false);
    }
  }

  onMouseMove: { (event: MouseEvent): void } = (event: MouseEvent) => {
    this.resize(event);
  }
  onMouseUp: { (event: MouseEvent): void } = (event: MouseEvent) => {
    this.resize(event);
  }
  // outputsize(entries: any ) {
  //   const entry = entries[0];
  //   const container = entry.target;
  //   console.log('container');
  //   console.log(container);
  //   console.log('aa');
  //   let horizontal = document.getElementById("resize-horizontal-svg")
  //   let width = horizontal?.offsetWidth || 0;
  //   let height = horizontal?.offsetHeight || 0;
  //
  //
  //   console.log('W:' + width, 'H:' + height);
  //
  //   let horizontal2 = document.getElementById("imageId")
  //   this.imageWidth = horizontal2?.getClientRects()[0].width || 0;
  //   this.imageHeight = horizontal2?.getClientRects()[0].height || 0;
  //
  //   //todo viewboxHeight is not reflecting to html
  //   console.log('image width:' + this.imageWidth, 'image height:' + this.imageHeight);
  //   this.viewboxHeight = 40 * this.imageHeight / this.imageWidth;
  //   console.log('viewbox Height:' + this.viewboxHeight);
  //
  //   this.scrollBarHeight = height * 882 / this.imageHeight
  //   console.log('outputsize scrollBarHeight: ' + this.scrollBarHeight);
  //  // this.cdr.detectChanges();
  // }

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
  private createSvg(): void {
    this.svg = d3.select("p#resize-horizontal2")
      .append("svg")
      // .attr("width", 40  )
      // .attr("height", 1137 )
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + 0 + ")");
  }
  private drawBars( ): void {
    // Create the X-axis band scale
    // const x = d3.scaleBand()
    //   .range([0, this.scaleWidth])
    //   .domain(data.map(d => d.Framework))
    //   .padding(0.2);

    // Draw the X-axis on the DOM
    // this.svg.append("g")
    //   .attr("transform", "translate(0," + this.height + ")")
    //   .call(d3.axisBottom(x))
    //   .selectAll("text")
    //   .attr("transform", "translate(-10,0)rotate(-45)")
    //   .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([200, 201.5])
      .range([0, this.scaleHeight]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    // this.svg.selectAll("bars")
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .attr("x", (d: any) => x(d.Framework))
    //   .attr("y", (d: any) => y(d.Stars))
    //   .attr("width", x.bandwidth())
    //   .attr("height", (d: any) => this.scaleHeight - y(d.Stars))
    //   .attr("fill", "#d04a35");
  }

  dragEnd($event: CdkDragEnd) {
    console.log($event.source.getFreeDragPosition());
    const offsetY = $event.source.getFreeDragPosition().y;
    // this.offsetY_OnBar = -1 * offsetY * this.barHeight / this.imageHeight;


    // console.log('offsetY_OnBar: ' + this.offsetY_OnBar);
    console.log('drag End scrollBarHeight: ' + this.scrollBarHeight);
    this.cdr.detectChanges();
  }

  dragMoved($event: CdkDragMove) {
    console.log($event.pointerPosition);
    console.log($event.source.getFreeDragPosition());
    this.offsetY = $event.source.getFreeDragPosition().y;
    const offsetY_OnBar = -1 * this.offsetY * this.barHeight / this.imageHeight;


    console.log('offsetY_OnBar: ' + offsetY_OnBar);
    console.log('drag End scrollBarHeight: ' + this.scrollBarHeight);

    this.dragPositionBar = {x: 0, y: offsetY_OnBar };

    if (document.getElementById("imageSVG") ){
      // const svgElement :SVGSVGElement  = document.getElementById("imageSVG") ;
      // const {x, y, width, height} = svgElement.viewBox.baseVal;
      //
      // this.svg = d3.select("imageSVG")
      //   .append("svg")
      //   // .attr("width", 40  )
      //   // .attr("height", 1137 )
      //   .append("g")
      //   .attr("transform", "translate(" + this.margin + "," + 0 + ")");
    }

    this.cdr.detectChanges();
  }

  dropEndBar($event: CdkDragEnd) {
    // console.log($event.source.getFreeDragPosition());
    const offsetY = $event.source.getFreeDragPosition().y;

    console.log('dropEndBar:' + offsetY);
    // this.offsetY_OnBar = -1 * offsetY * this.barHeight / this.imageHeight;
    //
    //
    // console.log('offsetY_OnBar: ' + this.offsetY_OnBar);
    // console.log('drag End scrollBarHeight: ' + this.scrollBarHeight);
    this.cdr.detectChanges();
  }

  dragMoveBar($event: CdkDragMove) {
    // console.log($event.pointerPosition);
    console.log($event.source.getFreeDragPosition());
    const offsetY = $event.source.getFreeDragPosition().y;
    console.log(offsetY);
    const offsetY_OnBar =  offsetY * this.imageHeight / this.barHeight;
    this.dragPositionImage = {x: 0, y: -offsetY_OnBar };
    // this.offsetY_OnBar = -1 * offsetY * this.barHeight / this.imageHeight;


    // console.log('offsetY_OnBar: ' + this.offsetY_OnBar);
    // console.log('drag End scrollBarHeight: ' + this.scrollBarHeight);
    this.cdr.detectChanges();
  }
  onImageLoad(){
    let imageContainer = document.getElementById("resize-horizontal-svg")
    let width = imageContainer?.offsetWidth || 0;
    let height = imageContainer?.offsetHeight || 0;

    let horizontal2 = document.getElementById("imageId")
    this.imageWidth = horizontal2?.getClientRects()[0].width || 0;
    this.imageHeight = horizontal2?.getClientRects()[0].height || 0;

    //todo viewboxHeight is not reflecting to html
    console.log('image width:' + this.imageWidth, 'image height:' + this.imageHeight);
    // this.viewboxHeight = 40 * this.imageHeight / this.imageWidth;
    // console.log('viewbox Height:' + this.viewboxHeight);

    this.scrollBarHeight = height * this.barHeight / this.imageHeight
    console.log('outputsize scrollBarHeight: ' + this.scrollBarHeight);

    this.dragPositionBar = {x: 0, y: 0};
  }
  ngAfterViewInit(): void {
    let resizableDiv = document?.querySelector('#resize-horizontal-svg');
    console.log(resizableDiv);
    // @ts-ignore
    // const obs =  new ResizeObserver(this.outputsize).observe(resizableDiv);
    const obs = new ResizeObserver(entries => {
      const entry = entries[0];
      const cr = entry.contentRect;
      const width = cr.width; // parent width
      const height = cr.height; // parent height
      console.log(this.imageWidth, this.imageHeight);


      const container = entry.target;
      console.log('container');
      console.log(container);
      console.log('aa');

      //another way to get width and height
      let imageContainer = document.getElementById("resize-horizontal-svg")
      let width2 = imageContainer?.offsetWidth || 0;
      let height2 = imageContainer?.offsetHeight || 0;


      console.log('W:' + width2, 'H:' + height2);

      let horizontal2 = document.getElementById("imageId")
      this.imageWidth = horizontal2?.getClientRects()[0].width || 0;
      this.imageHeight = horizontal2?.getClientRects()[0].height || 0;

      //todo viewboxHeight is not reflecting to html
      console.log('image width:' + this.imageWidth, 'image height:' + this.imageHeight);
      // this.viewboxHeight = 40 * this.imageHeight / this.imageWidth;
      // console.log('viewbox Height:' + this.viewboxHeight);

      if (this.imageHeight){
        this.scrollBarHeight = height * this.barHeight / this.imageHeight
        console.log('outputsize scrollBarHeight: ' + this.scrollBarHeight);
        this.dragPositionBar = {x: 0, y: this.scrollBarHeight};
      }




      // Then tell Angular to detect changes


      this.cdr.detectChanges();
    });


    // @ts-ignore
    obs.observe(resizableDiv);
  }

  // onMouseUp($event: MouseEvent) {
  //
  //   const offsetY = $event.y
  //
  //   console.log('mouse up:' + offsetY);
  //   console.log(' $event.clientY:' ,  $event.clientY);
  //
  //   const coordinateY = $event.offsetY - this.offsetY;
  //   console.log('real coordinateY in Image:' ,  coordinateY);
  // }
  onMouseUpSVG($event: MouseEvent) {

    // const offsetY = $event.y
    //
    // console.log('SVG mouse up:' + offsetY);
    // console.log('SVG $event.clientY:' +  $event.clientY);
    // console.log('SVG $event.offsetY:' +  $event.offsetY);
  }

  dragLineEnd($event: CdkDragEnd) {
    //1. one way
    //https://stackoverflow.com/questions/52608005/angular-cdk-drag-and-drop-cancel-drag-action
    $event.source._dragRef.reset();

    //2. another way
    /*
         https://github.com/angular/components/issues/13661
    $event.source.element.nativeElement.style.transform = 'none' // visually reset element to its origin
    const source: any = $event.source
    source._passiveTransform = { x: 0, y: 0 } // make it so new drag starts from same origin
     */




  }

  dragLineMoved($event: CdkDragMove) {
    const xxx = $event.source.getFreeDragPosition().y;


    console.log('xxx: ' + xxx);
    if (xxx>50){
      // $event.source.element.nativeElement.style.transform = 'none' // visually reset element to its origin
      // const source: any = $event.source
      // source._passiveTransform = { x: 0, y: 0 } // make it so new drag starts from same origin
      // this.cdr.detectChanges();
    }

  }

  @HostListener('window:keydown', ['$event'])
  keyEventDown(event: KeyboardEvent) {
    if(event.key.toLowerCase() === "a") {
      this.cdkDragDisabled_interval = false;
      this.cdkDragDisabled_image = true;
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEventUp(event: KeyboardEvent) {
    if(event.key.toLowerCase() === "a") {
      this.cdkDragDisabled_interval = true;
      this.cdkDragDisabled_image = false;
    }
  }

  //not working
  handleKeyDown(event: KeyboardEvent) {
    console.log('event.key:'+ event.key);
    // if (event.key === DOWN_ARROW || event.keyCode === RIGHT_ARROW) {
    //
    // }
    // if (event.keyCode === UP_ARROW || event.keyCode === LEFT_ARROW) {
    //
    // }
  }
}
