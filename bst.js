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

  _insertRecursively(root, value) {
    if (root === null) {
      return new Node(value);
    }

    if (root.data === value) {
      return root;
    }

    if (root.data > value) {
      root.left = this._insertRecursively(root.left, value);
    } else if (root.data < value) {
      root.right = this._insertRecursively(root.right, value);
    } 
    
    return root;
  }

  insert(value) {
    return this._insertRecursively(this.root, value);
  }


  // insert(value) {
  //   if (!this.root) {
  //     this.root = new Node(value);
  //     return;
  //   }

  //   let previous = null;
  //   let current = this.root;
  //   while (current) {
  //     if (value < current.data) {
  //       previous = current;
  //       current = current.left;
  //     } else if (value > current.data) {
  //       previous = current;
  //       current = current.right;
  //     } else {
  //       return;
  //     }
  //   }

  //   if (value < previous.data) {
  //     previous.left = new Node(value);
  //   } else {
  //     previous.right = new Node(value);
  //   }
  // }

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

  levelOrderRecursively(callback, queue = [this.root]) {
    if (queue.length <= 0) {
      return;
    } else {
      let current = queue.shift();

      if (current.left) {
        queue.push(current.left);
      }

      if (current.right) {
        queue.push(current.right);
      }

      callback(current.data);
      this.levelOrderRecursively(callback, queue);
    }
  }

  levelOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }

    if (!this.root) {
      return;
    }

    let queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();
      callback(current);

      if (current.left) {
        queue.push(current.left);
      }

      if (current.right) {
        queue.push(current.right);
      }
    }
  }

  _inOrderRecursively(root, callback) {
    if (root === null) {
      return null;
    }

    this._inOrderRecursively(root.left, callback);
    callback(root);
    this._inOrderRecursively(root.right, callback);
  }

  inOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }

    this._inOrderRecursively(this.root, callback);
  }

  _preOrderRecursively(root, callback) {
    if (root === null) {
      return null;
    }

    callback(root);
    this._preOrderRecursively(root.left, callback);
    this._preOrderRecursively(root.right, callback);
  }

  preOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }

    this._preOrderRecursively(this.root, callback);
  }

  _postOrderRecursively(root, callback) {
    if (root === null) {
      return;
    }

    this._postOrderRecursively(root.left, callback);
    this._postOrderRecursively(root.right, callback);
    callback(root);
  }

  postOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }

    this._postOrderRecursively(this.root, callback);
  }

  _heightRecursively(root) {
    if (root === null) {
      return -1;
    } else {
      const leftHeight = this._heightRecursively(root.left);
      const rightHeight = this._heightRecursively(root.right);

      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  heigth(value) {
    const foundNode = this.find(value);

    if (!foundNode) {
      return null;
    }

    return this._heightRecursively(foundNode);
  }

  _depthRecursively(root, value) {
    if (root === null) {
      return -1;
    } else {
      if (root.data > value) {
        return this._depthRecursively(root.left, value) + 1;
      } else if (root.data < value) {
        return this._depthRecursively(root.right, value) + 1;
      } else {
        return 0;
      }
    }
  }

  depth(value) {
    return this._depthRecursively(this.root, value);
  }

  _isBalancedRecursively(root) {
    if (!root) {
      return {
        height: -1,
        balanced: true,
      };
    }

    const left = this._isBalancedRecursively(root.left);
    const right = this._isBalancedRecursively(root.right);

    const height = Math.max(left.height, right.height) + 1;
    const balanced =
      left.balanced &&
      right.balanced &&
      Math.abs(left.height - right.height) <= 1;

    return {
      height,
      balanced,
    };
  }

  isBalanced() {
    return this._isBalancedRecursively(this.root).balanced;
  }

  rebalance() {
    if (!this.root) {
      return;
    }

    const values = [];
    this.inOrderForEach((node) => values.push(node.data));

    this.root = this.createTree(values, 0, values.length - 1);
  }
}
