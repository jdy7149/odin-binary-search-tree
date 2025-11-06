import Node from "./Node.js";

export default class Tree {
  constructor(arr) {
    this.root = this.#buildTree(arr);
  }

  insert(value) {
    const insertNode = (node) => {
      if (!node) {
        return new Node(value);
      }

      if (value < node.value) {
        node.left = insertNode(node.left);
      } else if (value > node.value) {
        node.right = insertNode(node.right);
      } else {
        throw Error('Duplication not allowed!')
      }
    };

    this.root = insertNode(this.root);
  }

  deleteItem(value) {
    const deleteNode = (node, target) => {
      if (!node) return null;

      if (target === node.value) {
        if (node.left && node.right) {
          let successor = node.right;

          while (successor.left) {
            successor = successor.left;
          }

          node.value = successor.value;

          node.right = deleteNode(node.right, successor.value);
        } else {
          return node.left ?? node.right;
        }
      } else if (target < node.value) {
        node.left = deleteNode(node.left, target);
      } else {
        node.right = deleteNode(node.right, target);
      }

      return node;
    };

    this.root = deleteNode(this.root, value);
  }

  find(value) {
    const findNode = (node) => {
      if (!node) {
        return null;
      }
      
      if (value < node.value) {
        return findNode(node.left);
      } else if (value > node.value) {
        return findNode(node.right);
      } else {
        return node;
      }
    };

    return findNode(this.root);
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
    const traverseInOrder = (root) => {
      if (!root) {
        return;
      }

      traverseInOrder(root.left);
      callback(root);
      traverseInOrder(root.right);
    };

    traverseInOrder(this.root);
  }

  preOrderForEach(callback) {
    const traversePreOrder = (root) => {
      if (!root) {
        return;
      }

      callback(root);
      traversePreOrder(root.left);
      traversePreOrder(root.right);
    };

    traversePreOrder(this.root);
  }

  postOrderForEach(callback) {
    const traversePostOrder = (root) => {
      if (!root) {
        return;
      }

      traversePostOrder(root.left);
      traversePostOrder(root.right);
      callback(root);
    };

    traversePostOrder(this.root);
  }

  height(value) {
    const findHeight = (node, h) => {
      if (!node) return h;
      
      if (h > -1 || value === node.value) {
        return Math.max(findHeight(node.left, h + 1), findHeight(node.right, h + 1));
      } else if (value < node.value) {
        return findHeight(node.left, h);
      } else {
        return findHeight(node.right, h);
      }
    };

    const result = findHeight(this.root, -1);
    return result === -1 ? null : result;
  }
  
  depth(value) {
    const findDepth = (node) => {
      if (!node) return null;
      if (value === node.value) return 0;

      const next = value < node.value ? node.left : node.right;
      const childDepth = findDepth(next);

      return childDepth == null ? null : childDepth + 1;
    };

    return findDepth(this.root);
  }

  isBalanced() {
    const check = (node) => {
      if (!node) {
        return {
          balanced: true,
          height: -1,
        };
      }

      const { balanced: isLeftBalnced, height: leftHeight } = check(node.left);
      const { balanced: isRightBalnced, height: rightHeight } = check(node.right);

      return {
        balanced: isLeftBalnced && isRightBalnced && Math.abs(leftHeight - rightHeight) <= 1,
        height: Math.max(leftHeight, rightHeight) + 1,
      };
    };

    return check(this.root).balanced;
  }

  rebalance() {
    const sortedValues = [];

    this.inOrderForEach((node) => sortedValues.push(node.value));

    this.root = this.#buildTree(sortedValues);
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
