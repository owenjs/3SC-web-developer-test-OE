# Poke UI - 3SC Web Developer Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Created by Owen Evans - May 2021

## Getting Started guide

```
# Clone the repo
git clone https://github.com/owenjs/3SC-web-developer-test-OE.git
cd 3SC-web-developer-test-OE

# Install dependencies
npm i

# Start Development Mode
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Frameworks Used

- **Create React App** - Fastest way to start a React Project
- **React Router** - So I can use Routing
- **Bootstrap** - My preferred CSS Framework with simple SCSS theming available
- **lodash.get**

## Challenges

- Adding two pokemon names to the URL so that the comparing action can take place
  - Let PokeUIApp.js pass down Global Props to the Action Components so they know what the current ViewPokemon and ComparePokemon is. So the Action can build the URL correctly.
- Console Error:'index.js:1 Warning: Invalid DOM property `class`. Did you mean `className`?'
  - This is caused by the Import of 'bootstrap' - not sure how to remove it

## If I had more time what would I implement

- Not allow the user to compare the same Pokemon side by side
- Have the Favorite List independent to the pagination, at the moment it is not the correct User Experience
- Allow User to see more Pokemon Statistics in Detail View
- Allow User to drill down into each Statistics shown to learn more about it
- Added React Tests
