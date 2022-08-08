import * as React from 'react';
import {useRenderServerComponents} from '~/lib/utils';

type StackbitHCRDetail = {
  changedObjectIds: string[];
  changedContentTypes: string[];
  currentUrl: string;
  currentPageObjectId: string | null;
  visibleObjectIds: string[];
};

export const StackbitHCR = () => {
  const renderServerComponents = useRenderServerComponents();

  React.useEffect(() => {
    const handler = (e: any) => {
      const detail = e.detail as StackbitHCRDetail;

      const hasChanges = detail.visibleObjectIds.some((visibleObjectId) =>
        detail.changedObjectIds.includes(visibleObjectId),
      );

      if (hasChanges) {
        renderServerComponents();
      }

      e.preventDefault();
    };

    window.addEventListener('stackbitObjectsChanged', handler);

    return () => {
      window.removeEventListener('stackbitObjectsChanged', handler);
    };
  }, [renderServerComponents]);

  return null;
};
