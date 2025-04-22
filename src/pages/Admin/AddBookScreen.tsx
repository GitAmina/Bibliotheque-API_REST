import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { addBook } from '../../services/books';
import { useNavigation } from '@react-navigation/native';
import { styles } from "./style/stylebook";

const AddBookScreen = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        titre: '',
        auteur: '',
        genre: '',
        annee: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!formData.titre.trim() || !formData.auteur.trim() || !formData.genre.trim()) {
            Alert.alert('Erreur', 'Les champs texte ne peuvent pas être vides');
            return;
        }

        const annee = parseInt(formData.annee);
        if (isNaN(annee) || annee < 0 || annee > new Date().getFullYear()) {
            Alert.alert('Erreur', 'Veuillez entrer une année valide');
            return;
        }

        setLoading(true);
        try {
            await addBook({
                titre: formData.titre.trim(),
                auteur: formData.auteur.trim(),
                genre: formData.genre.trim(),
                annee: annee,
                description: formData.description?.trim() || null
            });
            Alert.alert('Succès', 'Livre ajouté avec succès');
            navigation.goBack();
        } catch (error) {
            Alert.alert(
                'Erreur',
                error.message || "Une erreur inattendue est survenue"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Titre *</Text>
            <TextInput
                style={styles.input}
                value={formData.titre}
                onChangeText={(text) => handleChange('titre', text)}
                placeholder="Titre du livre"
            />

            <Text style={styles.label}>Auteur *</Text>
            <TextInput
                style={styles.input}
                value={formData.auteur}
                onChangeText={(text) => handleChange('auteur', text)}
                placeholder="Nom de l'auteur"
            />

            <Text style={styles.label}>Genre *</Text>
            <TextInput
                style={styles.input}
                value={formData.genre}
                onChangeText={(text) => handleChange('genre', text)}
                placeholder="Genre littéraire"
            />

            <Text style={styles.label}>Année *</Text>
            <TextInput
                style={styles.input}
                value={formData.annee}
                onChangeText={(text) => handleChange('annee', text)}
                placeholder="Année de publication"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, styles.multilineInput]}
                value={formData.description}
                onChangeText={(text) => handleChange('description', text)}
                placeholder="Description du livre"
                multiline
                numberOfLines={4}
            />

            <TouchableOpacity
                style={[styles.button, loading && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'En cours...' : 'Ajouter le Livre'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddBookScreen;
