import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonins: {
        backgroundColor: '#009688',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    linkContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    linkText: {
        color: '#3498db',
        fontSize: 14,
    },
    errorText: {
        color: '#e74c3c',
        marginBottom: 10,
        fontSize: 12,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});
