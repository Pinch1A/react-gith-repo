This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements :

● Display repository’s Id, name, watchers_count

● Sort the results by the number of stars

● Have a search input that will show results (from all possible repositories) to those that have
its name matches the search field.

### Approach:

- First step when I receive a ticket that requires a `third-party` API knowledge is go after the documentation to understand the best solution

  - By researching the github api I find out that there are 2 active version at the moment v3 and v4, the biggest difference between them is that v4 is the graphql version and v3 is the rest version of the same API.
  - v3 has some limitation on what we can ask to the endpoint of course and in order to be able to return `number_of_start` of each repo the complexity of the requests would have been way to expensive.
  - v4 with the graphQL approach allows us to structure the request better and perform
    - the amount of requests per _endpoint interrogation_
    - the size of the data returned can reflect exactly what we want to show, _only_

- Github API v4 requires a user_token and requires a validation every time we want to access the graphQL endpoint.
- So I come up with a 2 page solution where we can:
  - PAGE 1: Validate the _token_ (either pasting it in the browser or saving it in the _env var_)
  - PAGE 2: Show the Repository List (_ordered by number of stars_)
    - Because of the porpoise of the tech challenge, I decided to prove the concept returning _only_ 5 repositories per request
    - There is a pagination functionality that allow the user to _Load More_ Contents

### Improvements

- Considering this ticket as an integration ticket, I would expect more refinement coming in the backlog in the next sprint or 2

  - UI/UX now can have a key role to make the functionality more user friendly, such as:
    - Accessibility
    - Responsive
    - User Flow - (ie. load specific results on Load ... )
  - Possible extensions on what we want to show in the list and how the user can interact with the result (ie. Star, follow, copy URL )

- Tech considerations:
  - add flow types
  - storybook
  - add cypress tests

---

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
