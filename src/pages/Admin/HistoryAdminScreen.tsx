import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { retournerLivre, getTousEmprunts } from '../../services/emprunt';
import { styles } from "./style/stylehistorique";
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const HistoryScreenAdmin = () => {
    const [emprunts, setEmprunts] = useState<Emprunt[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    const chargerEmprunts = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getTousEmprunts();
            setEmprunts(data);
        } catch (error) {
            Alert.alert('Erreur', error.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    // Recharge les données à chaque fois que l'écran reçoit le focus
    useFocusEffect(
        useCallback(() => {
            chargerEmprunts();

            // Optionnel: Cleanup function si nécessaire
            return () => {
                // Nettoyage éventuel
            };
        }, [chargerEmprunts])
    );

    const handleRetourner = async (id: number) => {
        try {
            await retournerLivre(id);
            Alert.alert('Succès', 'Livre retourné avec succès');
            chargerEmprunts();
        } catch (error) {
            Alert.alert('Erreur', error.message);
        }
    };

    const getItemStyle = (item: Emprunt) => {
        if (item.dateRetour) {
            return styles.itemRendu;
        } else {
            const today = new Date();
            const retourPrevu = new Date(item.dateRetourPrevu);
            const diffTime = retourPrevu.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays < 0) {
                return styles.itemEnRetard;
            } else if (diffDays <= 3) {
                return styles.itemAvertissement;
            } else {
                return styles.itemNormal;
            }
        }
    };

    const renderItem = ({ item }: { item: Emprunt }) => (
        <TouchableOpacity
            style={[styles.itemContainer, getItemStyle(item)]}
            onPress={() => // @ts-ignore
                navigation.navigate('EmpruntDetail', { empruntId: item.id })}
        >
            <Text style={styles.titre}>{item.livre.titre}</Text>
            <Text style={styles.auteur}>{item.livre.auteur}</Text>

            <View style={styles.dates}>
                <Text>Emprunté le: {new Date(item.dateEmprunt).toLocaleDateString()}</Text>
                {item.dateRetour
                    ? <Text>Retourné le: {new Date(item.dateRetour).toLocaleDateString()}</Text>
                    : <Text>À rendre avant: {new Date(item.dateRetourPrevu).toLocaleDateString()}</Text>
                }
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6a1b9a" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={emprunts}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                refreshing={refreshing}
                onRefresh={() => {
                    setRefreshing(true);
                    chargerEmprunts();
                }}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon name="book" size={40} color="#ccc" />
                        <Text style={styles.texteVide}>Aucun emprunt trouvé</Text>
                    </View>
                }
                contentContainerStyle={styles.contentContainer}
            />
        </SafeAreaView>
    );
};

type Emprunt = {
    id: number;
    livre: {
        idL: number;
        titre: string;
        auteur: string;
        imageUrl?: string;
    };
    dateEmprunt: string;
    dateRetour: string | null;
    dateRetourPrevu: string;
    prolonge: boolean;
};

export default HistoryScreenAdmin;
