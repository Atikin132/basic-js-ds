const { NotImplementedError } = require("../lib/errors");
// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class Node {
  constructor(data) {
    this.data = data;
    this.left;
    this.right;
  }
  add(data) {
    if (this.data === data) {
      return;
    }
    this.data > data ? this.addLeft(data) : this.addRight(data);
  }

  addLeft(data) {
    if (this.left) {
      this.left.add(data);
    } else {
      this.left = new Node(data);
    }
  }
  addRight(data) {
    if (this.right) {
      this.right.add(data);
    } else {
      this.right = new Node(data);
    }
  }
}
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    if (this.rootNode) {
      this.rootNode.add(data);
    } else {
      this.rootNode = new Node(data);
    }
  }

  find(data) {
    let current = this.rootNode;
    while (current) {
      if (current.data === data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    let current = this.rootNode;
    let parent = null;
    while (current && current.data !== data) {
      parent = current;
      current = data < current.data ? current.left : current.right;
    }
    if (!current) return;
    if (!current.left && !current.right) {
      if (!parent) {
        this.rootNode = null;
      } else if (parent.left === current) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (!current.left || !current.right) {
      const child = current.left || current.right;
      if (!parent) {
        this.rootNode = child;
      } else if (parent.left === current) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    } else {
      let minParent = current;
      let minNode = current.right;
      while (minNode.left) {
        minParent = minNode;
        minNode = minNode.left;
      }
      current.data = minNode.data;
      if (minParent.left === minNode) {
        minParent.left = minNode.right;
      } else {
        minParent.right = minNode.right;
      }
    }
  }

  min() {
    if (!this.rootNode) {
      return null;
    }
    let current = this.rootNode;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }
    let current = this.rootNode;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
