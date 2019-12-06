# Smash Factor: the Golf Shot Distance Tracking App!

## Links to relevant repositories and deployed sites
* #### Link to API repository: <https://github.com/chardbres/smash-factor-api>
* #### Link to deployed client site: <https://chardbres.github.io/smash-factor-client/#/>
* #### Link to deployed API site: <https://warm-waters-93478.herokuapp.com/>

## Links to user stories and wireframes

## Description

Smash factor is an application built with React, for users to track their golf clubs by type, brand, loft, and stiffness, and the quality of their strokes with each. The back-end API is Express-based and hosted on Heroku.

## Technologies Used
* React (JavaScript): all front-end displays and actions
* Axios: all API calls
* SCSS: styling for React components
* Git/Github: version control
* Markdown: README and user stories


## Timeline
* (2019-12-02): created user stories, wireframes, and ERD. Successfully deployed basic template to github for testing purposes. Completed functionality to render the full index of clubs, and outline of component to render a single club.
* (2019-12-03): no commits. Worked on CRUD functionality for single clubs, which would be largely completed on 12/03.
* (2019-12-04): completed create/delete/read actions for a single club.
* (2019-12-05): completed all CRUD actions for golf clubs. Determined how to ensure that signed-in user could only view the clubs for which they have ownership. Created separate component/api files for adding shots to each club; appeared to be breaking overall app functionality, so commented out all relevant files.

## Unsolved Problems / Wish-List
* Complete all functionality to add shot-tracking functionality to all clubs: single entries of distance and shot quality, with timestamps, and data analysis such as average distance over time.
* Complete all alerts related to action success/failure for the user.
* Improve overall styling and functionality.
