import React from "react";
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    AsyncStorage,
    Alert,
    ToastAndroid,
    LayoutAnimation
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Image from 'react-native-remote-svg'
import {colors, styles} from "./styles";

import NotifService from '../helpers/NotifService';
import axios from 'axios';
import Security from '../helpers/Security';

class Product extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {product} = navigation.state.params;

        return {
            title: product.name,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            user_token: null,
            routes: [
                {key: 'main', title: 'Name'},
                {key: 'map', title: 'Info'}
            ],
        };

        this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    }

    componentDidMount(): void {
        Security.getToken()
            .then(user_token => user_token !== null && this.setState({user_token}))
            .catch((error) => console.error(error));
    }

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
                <View key={attr.attribute_code} style={styles.productAttrBox}>
                    <Text style={styles.productAttr}>{attr.attribute_code}:</Text>
                    <Text style={styles.productAbout}>{attr.value}</Text>
                </View>

            ))}
        </ScrollView>
    )};

    onRegister(token) {
        this.setState({ registerToken: token.token, gcmRegistered: true });
    }

    onNotif(notif) {
        console.log(notif);
        Alert.alert(notif.title, notif.message);
    }


    toCart = () => {
        const {product: {name, sku}} = this.props.navigation.state.params;



        AsyncStorage.getItem('quoteId').then(quoteId => {
            if (quoteId !== null) {
                console.log(quoteId, this.state.user_token, sku);
                const addToCard = 'http://ecsc00a02fb3.epam.com/rest/default/V1/carts/mine/items';

                axios.post(addToCard, {
                    "cartItem": {
                        "sku": sku,
                        "qty": 1,
                        "quote_id": '' + quoteId,
                    }
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.user_token}`,
                    }
                }).then((response) => {
                    console.log(response)
                    this.notif.localNotif({
                        title: 'Cart updated',
                        message: `${name} added to cart.`,
                    });
                }).catch((error) => {
                    console.log(error)
                    console.error(error);
                });
            }

        })




    };

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
                    initialLayout={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
                />
                <View style={styles.containerProduct}>
                    <TouchableOpacity onPress={() => this.toCart()}>
                        <Text style={[styles.btn, colors.btn.active]}>To Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('Products')}>
                        <Text style={[styles.btn, colors.btn.active]}>All products</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

export default Product;
