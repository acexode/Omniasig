import { dateHelperYear } from 'src/app/core/helpers/date.helper';
import { ArchiveListItem } from 'src/app/shared/models/component/archive-list-item';
import { PolicyItem } from 'src/app/shared/models/data/policy-item';

export const mainPolicyArchiveListItem = (
  policy: PolicyItem
): ArchiveListItem => {
  const item: ArchiveListItem = {
    id: policy.id,
    classes: 'archive-item mw-0 border-medium-green-3',
    contentGridClasses: 'pt-11 pb-8 mw-0',
    icon: {
      name: 'sm-right-triangle',
      color: 'omn-green',
      classes: 'icon-8 mr-8 mb-0 mt-14',
    },
    title: {
      color: 'omn-green',
      classes:
        'text-small text-weight-medium text-nowrap overflow-ellipsis' +
        ' mb-3 mr-8 flex flex-grow-0 flex-shrink-1',
      text: policy.type.shortDescription,
    },
    content: {
      classes: 'text-normal text-nowrap  overflow-ellipsis pr-8',
      text: policy.type.name,
    },
    timeContent: {
      color: 'omn-medium',
      classes: 'text-small ion-justify-content-end ion-text-end pr-16',
      text:
        dateHelperYear(policy.dates.from) +
        '-' +
        dateHelperYear(policy.dates.to),
    },
  };
  return item;
};
