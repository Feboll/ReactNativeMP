import React from "react";
import {Text, View, ScrollView, TouchableOpacity, ViewPagerAndroid} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Image from 'react-native-remote-svg'
import {colors, styles} from "./styles";

class Product extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const {product} = navigation.state.params;

        return {
            title: product.name,
        }
    };

    static state = {};
    render() {
        const {navigate} = this.props.navigation;
        const {product} = this.props.navigation.state.params;
        return (
            <View>
                <ViewPagerAndroid
                    style={styles.viewPager}
                    initialPage={0}
                >
                    <ScrollView key="1">
                        <View style={styles.container}>
                            <View style={styles.productHead}>
                                <Image style={{ width: 60, height: 60}} source={product.icon} />
                                <Text style={styles.productTitle}>{product.name}</Text>
                            </View>

                            <Text style={styles.productAbout}>{product.about}</Text>
                        </View>
                    </ScrollView>
                    <MapView
                        key={2}
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                    </MapView>
                </ViewPagerAndroid>

                <TouchableOpacity onPress={() => navigate('Products')}>
                    <Text style={[styles.btn, colors.btn.active]}>All products</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Product;
