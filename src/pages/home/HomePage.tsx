import { useState } from 'react';
import cn from 'classnames';
import { GlobalJobsList } from '../../widgets/global-jobs-list';
import { FiltersItems } from '~widgets/filters-list';

type TabsState = {
  globalfeed?: boolean;
  tagfeed?: string;
};

export function HomePage() {

  const initTabsState: TabsState = {
    ...({ globalfeed: true }),
  };

  const [tabs, setTabs] = useState<TabsState>(initTabsState);

  const onGlobalfeedClick = () => setTabs({ globalfeed: true });
  const onTabfeedClick = (tag: string) => setTabs({ tagfeed: tag.replace('_', ' ') });

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">Main app</h1>
          <p>Main app subtitle</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <button
                    className={cn('nav-link', { active: tabs.globalfeed })}
                    type="button"
                    onClick={onGlobalfeedClick}
                  >
                    Global Feed
                  </button>
                </li>
                {tabs.tagfeed && (
                  <li className="nav-item">
                    <button
                      className={cn('nav-link', { active: tabs.tagfeed })}
                      type="button"
                    >
                      #{tabs.tagfeed}
                    </button>
                  </li>
                )}
              </ul>
            </div>


            {tabs.globalfeed && (
              <GlobalJobsList query={{ limit: 10, offset: 0 }} />
            )}
            {tabs.tagfeed && (
              <GlobalJobsList
                query={{ limit: 10, offset: 0, tag: tabs.tagfeed }}
              />
            )}
          </div>
          <div className="col-md-3">
            <FiltersItems onFilterClick={onTabfeedClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
