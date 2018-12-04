import React, {Component} from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Home from "./src/pages/Home";
import Products from "./src/pages/Products";
import Product from "./src/pages/Product";


const App = createStackNavigator({
    Home: {screen: Home},
    Products: {screen: Products},
    Product: {screen: Product},
});

export default createAppContainer(App);
