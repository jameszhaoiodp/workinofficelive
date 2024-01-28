export interface IInterval {
  top: number,
  bottom: number,
  lithology: string
}
/*
1. interval array top / bottom
2. intervals are in the order:
       a. top of the interval is related to bottom of previous interval
       b. bottom of the interval is same to top of next interval
3. when move the top line of the interval, previous interval' bottom will move
4. when move the bottom of the interval, next interval's top will move
5. validate the interval array to make sure top/bottom are connected with each other.

6. add/remove an interval, will call validate()

7. add a new interval: something changes, such as split

8. remove an interval: something changes, how to merge
 */

