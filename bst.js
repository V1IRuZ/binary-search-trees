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

  sort(array) {
    const sortedArray = array.toSorted((a, b) => a - b);
    const uniques = [];

    for (let i = 0; i < sortedArray.length; i++) {
      if (i === 0 || sortedArray[i] !== sortedArray[i - 1]) {
        uniques.push(sortedArray[i]);
      }
    }

    return uniques;
  }

  createTree(array, start, end) {
    if (start > end) {
      return null;
    }

    const mid = start + Math.floor((end - start) / 2);
    const root = new Node(array[mid]);

    root.left = this.createTree(array, start, mid - 1);
    root.right = this.createTree(array, mid + 1, end);

    return root;
  }

  buildTree(array) {
    const sorted = this.sort(array);

    return this.createTree(sorted, 0, sorted.length - 1);
  }
}
