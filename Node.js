export default class Node {
  constructor(val = 0, left = null, right = null) {
    this.data = val;
    this.left = left;
    this.right = right;
  }
}