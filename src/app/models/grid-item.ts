import { GridChildItem } from './grid-child-item';

export interface GridItem {
  id: string;
  int: number;
  float: string;
  color: string;
  child: GridChildItem[];
}
