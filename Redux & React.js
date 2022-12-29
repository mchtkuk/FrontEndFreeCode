// Getting Started with React Redux
// This series of challenges introduces how to use Redux with React. First, here's a review of some of the key principles of each technology. React is a view library that you provide with data, then it renders the view in an efficient, predictable way. Redux is a state management framework that you can use to simplify the management of your application's state. Typically, in a React Redux app, you create a single Redux store that manages the state of your entire app. Your React components subscribe to only the pieces of data in the store that are relevant to their role. Then, you dispatch actions directly from React components, which then trigger store updates.

// Although React components can manage their own state locally, when you have a complex app, it's generally better to keep the app state in a single location with Redux. There are exceptions when individual components may have local state specific only to them. Finally, because Redux is not designed to work with React out of the box, you need to use the react-redux package. It provides a way for you to pass Redux state and dispatch to your React components as props.

// Over the next few challenges, first, you'll create a simple React component which allows you to input new text messages. These are added to an array that's displayed in the view. This should be a nice review of what you learned in the React lessons. Next, you'll create a Redux store and actions that manage the state of the messages array. Finally, you'll use react-redux to connect the Redux store with your component, thereby extracting the local state into the Redux store.

// Start with a DisplayMessages component. Add a constructor to this component and initialize it with a state that has two properties: input, that's set to an empty string, and messages, that's set to an empty array.

class DisplayMessages extends React.Component {
  // Change code below this line
  constructor(props) {
    super(props);
    this.state= {
      input: "",
      messages:[]
    }
  }
  // Change code above this line
  render() {
    return <div />
  }
};

//

// Manage State Locally First
// Here you'll finish creating the DisplayMessages component.

// First, in the render() method, have the component render an input element, button element, and ul element. When the input element changes, it should trigger a handleChange() method. Also, the input element should render the value of input that's in the component's state. The button element should trigger a submitMessage() method when it's clicked.

// Second, write these two methods. The handleChange() method should update the input with what the user is typing. The submitMessage() method should concatenate the current message (stored in input) to the messages array in local state, and clear the value of the input.

// Finally, use the ul to map over the array of messages and render it to the screen as a list of li elements.

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
  }
  // Add handleChange() and submitMessage() methods here
  submitMessage(){
    this.setState ({
      input: '',
      messages: [...this.state.messages, this.state.input]
    })
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
      messages: this.state.messages
    }) 
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        { /* Render an input, button, and ul below this line */ }
        <input value={this.state.input} onChange={this.handleChange.bind(this)}></input>
        <button onClick={this.submitMessage.bind(this)}></button>
        <ul>
          {this.state.input.map((x,i) => {
              return <li key={i}>{x}</li>
          })}
        </ul>
        { /* Change code above this line */ }
      </div>
    );
  }
};


//

// Extract State Logic to Redux
// Now that you finished the React component, you need to move the logic it's performing locally in its state into Redux. This is the first step to connect the simple React app to Redux. The only functionality your app has is to add new messages from the user to an unordered list. The example is simple in order to demonstrate how React and Redux work together.

// First, define an action type ADD and set it to a const ADD. Next, define an action creator addMessage() which creates the action to add a message. You'll need to pass a message to this action creator and include the message in the returned action.

// Then create a reducer called messageReducer() that handles the state for the messages. The initial state should equal an empty array. This reducer should add a message to the array of messages held in state, or return the current state. Finally, create your Redux store and pass it the reducer.


// Define ADD, addMessage(), messageReducer(), and store here:

const ADDD = 'ADD'

const addMessageD = message => {
  return {
    type: 'ADD',
    message
  }
}

const messageReducerD = (previousState = [], action) => {
  switch(action.type) {
    case 'ADD': 
    return [...previousState, action.message]
    break;

    default:
      return previousState
  }
}

const storeD = Redux.createStore(messageReducer)

//

// Use Provider to Connect Redux to React
// In the last challenge, you created a Redux store to handle the messages array and created an action for adding new messages. The next step is to provide React access to the Redux store and the actions it needs to dispatch updates. React Redux provides its react-redux package to help accomplish these tasks.

// React Redux provides a small API with two key features: Provider and connect. Another challenge covers connect. The Provider is a wrapper component from React Redux that wraps your React app. This wrapper then allows you to access the Redux store and dispatch functions throughout your component tree. Provider takes two props, the Redux store and the child components of your app. Defining the Provider for an App component might look like this:

// <Provider store={store}>
//   <App/>
// </Provider>
// The code editor now shows all your Redux and React code from the past several challenges. It includes the Redux store, actions, and the DisplayMessages component. The only new piece is the AppWrapper component at the bottom. Use this top level component to render the Provider from ReactRedux, and pass the Redux store as a prop. Then render the DisplayMessages component as a child. Once you are finished, you should see your React component rendered to the page.

// Note: React Redux is available as a global variable here, so you can access the Provider with dot notation. The code in the editor takes advantage of this and sets it to a constant Provider for you to use in the AppWrapper render method.

// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};



const store = Redux.createStore(messageReducer);

