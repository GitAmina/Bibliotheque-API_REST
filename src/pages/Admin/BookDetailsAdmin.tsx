import React, {useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import EditBookModal from '../../components/EditBookModal';
import { styles } from './style/styledetails';
import { deleteBook } from '../../services/books';

const BookDetailsAdmin = ({ route, navigation }) => {
    const { book, onBookUpdated, onBookDeleted } = route.params;
    const [editModalVisible, setEditModalVisible] = useState(false);

    const handleDelete = () => {
        Alert.alert(
            'Confirmer la suppression',
            `Êtes-vous sûr de vouloir supprimer "${book.titre}" ?`,
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteBook(book.idL);
                            Alert.alert('Succès', 'Livre supprimé');
                            onBookDeleted(book.idL);
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert('Erreur', error.message);
                        }
                    }
                }
            ]
        );
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

                    <TouchableOpacity
                        style={styles.borrowButton}
                        onPress={() => setEditModalVisible(true)}
                    >
                        <Text style={styles.borrowButtonText}>Modifier ce livre</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.borrowButton}
                        onPress={handleDelete}
                    >
                        <Text style={styles.borrowButtonText}>Supprimer ce livre</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            <EditBookModal
                visible={editModalVisible}
                book={book}
                onClose={() => setEditModalVisible(false)}
                onUpdate={(updatedBook) => {
                    onBookUpdated(updatedBook);
                    setEditModalVisible(false);
                }}
            />

        </View>
    );
};

export default BookDetailsAdmin;
