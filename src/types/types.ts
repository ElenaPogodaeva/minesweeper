export interface ICell {
  x: number;
  y: number;
  isMine: boolean;
  neighbour: number;
  isOpen: boolean;
  isEmpty: boolean;
  flagIndex: number;
}
