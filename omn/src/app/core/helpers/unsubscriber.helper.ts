import { Subscription } from 'rxjs';

export const unsubscriberHelper = (subscription) => {
  if (subscription && subscription instanceof Subscription) {
    subscription.unsubscribe();
  }
};
