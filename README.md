# Pivot! - MVP (by EOY 2019) :

- [ ] Browse ClassList
  - [ ] UI/UX
    - [ ] For < MD; replace pagination with InfiniteScrolling
      - [x] Study code example
      - [ ] Implement!
  - [ ] URI - Query params persistent (stays when refreshed)
    - [ ] How to make query params 'synchronize' with current filters? (Redux + URI)
    - [ ] [Challenge] How to make frontend pagination works with DB pagination
      - [ ] [Challenge] if via server query, records that do not fall within filter parameter will be discarded - unless by removing FE filter, will cause the browser to request new query with updated param
      - [ ] read up on redux-persist
      - [ ] [step 1] store current pageNumber on redux-persist
      - [ ] [step 2] use stored state to load current page // useState(savedPageNumber)
      - [ ] [step 3] only load DB every 50 records
    - [ ] Class Details
  - [ ] [BUTTON] Contact Tutor (email)
- [ ] Tutor details
- [ ] Deploy to github

