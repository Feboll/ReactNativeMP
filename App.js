import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Animated, Easing} from 'react-native';
import Home from "./src/pages/Home";
import Products from "./src/pages/Products";
import Product from "./src/pages/Product";
import Info from './src/pages/Info';

import { Sentry } from 'react-native-sentry';

Sentry.config('https://5339c83ffe23433f8b0c09cfcb27ae86@sentry.io/1402903').install();


const SlideFromRight = (index, position, width) => {
    const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0]
    });
    return {transform: [{translateX}]};
};

const TransitionConfiguration = () => {
    return {
        transitionSpec: {
            duration: 750,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: (sceneProps) => {
            const {layout: {initWidth}, position, scene: {index, route}} = sceneProps;
            const params = route.params || {};
            return SlideFromRight(index, position, initWidth);
        },
    }
};

const App = createStackNavigator({
    Home: {screen: Home},
    Products: {screen: Products},
    Product: {screen: Product},
    Info: {screen: Info},
}, {
    transitionConfig: TransitionConfiguration,
});

export default createAppContainer(App);
