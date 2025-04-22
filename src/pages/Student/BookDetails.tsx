import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './style/styledetails';
import { emprunterLivre } from '../../services/emprunt';

const BookDetails = ({ route, navigation }) => {
    const { book, onBookBorrowed } = route.params;

    const handleEmprunt = async () => {
        try {
            await emprunterLivre(book.idL);
            Alert.alert('Succès', 'Livre emprunté avec succès!');

            if (onBookBorrowed) {
                onBookBorrowed();
            }

            navigation.goBack();
        } catch (error) {
            Alert.alert('Erreur', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.detailCard}>
                    <Text style={styles.title}>{book.titre}</Text>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Auteur:</Text>
                        <Text style={styles.detailValue}>{book.auteur || 'Non spécifié'}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Genre:</Text>
                        <Text style={styles.detailValue}>{book.genre || 'Non spécifié'}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Année:</Text>
                        <Text style={styles.detailValue}>{book.annee || 'Non spécifiée'}</Text>
                    </View>

                    <View style={styles.detailSection}>
                        <Text style={styles.detailLabel}>Description:</Text>
                        <Text style={styles.description}>
                            {book.description || 'Aucune description disponible'}
                        </Text>
                    </View>

                    <View style={styles.statusContainer}>
                        <View style={[
                            styles.statusDot,
                            book.disponibilite ? styles.available : styles.unavailable
                        ]} />
                        <Text style={styles.statusText}>
                            {book.disponibilite ? 'Disponible' : 'Indisponible'}
                        </Text>
                    </View>

                    {book.disponibilite && (
                        <TouchableOpacity
                            style={styles.borrowButton}
                            onPress={handleEmprunt}
                        >
                            <Text style={styles.borrowButtonText}>Emprunter ce livre</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default BookDetails;
