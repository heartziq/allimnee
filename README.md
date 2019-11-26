# Pivot! - MVP (by EOY 2019) :

- [x] MVP features;
  - [ ] Browse classes (+ filter)
    - [x] solve image icon load issue (React.useEffect()) answer: callback inside useEffect must not be an async func
    - [ ] retrieve data from db
      - [ ] think of data structure format for `db.test.classes`
      - [ ] pre-load dummy data adhering to the format above
      - [ ] replace dummy data with props
    - [ ] wire up with redux store
      - [ ] create classReducer
      - [ ] create selector for class; sort .filt
  - [ ] Contact Tutor (email)
  - [ ] Tutor details
  - [ ] Class Details
  - [ ] [UI] Responsive; desktop and mobile
- [ ] wireframe**
- [ ] deploy to heroku
- [x] Config and Organise
  - [x] simply file dev scripts `yarn start & dev`
  - [x] upgrade deprecated and outdated packages
    - [x] yarn, node etc
    - [x] babel and webpack
    - [x] @babel/polyfill
  - [x] separate server from frontend
  - [x] leave as little files and possible at the root folder

