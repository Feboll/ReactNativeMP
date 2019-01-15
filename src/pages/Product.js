import React from "react";
import {Text, View, ScrollView, TouchableOpacity, Dimensions} from "react-native";
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import Image from 'react-native-remote-svg'
import {colors, styles} from "./styles";


class Product extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {product} = navigation.state.params;

        return {
            title: product.name,
        }
    };

    MainRoute = () => {
        const {product} = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <Image style={{width: 60, height: 60}} source={product.icon} />
                <Text style={styles.productTitle}>{product.name}</Text>
            </View>
        )
    };

    MapRoute = () => {
        const {product} = this.props.navigation.state.params;
        return (
        <ScrollView>
            {product.custom_attributes.map(attr => (
                <View style={styles.productAttrBox}>
                    <Text style={styles.productAttr}>{attr.attribute_code}:</Text>
                    <Text style={styles.productAbout}>{attr.value}</Text>
                </View>

            ))}
        </ScrollView>
    )};

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                {key: 'main', title: 'Name'},
                {key: 'map', title: 'Map'}
            ],
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        const {product} = this.props.navigation.state.params;
        return (
            <View style={{flex: 1}}>
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        main: this.MainRoute,
                        map: this.MapRoute,
                    })}
                    onIndexChange={index => this.setState({index})}
                    initialLayout={{width: Dimensions.get('window').width}}
                />
                <View style={styles.containerProduct}>
                    <TouchableOpacity onPress={() => navigate('Products')}>
                        <Text style={[styles.btn, colors.btn.active]}>All products</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

export default Product;
