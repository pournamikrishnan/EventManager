# LET'S (LET US)

	•	Short description of your project
   
Our intention is to create an app that will help the user to plan a day of events on a certain date. 
Depending on who the user is, who is participating in the events, how much time the user is willing to spend for the current on-going events and if it is for a bigger group of people eg. family, romantic date, friends. The user will be able to choose from current events from Ticketmaster and all sorts of events and attractions.

	•	What you have done

What we have done so far is a basic skeleton with a basic layout for the app. As of now, it is possible to get out events at a certain date. Since we haven't specified the location, the events to choose from are events going on in the US, UK, Sweden and Norway. No particular reason is behind this decision, it is basically just to try out that we get out data from Ticketmaster depending on the location since we as well didn't want to fetch all the worldwide events from Ticketmaster database as this is a lot to handle.

We've also tried to implement the function of adding and removing an event. For now, the added and removed event is not an event from the api, only a static example, so when clicking on one of the suggested events example in one timeslot, it adds to an array. The possibility to remove is too implemented, but is not at the moment functioning completely as it is removing several events when only clicking on one (the X). 
   
	•	What you still plan to do

What is still left to do is the following:
- Divide the resulting events into time-slots so the user can plan according to the time of the event
- Improve the remove function
- Filter the events according to people that are gonna be participating in the events
- present costs to each event and the resulting costs depending on the number of people

Extensions if time let's us:
- add a drag-and-drop function when choosing events to your day
- the possibility to add a self-created event to your day

•	Your project file structure (short description/purpose of each file)

* `public/index.html` - this is the static html file containing html that's share among all the views.
* `src/data/EventModel.js` - 
* `src/index.js` - file to start React
* `src/index.css` - global styling sheet
* `src/App.js` - root component
* `src/Events`, `src/SelectEvent` etc. - the `.js` and `.css` file for each component. 

      - Welcome: Index view with grouping of people, choose who to plan for
      - WhereWhen: search event depending on the location and date
      - SelectEvent: select event from timeslots into your own day
      - Events: list all the resulting events
      - Overview: review your selections
      - PrintOut: confirmed day of events

## How to get started

Since modern frameworks use some advanced features like compiling the templates and source code in pure
JavaScript and dynamically loading the needed content, you cannot anymore just open the HTML file 
in the browser. Instead, you will need a local webserver that will serve your app. Follow the instructions 
bellow to install all the needed dependencies (e.g. the framework libraries) and the development webserver.

1. First, make sure that you have npm installed on your system (follow the instructions
   at [Installing Node](https://docs.npmjs.com/getting-started/installing-node). The computers in the lab rooms
   should already have it, you will just need to do `module add node` to activate it (every time
   you start the terminal).

2. Run `npm install` through the terminal in the root of the repository. Let it
   install all the dependencies. 

3. Run `npm install 'react-calendar'` for an extension of the react-library used in our app.

4. Run `npm start` through the terminal. This will start the webserver and the application should pop up in your
   browser ready for use. Alternatively you can open in through [http://localhost:3000]. Whenever you make changes in your code and save, the browser will update automatically, so you don't have to click refresh anymore.


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
