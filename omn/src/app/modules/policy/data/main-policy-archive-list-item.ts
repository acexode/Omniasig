import { ArchiveListItem } from 'src/app/shared/models/component/archive-list-item';
import { PolicyItem } from 'src/app/shared/models/data/policy-item';

export const mainPolicyArchiveListItem = (
  policy: PolicyItem
): ArchiveListItem => {
  const item: ArchiveListItem = {
    id: policy.id,
    title: {
      text: policy.type.name,
    },
  };
  return item;
};
