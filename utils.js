import Tree from "./bst.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const randomArrayGenerator = (arrayLength) => {
  if (arrayLength < 5 || arrayLength > 100) {
    throw new Error("Array size must be between 5 - 100");
  }

  const result = [];

  for (let i = 0; i < arrayLength; i++) {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    result.push(randomNum);
  }

  return result;
};

const printTraversals = (tree) => {
  const levelOrder = [];
  tree.levelOrderForEach((node) => {
    levelOrder.push(node.data);
  });

  console.log(`Levelorder: ${levelOrder.join(" ")}`);

  const preOrder = [];
  tree.preOrderForEach((node) => {
    preOrder.push(node.data);
  });

  console.log(`Preorder: ${preOrder.join(" ")}`);

  const inOrder = [];
  tree.inOrderForEach((node) => {
    inOrder.push(node.data);
  });

  console.log(`Inorder: ${inOrder.join(" ")}`);

  const postOrder = [];

  tree.postOrderForEach((node) => {
    postOrder.push(node.data);
  });

  console.log(`Postorder: ${postOrder.join(" ")}`);
};

export default function runTests() {
  const array = randomArrayGenerator(15);
  const binarySearchTree = new Tree(array);

  console.log(prettyPrint(binarySearchTree.root));

  console.log(`Tree is balanced: ${binarySearchTree.isBalanced()}`);

  printTraversals(binarySearchTree);

  console.log(
    "Unbalance the tree, adding the following values ​​to the tree: 120, 125, 150, 200, 240."
  );

  binarySearchTree.insert(120);
  binarySearchTree.insert(125);
  binarySearchTree.insert(150);
  binarySearchTree.insert(200);
  binarySearchTree.insert(240);

  console.log(prettyPrint(binarySearchTree.root));
  console.log(`Tree is balanced: ${binarySearchTree.isBalanced()}`);

  console.log("Rebalancing the tree...");
  binarySearchTree.rebalance();
  console.log(prettyPrint(binarySearchTree.root));
  console.log(`Tree is balanced: ${binarySearchTree.isBalanced()}`);

  printTraversals(binarySearchTree);
}
