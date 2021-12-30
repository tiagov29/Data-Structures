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

    this.compare = new Compa();
  }
}
