import { PolicyItem } from 'src/app/shared/models/data/policy-item';
import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';
export interface PolicyLocuintaListItem {
  locuinta: Locuinte;
  policy?: PolicyItem;
}
