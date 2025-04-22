import {Dimensions, StyleSheet} from "react-native";

const itemWidth = (Dimensions.get('window').width / 2) - 15;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,
        backgroundColor: '#009688',
    },
    contentContainer: {
        padding: 10,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    centrer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemContainer: {
        width: itemWidth,
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderLeftWidth: 5,
    },
    itemNormal: {
        backgroundColor: '#fff',
        borderLeftColor: '#4caf50',
    },
    itemRendu: {
        backgroundColor: '#f0f0f0',
        borderLeftColor: '#9e9e9e',
    },
    itemEnRetard: {
        backgroundColor: '#ffebee',
        borderLeftColor: '#f44336',
    },
    itemAvertissement: {
        backgroundColor: '#fff8e1',
        borderLeftColor: '#ffc107',
    },
    titre: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    auteur: {
        color: '#666',
        marginBottom: 10,
        fontSize: 14,
    },
    dates: {
        marginTop: 5,
        fontSize: 12,
    },
    boutonRetour: {
        marginTop: 10,
        backgroundColor: '#6a1b9a',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-start'
    },
    texteBouton: {
        color: '#fff',
        fontWeight: 'bold'
    },
    texteVide: {
        marginTop: 10,
        color: '#999',
        fontSize: 16
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        width: '100%',
    },
});
