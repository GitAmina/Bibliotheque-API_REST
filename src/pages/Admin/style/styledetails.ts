import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    content: {
        flex: 1,
        padding: 15,
    },
    detailCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    detailLabel: {
        fontWeight: 'bold',
        width: 100,
        color: '#555',
    },
    detailValue: {
        flex: 1,
        color: '#333',
    },
    description: {
        color: '#333',
        lineHeight: 22,
        marginTop: 5,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    statusDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    available: {
        backgroundColor: '#4caf50',
    },
    unavailable: {
        backgroundColor: '#f44336',
    },
    statusText: {
        fontSize: 16,
        fontWeight: '500',
    },
    borrowButton: {
        backgroundColor: '#FF7F50',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    borrowButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    detailSection: {
        marginBottom: 15,
    },
});
