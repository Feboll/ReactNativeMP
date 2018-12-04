import React from "react";
import {Text, View, ScrollView, TouchableOpacity} from "react-native";
import Image from 'react-native-remote-svg'
import {colors, styles} from './styles';
import {products} from './data';

class Products extends React.Component {
    static state = {};

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Products</Text>
                <ScrollView style={styles.productList}>
                    {products.map(product => (
                        <View key={product.id} style={styles.product} onPress={() => navigate('Product', {product})}>
                            <Image style={{ width: 20, height: 20}} source={product.icon} />
                            <Text>{product.name}</Text>
                            <Image style={{ width: 20, height: 20}} source={require(`../assets/svg/right-arrow.svg`)} />
                        </View>
                    ))}
                </ScrollView>
            </View>

        );
    }
}

export default Products;
