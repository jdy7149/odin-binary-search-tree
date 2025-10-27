import Node from "./Node.js";

class Tree {
  constructor(arr) {
    this.root = this.#buildTree(arr);
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }

    let curr = this.root;

    while (curr) {
      if (value === curr.value) {
        throw Error('No duplication allowed!');
      } else if (value < curr.value) {
        if (!curr.left) {
          curr.left = new Node(value);
          return;
        }

        curr = curr.left
      } else {
        if (!curr.right) {
          curr.right = new Node(value);
          return;
        }

        curr = curr.right;
      }
    }
  }

  deleteItem(value) {

  }

  #buildTree(arr) {
    const sortedArr = arr.toSorted((a, b) => a - b);

    function build(start, end) {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);

      const root = new Node(sortedArr[mid]);

      root.left = build(start, mid - 1);
      root.right = build(mid + 1, end);

      return root;
    }

    return build(0, sortedArr.length - 1);
  }
}