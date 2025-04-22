import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    label: {
        fontWeight: '600',
        marginBottom: 5,
        color: '#333'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#f9f9f9'
    },
    note: {
        fontStyle: 'italic',
        color: '#666',
        marginBottom: 30,
        fontSize: 14
    },
    button: {
        backgroundColor: '#FF7F50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    disabledButton: {
        opacity: 0.6
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
});
