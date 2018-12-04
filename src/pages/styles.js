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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 55,
        textAlign: 'center',
        color: '#555555',
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
    btn: {
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
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
        alignItems: 'center',
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
    productAbout: {
        fontSize: 20,
        color: '#555555',
        fontFamily: 'vincHand',
    },
    productName: {
        fontSize: 30,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        color: '#555555',
        fontFamily: 'vincHand',
    }
});


export {
    colors,
    styles,
};
