import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff'
    },
    label: {
        fontWeight: '600',
        marginBottom: 5,
        color: '#333',
        fontSize: 16
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        fontSize: 16
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    button: {
        backgroundColor: '#FF7F50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
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
