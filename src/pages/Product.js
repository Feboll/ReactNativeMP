import React from "react";
import {Text, View, ScrollView, TouchableOpacity} from "react-native";
import Image from 'react-native-remote-svg'
import {colors, styles} from "./styles";

class Product extends React.Component {
    static state = {};
    render() {
        const {navigate} = this.props.navigation;
        const {product} = this.props.navigation.state.params;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.productHead}>
                        <Image style={{ width: 60, height: 60}} source={product.icon} />
                        <Text style={styles.productTitle}>{product.name}</Text>
                    </View>

                    <Text style={styles.productAbout}>{product.about}</Text>

                    <TouchableOpacity onPress={() => navigate('Products')}>
                        <Text style={[styles.btn, colors.btn.active]}>All products</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

export default Product;
