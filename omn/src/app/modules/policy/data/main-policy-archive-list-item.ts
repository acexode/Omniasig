import { dateHelperYear } from 'src/app/core/helpers/date.helper';
import { ArchiveListItem } from 'src/app/shared/models/component/archive-list-item';
import { PolicyItem } from 'src/app/shared/models/data/policy-item';

export const mainPolicyArchiveListItem = (
  policy: PolicyItem
): ArchiveListItem => {
  const item: ArchiveListItem = {
    id: policy.id,
    classes: 'archive-item',
    icon: {
      name: 'sm-right-triangle',
      color: 'omn-green',
      classes: 'icon-8 mr-8 my-0',
    },
    title: {
      color: 'omn-green',
      classes: 'text-small text-weight-medium text-nowrap overflow-ellipsis',
      text: policy.type.shortDescription,
    },
    content: {
      classes: 'text-normal text-nowrap  overflow-ellipsis',
      text: policy.type.name,
    },
    timeContent: {
      text:
        dateHelperYear(policy.dates.from) +
        '-' +
        dateHelperYear(policy.dates.to),
    },
  };
  return item;
};
