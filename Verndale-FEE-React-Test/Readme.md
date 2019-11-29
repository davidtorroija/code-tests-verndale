# Technical evaluation for Verndale
I'm expert in vuejs that is another MVVM framework inspired in React and Angular, but no that expert in react but this test was interesting to learn more about react and to see that there several similarities with Vuejs. 

This test was very fun I think more fun than the HTML one.

### Configuration added
I added the "npm start" command, the auto launch server feature when you start and configured babel to support "async / await" syntax.
Added some packages "isomorphic-fetch es6-promise" to support "fetch" data from server in IE 11

### Next features to add
- Add a "Loader" because sometimes the request would take some time.
- Add a debounce to avoid several requests when pressing keys.

- Find a way in react to make this Autocomplete component more generic (and only focused in show a list of researched items, and maybe add a wrapper for this component that has a boolean prop "async" to tell us if the user wants to do a asyncronous operation) by emiting events to the parent or use parent methods to filter suggestions and to fetch data, this is easy in vuejs by emitting for example the input change event to the parent, the parent fetch the new data to the server and then pass the new filtered suggestions using a prop to the autocomplete to show those suggestions.

- ~~Emit event to the parent with the selected item.~~

### Instructions:

first install the npm packages running:
```npm install```
then:
```npm start```

and that's it!
if you have any questions please email me to davidtorroija@gmail.com