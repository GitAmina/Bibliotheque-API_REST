import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { searchStudents, resetStudentWarnings, changeStudentStatus } from '../../services/student';
import { styles } from "./style/stylesearch";

const StudentSearchScreen = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState<'code' | 'nom' | 'prenom' | 'email'>('nom');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchText.trim()) {
            Alert.alert('Erreur', 'Veuillez entrer un terme de recherche');
            return;
        }

        try {
            setLoading(true);
            const students = await searchStudents(searchText, searchType);
            setResults(students);
        } catch (error) {
            Alert.alert('Erreur', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetWarnings = async (studentId: number) => {
        try {
            await resetStudentWarnings(studentId);
            Alert.alert('Succès', 'Avertissements réinitialisés');
            handleSearch();
        } catch (error) {
            Alert.alert('Erreur', error.message);
        }
    };

    const handleChangeStatus = async (studentId: number, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'BLOQUE' ? 'CONFORME' : 'BLOQUE';
            await changeStudentStatus(studentId, newStatus);
            Alert.alert('Succès', `Statut changé à ${newStatus}`);
            handleSearch();
        } catch (error) {
            Alert.alert('Erreur', error.message);
        }
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.item}
                onPress={() => // @ts-ignore
                    navigation.navigate('StudentDetails', {
                    student: item,
                    onStatusChange: () => handleChangeStatus(item.idEt, item.statut),
                    onWarningsReset: () => handleResetWarnings(item.idEt)
                })}
            >
                <Text style={styles.title}>{item.nom} {item.prenom}</Text>
                <Text style={styles.author}>Code: {item.codeEtudiant}</Text>
                <Text style={styles.info}>Email: {item.email}</Text>
                <Text style={styles.info}>Livres empruntés: {item.nbrLivreEmprunter}</Text>
                <Text style={item.statut === 'BLOQUE' ? styles.unavailable : styles.available}>
                    Statut: {item.statut} (Avertissements: {item.nbrAvertissement})
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Search Form */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={`Rechercher par ${searchType}...`}
                    value={searchText}
                    onChangeText={setSearchText}
                />

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
                    style={[styles.filterButton, searchType === 'nom' && styles.activeFilter]}
                    onPress={() => setSearchType('nom')}
                >
                    <Text style={[styles.filterText, searchType === 'nom' && styles.activeFilterText]}>Nom</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, searchType === 'prenom' && styles.activeFilter]}
                    onPress={() => setSearchType('prenom')}
                >
                    <Text style={[styles.filterText, searchType === 'prenom' && styles.activeFilterText]}>Prénom</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, searchType === 'code' && styles.activeFilter]}
                    onPress={() => setSearchType('code')}
                >
                    <Text style={[styles.filterText, searchType === 'code' && styles.activeFilterText]}>Code</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, searchType === 'email' && styles.activeFilter]}
                    onPress={() => setSearchType('email')}
                >
                    <Text style={[styles.filterText, searchType === 'email' && styles.activeFilterText]}>Email</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={item => item.idEt.toString()}
                contentContainerStyle={styles.contentContainer}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon name="search" size={40} color="#ccc" />
                        <Text style={styles.emptyText}>Aucun étudiant trouvé</Text>
                    </View>
                }
            />
        </View>
    );
};

export default StudentSearchScreen;
