import React from "react";
import {Button, Text, View} from "react-native";

class Home extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    static state = {};
    render() {
        const {navigate} = this.props.navigation;
        return (
            <Button
                title="Go to Jane's profile"
                onPress={() => navigate('Profile', {name: 'Jane'})}
            />
        );
    }
}

export default Home;
