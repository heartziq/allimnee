# Allimnee:

- [ ] /BrowseTutor
  - [x] construct a good redux architectural design
  - [x] search tutor
  - [ ] filter tutor
    - [x] filter search inconsistency
    - [ ] wire up the other filter parameters: {area, subject, level, gender etc}
  - [ ] finalize BrowseTutor UI (ver: MVP)
    - [ ] Show up all the other important data: {area, subject, level, gender etc}
    - [ ] decorate above design
- [x] clean up - organise folder structure
- [ ] /BrowseJob (may replicate above design)
- [ ] /login - Proper UI (Simple)
- [ ] /register -  Proper UI (Simple)

## Bugs:

- [x] assert does not work [solved: use assert.strictEqual]
  - [x] Uncaught TypeError: Cannot read property 'value' of null (finding out...) [solved: lexical scope issue - cannot access e.target.value]
  - [x] regeneratorRuntime is not defined: challenge arise when attempting to implement async/await (finding out why...)
  - [x] Main page > add button not working [solved: action name must be unique (even from different reducer)]
- [x] Handles "Route-FE" or (Pure FE route) such that it will behave the same as "Route-Server-then-FE" (fetch data from frontend)