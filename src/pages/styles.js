import {StyleSheet} from "react-native";

const colors = {
    btn: {
        active: {
            backgroundColor: '#004dcf',
            color: '#fff',
        },
        disabled: {
            backgroundColor: '#ccc',
            color: '#fff',
        },
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    containerProduct: {
        padding: 10,
    },
    title: {
        fontSize: 55,
        textAlign: 'center',
        color: '#555555',
        fontFamily: 'vincHand',
        marginBottom: 10,
    },
    error: {
        fontSize: 30,
        color: '#ff0a00',
        fontFamily: 'vincHand',
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#FBFBFB",
        borderColor: '#697689',
        color: '#555555',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        width: '100%',
        fontSize: 20,
        fontFamily: 'vincHand',
    },
    inputError: {
        borderColor: '#ff0a00',
    },
    btn: {
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 5,
        fontSize: 25,
        borderRadius: 5,
        fontFamily: 'vincHand',
    },
    productList: {
        width: '100%',
    },
    product: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        padding: 10,
        borderBottomColor: '#555555',
        borderBottomWidth: 1,
    },
    productHead: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 20,
    },
    productTitle: {
        fontSize: 30,
        color: '#555555',
        marginLeft: 20,
        fontFamily: 'vincHand',
    },
    productAttrBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productAttr: {
        fontSize: 25,
        color: '#555555',
        marginLeft: 20,
        fontFamily: 'vincHand',
        marginRight: 20,
    },
    productAbout: {
        fontSize: 20,
        color: '#555555',
        fontFamily: 'vincHand',
    },
    productName: {
        fontSize: 30,
        flex: 2,
        marginLeft: 10,
        marginRight: 10,
        color: '#555555',
        fontFamily: 'vincHand',
    },
    productPrice: {
        fontSize: 30,
        marginLeft: 10,
        marginRight: 10,
        color: '#555555',
        fontFamily: 'vincHand',
    }
});

const modalStyle = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
    },
    body: {
        borderColor: '#697689',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#ffffff',
        padding: 15,
    },
    message: {
        color: '#555555',
        fontFamily: 'vincHand',
        fontSize: 30,
    },
    actionList: {
        flexDirection: 'row',
        marginLeft: -15,
        marginRight: -15,
        marginBottom: -15,
        borderTopWidth: 1,
        borderColor: '#697689',
        marginTop: 15,
    },
    action: {
        height: 40,
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    actionLabel: {
        color: '#555555',
        fontFamily: 'vincHand',
    },
    viewPager: {
        flex: 1,
        height: '100%',
    },
    viewPage: {
        flex: 1
    },
});


export {
    colors,
    styles,
    modalStyle,
};
