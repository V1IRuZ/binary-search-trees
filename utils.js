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
    throw new Error("Array size must be between 5 - 100")
  }

  const result = [];

  for (let i = 0; i < arrayLength; i++) {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    result.push(randomNum);
  }

  return result;
};

export { prettyPrint, randomArrayGenerator };
