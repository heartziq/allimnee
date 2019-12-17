# Pivot! - MVP (by EOY 2019) :

- [ ] Browse ClassList
  - [ ] UI/UX
    - [ ] For < MD; replace pagination with InfiniteScrolling
      - [ ] Revamp display class (grid responsive)
    - [x] For > SM; increase the height of the filter
    - [x] [Display Classes] align each items correctly
  - [ ] URI - Query params persistent (stays when refreshed)
    - [ ] How to make query params 'synchronize' with current filters? (Redux + URI)
    - [ ] [Challenge] How to make frontend pagination works with DB pagination
      - [x] Understand & brainstorm on how to do it
      - [x] does pageNumber & number of records for [FE: after filter] === pageNumber & number of records for [DB filter]
      - [ ] [Challenge] if via server query, records that do not fall within filter parameter will be discarded - unless by removing FE filter, will cause the browser to request new query with updated param
      - [ ] read up on redux-persist
      - [ ] [step 1] store current pageNumber on redux-persist
      - [ ] [step 2] use stored state to load current page // useState(savedPageNumber)
      - [ ] [step 3] only load DB every 50 records
- [ ] Class Details
  - [ ] [BUTTON] Contact Tutor (email)
- [ ] Tutor details
- [ ] Deploy to github

