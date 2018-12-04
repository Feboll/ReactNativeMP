import React from "react";
import {Button, Text, View, TextInput, ScrollView} from "react-native";

class Products extends React.Component {
    static state = {};
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Products</Text>
                <ScrollView>

                </ScrollView>
            </View>

        );
    }
}

export default Products;
