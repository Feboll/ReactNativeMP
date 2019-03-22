import React from "react";
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ToastAndroid,
    ActivityIndicator,
    AsyncStorage, LayoutAnimation, Alert
} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import Image from 'react-native-remote-svg'
import {colors, styles} from './styles';
import axios from "axios";
import NotifService from '../helpers/NotifService';

class Products extends React.Component {
    static navigationOptions = {
        title: 'Products',
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            pageSize: 10,
            totalCount: -1,
            loading: false,
        };

        this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    }

    onRegister(token) {
        this.setState({ registerToken: token.token, gcmRegistered: true });
    }

    onNotif(notif) {
        console.log(notif);
        Alert.alert(notif.title, notif.message);
    }

    componentDidMount(): void {
        this.getItems();

        AsyncStorage.getItem('quoteId').then(quoteId => {
            if (quoteId === null) {
                AsyncStorage.getItem('user_token')
                    .then(user_token => {
                        console.log(user_token);
                        if (user_token !== null) {
                            const addToCard = 'http://ecsc00a02fb3.epam.com/rest/default/V1/carts/mine';

                            axios.post(addToCard, {}, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${user_token}`,
                                }
                            }).then((response) => {
                                const {data} = response;
                                AsyncStorage.setItem('quoteId', data);
                                this.notif.localNotif({
                                    message: `Cart created #${data}.`,
                                });
                            }).catch((error) => {
                                console.error(error);
                            });
                        }
                    }).catch((error) => console.error(error))
            } else {
                this.notif.localNotif({
                    message: `Cart created #${quoteId}.`,
                });
            }
        }

        );
    }

    getItems = () => {
        const {page, pageSize, data, totalCount, loading} = this.state;
        if (loading || data.length === totalCount) return null;
        this.setState({loading: true});
        const productsUrl = `http://ecsc00a02fb3.epam.com/rest/V1/products?searchCriteria[pageSize]=10`;

        axios.get(productsUrl, {
            params: {
                'searchCriteria[pageSize]': pageSize,
                'searchCriteria[currentPage]': page,
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            const {data: {items, total_count}, } = response;
            this.setState({
                loading: false,
                data: [...data, ...items],
                page: this.state.page + 1,
                totalCount: total_count
            });
        }).catch((error) => {
            ToastAndroid.show(`Try again!`, ToastAndroid.LONG);
        });
    };

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View><ActivityIndicator animating size={'large'} /></View>
        )
    };

    render() {
        const {navigate} = this.props.navigation;
        const {data} = this.state;
        return (

            <View style={styles.container}>
                <Text style={styles.title}>Products</Text>
                <FlatList
                    style={styles.productList}
                    onEndReached={this.getItems}
                    data={data}
                    keyExtractor={item => item.sku}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.product}
                            onPress={() => navigate('Product', {product: item})}
                        >
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productPrice}>{item.price}</Text>
                            <Image style={{width: 20, height: 20}} source={require(`../assets/svg/right-arrow.png`)} />
                        </TouchableOpacity>
                    )}
                    ListFooterComponent={() => this.renderFooter()}
                    onEndReachedThreshold={10}
                />
            </View>
        );
    }
}

export default Products;
