import LinkedListNode from "./linkedListNode";
import Comparator from "../Comparator";

export default class linkedList {
  /**
   * @param {function} [comparator function]
   */
  constructor(comparatorFunction) {
    /** @var linkedListNode */
    this.head = null;

    /** @var linkedListNode */
    this.tail = null;

    this.compare = new Comparator(comparatorFunction);
  }

  /**
   * @param {*} value
   * @return {linkedList}
   */
  prepend(value) {
    //make new node to be a head
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    //if there is no tail yet let's make new node a tail
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * @param {*} value
   * @return {linkedList}
   */
  append(value) {
    const newNode = new LinkedListNode(value);

    //If there is no head yet let´s make new node a head.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    //attach new node to the end of the linked list.
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  /**
   * @param {*} value
   * @return {linkedListNode}
   */
  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;
    /**If the head must be deleted then make next node that is different
     * from the head to be a new head.
     */
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // if next node must be deleted then make next node to be a next one;
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // check if tail must be deleted.
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {linkedListNode}
   */
  find({ value = undefined, callback = undefined }) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      // if callback is specified then try to find node by callback
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      //if value is specified the try to compare by value...
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * @return {linkedListNode}
   */
  deleteTail() {
    const deleteTail = this.tail;

    if (this.head === this.tail) {
      // there is only one node in linked list.
      this.head = null;
      this.tail = null;

      return deleteTail;
    }

    // if there are many nodes in linked list...

    // rewind to the last node and delete "next" link for the node before the last one.
    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;
    return deleteTail;
  }

  /**
   * @return {linkedListNode}
   */
  deleteHead() {
    if (!this.head) {
      return null;
    }
    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  /**
   * @param {*[]} values - Array of values that need to be converted to linked list.
   * @return {LinkedList}
   */
  fromArray(values) {
    values.forEach((value) => this.append(value));
    return this;
  }

  /**
   * @return {linkedListNode[]}
   */
  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * reverse a linked list.
   * @returns {linkedist}
   */
  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      //Store next node.
      nextNode = currNode.next;

      //change next node of the current node so it would link to previous node.
      currNode.next = prevNode;

      //move prevNode and currNode nodes one step forward.
      prevNode = currNode;
      currNode = nextNode;
    }

    //reset head and tail.
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
