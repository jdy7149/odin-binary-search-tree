import Node from "./Node.js";

export default class Tree {
  constructor(arr) {
    this.root = this.#buildTree(arr);
  }

  insert(value) {
    const helper = (node) => {
      if (!node) {
        return new Node(value);
      }

      if (value < node.value) {
        node.left = helper(node.left);
      } else if (value > node.value) {
        node.right = helper(node.right);
      } else {
        throw Error('Duplication not allowed!')
      }
    };

    helper(this.root);
  }

  deleteItem(value) {
    const helper = (node) => {
      if (value === node.value) {
        if (node.left && node.right) {
          let nextBiggest = node.right;


        } else {
          return node.left ?? node.right;
        }
      } else if (value < node.value) {
        node.left = helper(node.left);
      } else {
        node.right = helper(node.right);
      }
    };

    helper(this.root);
  }

  find(value) {
    const helper = (node) => {
      if (!node) {
        return null;
      }
      
      if (value < node.value) {
        return helper(node.left);
      } else if (value > node.right) {
        return helper(node.right);
      } else {
        return node;
      }
    };

    return helper(this.root);
  }

  levelOrderForEach(callback) {
    if (!callback || typeof callback !== 'function') {
      throw Error('Callback function required!');
    }

    if (!this.root) return;

    const q = [this.root];

    while (q.length !== 0) {
      const curr = q.shift();

      callback(curr);

      if (curr.left) q.push(curr.left);
      if (curr.right) q.push(curr.right);
    }
  }

  inOrderForEach(callback) {
    const inOrderTraverse = (root) => {
      if (!root) {
        return;
      }

      inOrderTraverse(root.left);
      callback(root);
      inOrderTraverse(root.right);
    };

    inOrderTraverse(this.root);
  }

  preOrderForEach(callback) {
    const preOrderTraverse = (root) => {
      if (!root) {
        return;
      }

      callback(root);
      preOrderTraverse(root.left);
      preOrderTraverse(root.right);
    };

    preOrderTraverse(this.root);
  }

  postOrderForEach(callback) {
    const postOrderTraverse = (root) => {
      if (!root) {
        return;
      }

      postOrderTraverse(root.left);
      postOrderTraverse(root.right);
      callback(root);
    };

    postOrderTraverse(this.root);
  }

  height(value) {
    const helper = (node, h) => {
      if (!node) return h;
      
      if (h > -1 || value === node.value) {
        return Math.max(helper(node.left, h + 1), helper(node.right, h + 1));
      } else if (value < node.value) {
        return helper(node.left, h);
      } else {
        return helper(node.right, h);
      }
    };

    const h = helper(this.root, -1);
    return h === -1 ? null : h;
  }
  
  depth(value) {
    const helper = (node) => {
      if (!node) {
        return null;
      }

      if (value === node.value) {
        return 0;
      } 

      const next = value < node.value ? node.left : node.right;
      const lower = helper(next);

      return lower == null ? null : lower + 1;
    };

    return helper(this.root);
  }

  isBalanced() {

  }

  rebalance() {
    const nodes = [];

    this.inOrderForEach((node) => nodes.push(node.value));

    this.root = this.#buildTree(nodes);
  }

  #buildTree(arr) {
    const sortedArr = arr.toSorted((a, b) => a - b);

    const build = (start, end) => {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);

      const root = new Node(sortedArr[mid]);

      root.left = build(start, mid - 1);
      root.right = build(mid + 1, end);

      return root;
    };

    return build(0, sortedArr.length - 1);
  }
}
