import { PageTitle } from './PageTitle'

interface Props {}

export const UserHistory = (props: Props) => {
  // will receive an array with info per year, create an state for each year, month and day with a forEach to change open and close icon accordingly.

  return (
    <div className="user-history">
      <PageTitle title={'History'} />
      {/* map for each year ?? default 'closed' (don't display entire list) */}
      <div className="user-history__year">
        <div className="user-history__year-title">
          <h3>2021</h3>
        </div>
        <div className="user-history__month-list">
          <div className="user-history__tasks">
            <div className="list-header">
              <h3>Month</h3>
              <h3>Score</h3>
            </div>
            {/* map for each month */}
            <div className="user-history__month">
              <div className="list-header">
                <span>Mar</span>
                <span>88</span>
              </div>
              {/* map for each day */}
              <div className="user-history__day">
                <div className="list-header">
                  <span>1st</span>
                  <span>90</span>
                </div>
                {/* map for each task */}
                <div className="user-history__tasks-list">
                  <span>Drink water</span>
                  <span>Walk dog</span>
                </div>
              </div>
            </div>
          </div>
          <div className="user-history__thoughts">
            {/* map for each month */}
            <div className="user-history__month">
              <span>Mar</span>
              {/* map for each day */}
              <div className="user-history__day">
                <span>1st</span>
                {/* map for each task */}
                <div className="user-history__thoughts-list">
                  <span>Hoje sonhei que tinha um cachorro bom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
