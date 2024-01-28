1. Intersection Observer 
   It is working with <div> in the example. but not working for <image>, 
   find out how it can be used in the project, especially image laze loading.

   https://medium.com/@joosep.parts/how-to-use-intersection-observer-api-with-a-directive-e86f0253c207
   https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

2. Image Lazy Loading Using Browser’s Intersection Observer API — A Step by Step Guide with Examples
   https://medium.com/fasal-engineering/image-lazy-loading-using-browsers-intersection-observer-api-a-step-by-step-guide-with-examples-b1a867614e8

3. Make Intersection Observer work for <svg> <image>
   https://stackblitz.com/edit/github-7bm15h?file=src%2Fapp%2Fdirectives%2Fintersection-observer.directive.ts,src%2Fapp%2Fcomponents%2Fdrag%2Fdrag.component.html

Todos:

0. use NgOptimizedImage to optimize the image display
   https://stackblitz.com/edit/angular-ngoptimizedimage-example-zm3chv?file=package.json,src%2Fapp%2Fapp.module.ts


1. How to display icon menu?

   a. https://www.youtube.com/watch?v=GPua-pGCeMk

   download fontawesome locally, or use other icons
   b. https://fontawesome.com/v4/icons/

2. Drag, resize the image - Priority:Lower
   a. drag in the middle of image.  look at  https://codepen.io/jkasun/pen/QrLjXP  Priority:Lower
   b. resize base on the middle depth of image, rather than from top. look at  code  https://codepen.io/jkasun/pen/QrLjXP  

3. display scale on the left when scroll up/down.
4. display scale bar on the very left image
5. define real depth and pixels mapping.
6. create icon button on top

7. How to display lithology selection
   Learn how to display image using CSS, and make selection.
   https://medium.com/@rainer_8955/learning-angular-by-writing-games-c6aa8b9a2248

8. apply cdkDrag for - done
   <rect x="0px" attr.y="{{offsetY_OnBar}}px" width="40px" attr.height='{{scrollBarHeight}}px'
   style="fill: white; fill-opacity: .1;
   stroke: red; stroke-width: 1; "/>

   test it, it is working fine.


9. how to resize the SVG rect? Don't do it.
    a. add upper and bottom line?
    b. select the RECT edge?

10. bug list:
    a. Depth range transferred from ControlBar to Image is correct; from Image (when scrolling) to Control is not.
11. 
a. what is dragPositionImage in html file? There is no difference when remove it.
