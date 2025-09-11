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

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }

    let previous = null;
    let current = this.root;
    while (current) {
      if (value < current.data) {
        previous = current;
        current = current.left;
      } else if (value > current.data) {
        previous = current;
        current = current.right;
      } else {
        return;
      }
    }

    if (value < previous.data) {
      previous.left = new Node(value);
    } else {
      previous.right = new Node(value);
    }
  }

  _deleteRecursively(root, value) {
    if (root === null) {
      return null;
    }

    if (root.data > value) {
      root.left = this._deleteRecursively(root.left, value);
    } else if (root.data < value) {
      root.right = this._deleteRecursively(root.right, value);
    } else {
      if (!root.left) {
        return root.right;
      }

      if (!root.right) {
        return root.left;
      }

      let replacement = this._findReplacement(root);
      root.data = replacement.data;
      root.right = this._deleteRecursively(root.right, replacement.data);
    }

    return root;
  }

  _findReplacement(current) {
    current = current.right;
    while (current.left) {
      current = current.left;
    }

    return current;
  }

  delete(value) {
    this.root = this._deleteRecursively(this.root, value);
  }

  _findRecursively(root, value) {
    if (root === null) {
      return null;
    }

    if (root.data > value) {
      return this._findRecursively(root.left, value);
    } else if (root.data < value) {
      return this._findRecursively(root.right, value);
    } else {
      return root;
    }
  }

  find(value) {
    return this._findRecursively(this.root, value);
  }
}