// React:

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {  
    this.setState((state) => {
      const currentMessage = state.input;
      return {
        input: '',
        messages: state.messages.concat(currentMessage)
      };
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  // Render the Provider below this line
  render() {
    return (<Provider store={store}>
  <DisplayMessages/>
</Provider>)
  }
  // Change code above this line
};

//

// Map State to Props
// The Provider component allows you to provide state and dispatch to your React components, but you must specify exactly what state and actions you want. This way, you make sure that each component only has access to the state it needs. You accomplish this by creating two functions: mapStateToProps() and mapDispatchToProps().

// In these functions, you declare what pieces of state you want to have access to and which action creators you need to be able to dispatch. Once these functions are in place, you'll see how to use the React Redux connect method to connect them to your components in another challenge.

// Note: Behind the scenes, React Redux uses the store.subscribe() method to implement mapStateToProps().

// Create a function mapStateToProps(). This function should take state as an argument, then return an object which maps that state to specific property names. These properties will become accessible to your component via props. Since this example keeps the entire state of the app in a single array, you can pass that entire state to your component. Create a property messages in the object that's being returned, and set it to state.

const state = [];

// Change code below this line

const mapStateToProps = (state) => {
  return {
    messages: state
  }
}

//

// Map Dispatch to Props
// The mapDispatchToProps() function is used to provide specific action creators to your React components so they can dispatch actions against the Redux store. It's similar in structure to the mapStateToProps() function you wrote in the last challenge. It returns an object that maps dispatch actions to property names, which become component props. However, instead of returning a piece of state, each property returns a function that calls dispatch with an action creator and any relevant action data. You have access to this dispatch because it's passed in to mapDispatchToProps() as a parameter when you define the function, just like you passed state to mapStateToProps(). Behind the scenes, React Redux is using Redux's store.dispatch() to conduct these dispatches with mapDispatchToProps(). This is similar to how it uses store.subscribe() for components that are mapped to state.

// For example, you have a loginUser() action creator that takes a username as an action payload. The object returned from mapDispatchToProps() for this action creator would look something like:

// {
//   submitLoginUser: function(username) {
//     dispatch(loginUser(username));
//   }
// }
// The code editor provides an action creator called addMessage(). Write the function mapDispatchToProps() that takes dispatch as an argument, then returns an object. The object should have a property submitNewMessage set to the dispatch function, which takes a parameter for the new message to add when it dispatches addMessage().

const addMessagee = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

// Change code below this line

const mapDispatchToProps = (message) => {
  return {
    submitNewMessage: function(message) {
      dispatch(addMessage(message))
    }
  }
}

//

// Connect Redux to React
// Now that you've written both the mapStateToProps() and the mapDispatchToProps() functions, you can use them to map state and dispatch to the props of one of your React components. The connect method from React Redux can handle this task. This method takes two optional arguments, mapStateToProps() and mapDispatchToProps(). They are optional because you may have a component that only needs access to state but doesn't need to dispatch any actions, or vice versa.

// To use this method, pass in the functions as arguments, and immediately call the result with your component. This syntax is a little unusual and looks like:

// connect(mapStateToProps, mapDispatchToProps)(MyComponent)
// Note: If you want to omit one of the arguments to the connect method, you pass null in its place.

// The code editor has the mapStateToProps() and mapDispatchToProps() functions and a new React component called Presentational. Connect this component to Redux with the connect method from the ReactRedux global object, and call it immediately on the Presentational component. Assign the result to a new const called ConnectedComponent that represents the connected component. That's it, now you're connected to Redux! Try changing either of connect's arguments to null and observe the test results.

const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

const mapStateToProps = (state) => {
  return {
    messages: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message));
    }
  }
};

class Presentational extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h3>This is a Presentational Component</h3>
  }
};

const connect = ReactRedux.connect;
// Change code below this line

const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(Presentational)

//

// Connect Redux to the Messages App
// Now that you understand how to use connect to connect React to Redux, you can apply what you've learned to your React component that handles messages.

// In the last lesson, the component you connected to Redux was named Presentational, and this wasn't arbitrary. This term generally refers to React components that are not directly connected to Redux. They are simply responsible for the presentation of UI and do this as a function of the props they receive. By contrast, container components are connected to Redux. These are typically responsible for dispatching actions to the store and often pass store state to child components as props.

// The code editor has all the code you've written in this section so far. The only change is that the React component is renamed to Presentational. Create a new component held in a constant called Container that uses connect to connect the Presentational component to Redux. Then, in the AppWrapper, render the React Redux Provider component. Pass Provider the Redux store as a prop and render Container as a child. Once everything is set up, you will see the messages app rendered to the page again.

// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

const messageReducery = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    defaul
  }t:
      return state;
};

const store = Redux.createStore(messageReducer);

// React:
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    this.props.submitNewMessage(this.state.input);
    this.setState({
      input: ''
    })
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.props.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

// React-Redux:
const mapStateToProps = (state) => {
  return { messages: state }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (newMessage) => {
       dispatch(addMessage(newMessage))
    }
  }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// Define the Container component here:
const Container = connect(mapDispatchToProps, mapStateToProps)(Presentational)

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Complete the return statement:
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
};

// END OF REDUX AND REACT