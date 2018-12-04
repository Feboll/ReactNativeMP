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
    }
});


export {
    colors,
    styles,
};
