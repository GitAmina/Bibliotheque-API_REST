import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContainer: {
        backgroundColor: 'white',
        margin: 20,
        padding: 25,
        borderRadius: 12,
        elevation: 5
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#2c3e50',
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9'
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
        paddingTop: 12
    },
    label: {
        fontWeight: '600',
        marginBottom: 6,
        color: '#333',
        fontSize: 15
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    button: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancelButton: {
        backgroundColor: '#e74c3c',
        flex: 1,
        marginRight: 10
    },
    submitButton: {
        backgroundColor: '#2ecc71',
        flex: 1,
        marginLeft: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    disabledButton: {
        opacity: 0.6
    },
    requiredIndicator: {
        color: 'red',
        marginLeft: 4
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 14,
        marginTop: -10,
        marginBottom: 15
    }
});
