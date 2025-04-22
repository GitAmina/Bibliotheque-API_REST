import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { addAdmin } from '../../services/admin';
import { styles } from "./style/styleadd";

const AddAdminScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!formData.nom || !formData.prenom || !formData.email) {
            Alert.alert('Erreur', 'Tous les champs sont obligatoires');
            return;
        }

        // Validation simple de l'email
        if (!formData.email.includes('@')) {
            Alert.alert('Erreur', 'Veuillez entrer un email valide');
            return;
        }

        setLoading(true);
        try {
            await addAdmin(formData);
            Alert.alert(
                'Succès',
                'Administrateur ajouté avec succès.\nMot de passe temporaire : Aminata1',
                [{
                    text: 'OK',
                    onPress: () => {
                        // Réinitialisation du formulaire
                        setFormData({
                            nom: '',
                            prenom: '',
                            email: ''
                        });
                    }
                }]
            );
        } catch (error) {
            Alert.alert('Erreur', error.message || "Échec de l'ajout de l'administrateur");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nom *</Text>
            <TextInput
                style={styles.input}
                value={formData.nom}
                onChangeText={(text) => handleChange('nom', text)}
                placeholder="Entrez le nom"
                autoCapitalize="words"
            />

            <Text style={styles.label}>Prénom *</Text>
            <TextInput
                style={styles.input}
                value={formData.prenom}
                onChangeText={(text) => handleChange('prenom', text)}
                placeholder="Entrez le prénom"
                autoCapitalize="words"
            />

            <Text style={styles.label}>Email *</Text>
            <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
                placeholder="Entrez l'email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
            />

            <Text style={styles.note}>
                Un mot de passe temporaire "Aminata1" sera attribué à cet administrateur.
            </Text>

            <TouchableOpacity
                style={[styles.button, loading && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'En cours...' : 'Ajouter Administrateur'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddAdminScreen;
