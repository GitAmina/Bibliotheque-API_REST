import {Dimensions, StyleSheet} from "react-native";

const itemWidth = (Dimensions.get('window').width / 2) - 10;
const itemHeight = 230;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    searchContainer: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        backgroundColor: '#fff',
    },
    searchButton: {
        backgroundColor: '#009688',
        padding: 15,
        borderRadius: 5,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
    filterButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        alignItems: 'center',
    },
    activeFilter: {
        backgroundColor: '#009688',
    },
    filterText: {
        color: '#333',
        fontSize: 12,
    },
    activeFilterText: {
        color: '#fff',
    },
    contentContainer: {
        padding: 0,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    itemContainer: {
        width: itemWidth,
        height: itemHeight,
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        borderLeftWidth: 5,
        borderLeftColor: '#4caf50',
        marginBottom: 10,
        height: '100%', // Prend toute la hauteur du container
        justifyContent: 'space-between', // Répartit l'espace verticalement
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    author: {
        color: '#666',
        marginBottom: 5,
        fontSize: 14,
    },
    info: {
        color: '#666',
        marginBottom: 3,
        fontSize: 12,
    },
    available: {
        color: '#4caf50',
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 5,
    },
    unavailable: {
        color: '#f44336',
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 5,
    },
    borrowButton: {
        backgroundColor: '#009688',
        padding: 8,
        borderRadius: 5,
        alignSelf: 'flex-start'
    },
    borrowButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        width: '100%',
    },
    emptyText: {
        marginTop: 10,
        color: '#999',
        fontSize: 16
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
