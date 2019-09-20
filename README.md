# Allimnee:

- [ ] /BrowseTutor
  - [ ] construct a good redux architectural design
  - [ ] search tutor
  - [ ] filter tutor
  - [ ] finalize BrowseTutor UI (ver: MVP)
- [ ] /BrowseJob
- [ ] /login
- [ ] /register

## Bugs:

- [x] assert does not work [solved: use assert.strictEqual]
  - [x] Uncaught TypeError: Cannot read property 'value' of null (finding out...) [solved: lexical scope issue - cannot access e.target.value]
  - [x] regeneratorRuntime is not defined: challenge arise when attempting to implement async/await (finding out why...)
  - [x] Main page > add button not working [solved: action name must be unique (even from different reducer)]
- [ ] Handles "Route-FE" or (Pure FE route) such that it will behave the same as "Route-Server-then-FE" (fetch data from frontend)