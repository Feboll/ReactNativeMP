import React from "react";
import {Text, View, ScrollView, TouchableOpacity, FlatList, ToastAndroid, ActivityIndicator} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import Image from 'react-native-remote-svg'
import {colors, styles} from './styles';
import {products} from './data';
import axios from "axios";


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
    }

    componentDidMount(): void {
        this.getItems();
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
                            <Image style={{width: 20, height: 20}} source={require(`../assets/svg/right-arrow.svg`)} />
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
