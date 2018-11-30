import React, {Component} from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Home from "./src/pages/Home";


const App = createStackNavigator({
    Home: {screen: Home},
});

export default createAppContainer(App);
