class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = array.toSorted((a, b) => a - b);
    const uniques = [];

    for (let i = 0; i < sortedArray.length; i++) {
      if (i === 0 || sortedArray[i] !== sortedArray[i - 1]) {
        uniques.push(sortedArray[i]);
      }
    }

    return uniques;
  }
}
