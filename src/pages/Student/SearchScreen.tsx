import React, { useState } from 'react';
import { View,  Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "./style/stylesearch";
import { emprunterLivre } from '../../services/emprunt';

const API_URL = 'http://192.168.11.101:8080/bibliotheque/api/livres';

const SearchScreen = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState<'titre' | 'auteur' | 'genre' | 'annee'>('titre');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [yearFilter, setYearFilter] = useState('');

    const handleSearch = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');

            let url = `${API_URL}/recherche`;
            let params = {};

            if (searchType === 'annee') {
                if (!yearFilter.trim()) {
                    Alert.alert('Erreur', 'Veuillez entrer un terme de recherche');
                    return;
                }
                url = `${API_URL}/annee/${yearFilter}`;
            } else if (searchType === 'titre') {
                if (!searchText.trim()) {
                    Alert.alert('Erreur', 'Veuillez entrer un terme de recherche');
                    return;
                }
                url = `${API_URL}/recherche/titre/${searchText}`;
            } else if (searchType === 'auteur') {
                if (!searchText.trim()) {
                    Alert.alert('Erreur', 'Veuillez entrer un terme de recherche');
                    return;
                }
                url = `${API_URL}/recherche/auteur/${searchText}`;
            } else if (searchType === 'genre') {
                if (!searchText.trim()) {
                    Alert.alert('Erreur', 'Veuillez entrer un terme de recherche');
                    return;
                }
                url = `${API_URL}/recherche/genre/${searchText}`;
            }

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: searchType === 'annee' ? {} : params
            });

            setResults(response.data.sort((a, b) => a.titre.localeCompare(b.titre)));
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEmprunter = async (bookId: number) => {
        try {
            await emprunterLivre(bookId);
            Alert.alert('Succès', 'Livre emprunté avec succès');
            handleSearch();
        } catch (error) {
            Alert.alert('Erreur', error.message);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.item}
                onPress={() => // @ts-ignore
                    navigation.navigate('Details du livre', {
                        book: item,
                        onBookBorrowed: handleSearch
                    })}
            >
                <Text style={styles.title}>{item.titre}</Text>
                <Text style={styles.author}>{item.auteur}</Text>
                <Text style={styles.info}>Genre: {item.genre}</Text>
                <Text style={styles.info}>Année: {item.annee}</Text>
                <Text style={item.disponibilite ? styles.available : styles.unavailable}>
                    {item.disponibilite ? 'Disponible' : 'Indisponible'}
                </Text>

                {item.disponibilite && (
                    <TouchableOpacity
                        style={styles.borrowButton}
                        onPress={(e) => {
                            e.stopPropagation();
                            handleEmprunter(item.idL);
                        }}
                    >
                        <Text style={styles.borrowButtonText}>Emprunter</Text>
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Search Form */}
            <View style={styles.searchContainer}>
                {searchType === 'annee' ? (
                    <TextInput
                        style={styles.input}
                        placeholder={`Entrez une année...`}
                        value={yearFilter}
                        onChangeText={setYearFilter}
                        keyboardType="numeric"
                    />
                ) : (
                    <TextInput
                        style={styles.input}
                        placeholder={`Rechercher par ${searchType}...`}
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                )}

                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSearch}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.searchButtonText}>Rechercher</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Filter Buttons */}
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterButton, searchType === 'titre' && styles.activeFilter]}
                    onPress={() => setSearchType('titre')}
                >
                    <Text style={[styles.filterText, searchType === 'titre' && styles.activeFilterText]}>Titre</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, searchType === 'auteur' && styles.activeFilter]}
                    onPress={() => setSearchType('auteur')}
                >
                    <Text style={[styles.filterText, searchType === 'auteur' && styles.activeFilterText]}>Auteur</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, searchType === 'genre' && styles.activeFilter]}
                    onPress={() => setSearchType('genre')}
                >
                    <Text style={[styles.filterText, searchType === 'genre' && styles.activeFilterText]}>Genre</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, searchType === 'annee' && styles.activeFilter]}
                    onPress={() => setSearchType('annee')}
                >
                    <Text style={[styles.filterText, searchType === 'annee' && styles.activeFilterText]}>Année</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={item => item.idL.toString()}
                contentContainerStyle={styles.contentContainer}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon name="search" size={40} color="#ccc" />
                        <Text style={styles.emptyText}>Aucun résultat trouvé</Text>
                    </View>
                }
            />
        </View>
    );
};

export default SearchScreen;
