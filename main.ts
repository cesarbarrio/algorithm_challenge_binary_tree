'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');
// process.stdin.setEncoding('ascii');
let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;
process.stdin.on('data', function (inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function (): void {
    inputLines = inputString.split(/\s/);
    inputString = '';
    solution();
});

function readLine(): string {
    return inputLines[currentLine++];
}

class TreeNode {
    data: number;
    left: null | TreeNode;
    right: null | TreeNode;
    constructor(data: number) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    root: TreeNode | null;
    constructor() {
        this.root = null;
    }
    insert(node: TreeNode, data: number) {
        if (node == null) {
            node = new TreeNode(data);
        }
        else if (data < node.data) {
            node.left = this.insert(node.left, data);
        }
        else {
            node.right = this.insert(node.right, data);
        }

        return node;
    }
}

//Code solution starts here (line 54)

function getNodes(node: TreeNode): TreeNode[] {

    let nodes: TreeNode[] = [];

    if (node.left !== null) {
        nodes.push(node.left);
    }

    if (node.right !== null) {
        nodes.push(node.right);
    }

    return nodes;
}

function countHeight(node: TreeNode): number {

    let height = 0;

    let nodesFound = getNodes(node);

    while (nodesFound.length !== 0) {
        height++;
        for (let nodeFound of nodesFound) {
            const nodesFoundByNodeFound = getNodes(nodeFound);

            if (nodesFound.length !== 0) {
                nodesFound = nodesFoundByNodeFound;
            } else {
                nodesFound.push(...nodesFoundByNodeFound);
            }
        }
    }

    return height;
}



function treeHeight(root: TreeNode): string {
    return countHeight(root).toString();
}

//Code solution ends here (line 99)

function solution() {

    var tree = new Tree();
    var n = parseInt(readLine());

    for (var i = 0; i < n; i++) {
        var m = parseInt(readLine());
        tree.root = tree.insert(tree.root, m);
    }

    var height = treeHeight(tree.root);
    process.stdout.write(height);
}