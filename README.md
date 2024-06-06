<h1 align="center">Weather App</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://monkeysees.github.io/weather-app/">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/monkeysees/weather-app">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/mM1UIenRhK808W8qmLWv">
      Challenge
    </a>
  </h3>
</div>

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Overview

This app is built with `React`. It uses functional components (including state-management hooks such as `useContext` and `useReducer`) and leveerages Typescript with Sass. It also relies on the rich React ecosystem using `React Query` for data-fetching, `React Modal` for search modal, React Hot Toast for notifications and `React Transition Group` for basic CSS animations.

### Built With

- [React](https://reactjs.org/)
- [React Query](https://react-query-v3.tanstack.com/)
- [React Modal](https://reactcommunity.org/react-modal/)
- [React Hot Toast](https://react-hot-toast.com/)
- [React Transition Group](https://reactcommunity.org/react-transition-group/)
- [Typescript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [Create React App](https://create-react-app.dev/)

## Features

The app allows you to access weather information, both by searching for cities and by providing your current location. You can also choose to display temperature units in either Celcius or Fahrenheit. Additionally, the app persists in `localStorage` your last chosen location and temperature unit as well as search history so that your preferences are remembered across the site visits.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/monkeysees/weather-app.git

# Install dependencies
$ npm install

# Start the app in dev mode
$ npm start
```

## Acknowledgements

- [How to Favicon in 2022 by Andrey Sitnik](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)
- [Accessible Loading Indicators—with No Extra Elements!](https://dockyard.com/blog/2020/03/02/accessible-loading-indicatorswith-no-extra-elements)
- [CSS in Action: Invisible Content Just for Screen Reader Users](https://webaim.org/techniques/css/invisiblecontent/)

## Contact

- Email monkeyseesone@gmail.com
