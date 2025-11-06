import Tree from "./Tree.js";

// Hardcoded unique values < 100
const arr = [12, 7, 90, 24, 3, 18, 77, 1, 5, 50];

console.log("Source array:", arr, "\n");

// 1. Build tree
const tree = new Tree(arr);
prettyPrint(tree.root);
console.log('\n');

// 2. Check balanced
console.log("Tree balanced?", tree.isBalanced(), "\n");

// 3. Print traversals
printTraversals(tree);

// 4. Insert values > 100 to unbalance tree
console.log("Inserting values > 100 to unbalance...", '\n');
[105, 120, 150, 200, 250].forEach(v => tree.insert(v));

prettyPrint(tree.root);
console.log('\n');
console.log("Tree balanced after inserts?", tree.isBalanced(), "\n");

// 5. Rebalance
console.log("Rebalancing...", '\n');
tree.rebalance();

// 6. Check again
prettyPrint(tree.root);
console.log('\n');
console.log("Tree balanced after rebalance?", tree.isBalanced(), "\n");

// 7. Print traversals again
printTraversals(tree);


// --- helpers ---
function printTraversals(tree) {
  const level = [];
  const pre = [];
  const post = [];
  const inOrder = [];

  tree.levelOrderForEach(n => level.push(n.data));
  tree.preOrderForEach(n => pre.push(n.data));
  tree.postOrderForEach(n => post.push(n.data));
  tree.inOrderForEach(n => inOrder.push(n.data));

  console.log("Level Order:", level);
  console.log("Pre Order:  ", pre);
  console.log("Post Order: ", post);
  console.log("In Order:   ", inOrder);
  console.log("\n");
}

function prettyPrint(node, prefix = '', isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}
