import React from "react";
import {Text, View, ScrollView} from "react-native";
import {colors, styles} from './styles';
import products from './data';

class Products extends React.Component {
    static state = {};
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Products</Text>
                <ScrollView>

                </ScrollView>
            </View>

        );
    }
}

export default Products;
