import { ElementType, Suspense } from 'react';
import { FullPageWrapper } from '../full-page-wrapper';

export function Loadable(Component: ElementType) {
  return function fn(props: any) {
    return (
      <Suspense
        fallback={
          <FullPageWrapper>
            spiner
          </FullPageWrapper>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };
}
