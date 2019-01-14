import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Home from "./src/pages/Home";
import Products from "./src/pages/Products";
import Product from "./src/pages/Product";
import {Animated, Easing} from 'react-native';

let SlideFromRight = (index, position, width) => {
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
            const {layout: {initWidth}, position, scene: {index}} = sceneProps;
            return SlideFromRight(index, position, initWidth);
        },
    }
};


const App = createStackNavigator({
    Home: {screen: Home},
    Products: {screen: Products},
    Product: {screen: Product},
}, {
    transitionConfig: TransitionConfiguration,
});

export default createAppContainer(App);
