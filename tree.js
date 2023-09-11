class Node {
    constructor(value = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        this.sortedArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(this.sortedArray)
    }

    #minVal(root) {
      let minv = root.value;
      while (root.left !== null) {
        minv = root.left.value;
        root = root.left
      }
      return minv
    }

    buildTree(sortedArray) {
        if(sortedArray.length === 0) return null;
        let middle = Math.floor(sortedArray.length / 2);
        const newNode = new Node(sortedArray[middle]);

        const leftTree = sortedArray.slice(0, middle);
        const rightTree = sortedArray.slice(middle + 1);
        newNode.left = this.buildTree(leftTree);
        newNode.right = this.buildTree(rightTree);

        return newNode;
    }

    insert(value, root = this.root) {
      if (root === null) return new Node(value);
      value < root.value
        ? (root.left = this.insert(value, root.left))
        : (root.right = this.insert(value, root.right));

      return root;
    }

    delete(value, root = this.root) {
      if (!root) return root;
      if(root.value > value) {
        root.left = this.delete(value, root.left)
      } else if (root.value < value) {
        root.right = this.delete(value, root.right)
      } else {
        if (root.left === null) return root.right;
        else if (root.right === null) return root.left;
        root.value = this.#minVal(root.right);
        root.right = this.delete(value, root.right)
      }
      return root;
    }

    find(value, root = this.root) {
      if (!root) return null;
      if (root.value !== value) {
        return root.value < value ? this.find(value, root.right) : this.find(value, root.left)
      }
      return root
    }

    levelOrder() {
      if (!this.root) return [];
      const queue = [this.root];
      let result = []
      while (queue.length) {
        let level = [];
        for(let i = 0; i < queue.length; i++) {
          const tempNode = queue.shift();
          level.push(tempNode.value)
          if(tempNode.left) queue.push(tempNode.left);
          if(tempNode.right) queue.push(tempNode.right);
        }
        result.push(level)
      }
      return result;
    }

    // root left right
    preorder() {
      if (!this.root) return [];
      const rootLR = [this.root];
      const results = [];
      while (rootLR.length) {
        const node = rootLR.pop();
        if(node.right) rootLR.push(node.right);
        if(node.left) rootLR.push(node.left);
        results.push(node.value)
      }
      return results;
    }

    // left root right
    inorder(node = this.root, callback, result = []) {
      if (!this.root) return [];
      if (node === null) return;
      this.inorder(node.left, callback, result);
      callback ? callback(node) : result.push(node.value);
      this.inorder(node.right, callback, result);
      if (result) return result;
    }

    // left right root
    postorder() {
      if (!this.root) return [];
      const leftRR = [this.root];
      const result = [];
      while(leftRR.length) {
        const node = leftRR.pop();
        if(node.left) leftRR.push(node.left);
        if(node.right) leftRR.push(node.right);
        result.push(node.value)
      }
      return result;
    }

    // height

    height(node = this.root) {
      if (node === null) return -1;
      const left = this.height(node.left);
      const right = this.height(node.right);
      return Math.max(left, right) + 1
    }

    depth(node = this.root) {
      if (node === null) return 0;
      let lCount = this.depth(node.left);
      let rCount = this.depth(node.right);
      if (lCount > rCount) {
        return (lCount + 1);
      } else return rCount + 1
    }

    isBalanced(node = this.root) {
      if (node === null) return true;
      const diff = Math.abs(this.height(node.left) - this.height(node.right));
      return (
        diff <= 1 &&
        this.isBalanced(node.left) &&
        this.isBalanced(node.right)
      )
    }

    rebalance() {
      if (this.root === null) return;
      const sorted = [...new Set(this.inorder().sort((a, b) => a - b))];
      this.root = this.buildTree(sorted);
    }

}



  
