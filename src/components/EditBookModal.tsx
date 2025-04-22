import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { updateBook } from '../services/books';
import { styles } from "./style/stylebook";

const EditBookModal = ({ visible, book, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        titre: book.titre,
        auteur: book.auteur,
        genre: book.genre,
        annee: book.annee.toString(),
        description: book.description || ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!formData.titre || !formData.auteur || !formData.genre || !formData.annee) {
            Alert.alert('Erreur', 'Les champs obligatoires doivent être remplis');
            return;
        }

        const annee = parseInt(formData.annee);
        if (isNaN(annee)) {
            Alert.alert('Erreur', 'Année invalide');
            return;
        }

        setLoading(true);
        try {
            const updatedBook = await updateBook(book.idL, {
                titre: formData.titre,
                auteur: formData.auteur,
                genre: formData.genre,
                annee: annee,
                description: formData.description || null
            });
            Alert.alert('Succès', 'Livre modifié avec succès');
            onUpdate(updatedBook);
            onClose();
        } catch (error) {
            Alert.alert('Erreur', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Modifier le livre</Text>

                    <Text style={styles.label}>Titre *</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.titre}
                        onChangeText={(text) => setFormData({...formData, titre: text})}
                    />

                    <Text style={styles.label}>Auteur *</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.auteur}
                        onChangeText={(text) => setFormData({...formData, auteur: text})}
                    />

                    <Text style={styles.label}>Genre *</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.genre}
                        onChangeText={(text) => setFormData({...formData, genre: text})}
                    />

                    <Text style={styles.label}>Annee *</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.annee}
                        onChangeText={(text) => setFormData({...formData, annee: text})}
                    />

                    <Text style={styles.label}>Desciption</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.description}
                        onChangeText={(text) => setFormData({...formData, description: text})}
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Annuler</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.submitButton]}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'En cours...' : 'Enregistrer'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


export default EditBookModal;
