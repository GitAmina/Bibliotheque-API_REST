import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { updateStudentProfile } from '../services/student';
import { styles } from './style/style'

const EditProfileModal = ({ visible, onClose, student, onUpdate }) => {
    const [formData, setFormData] = useState({
        nom: student.nom,
        prenom: student.prenom,
        email: student.email,
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!formData.nom || !formData.prenom || !formData.email) {
            Alert.alert('Erreur', 'Tous les champs sont obligatoires');
            return;
        }

        setLoading(true);
        try {
            const updatedStudent = await updateStudentProfile(student.idEt, formData);
            onUpdate(updatedStudent);
            Alert.alert('Succès', 'Profil mis à jour avec succès');
            onClose();
        } catch (error) {
            Alert.alert('Erreur', 'Échec de la mise à jour du profil');
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
                    <Text style={styles.modalTitle}>Modifier mon profil</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nom"
                        value={formData.nom}
                        onChangeText={(text) => setFormData({...formData, nom: text})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Prénom"
                        value={formData.prenom}
                        onChangeText={(text) => setFormData({...formData, prenom: text})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={formData.email}
                        onChangeText={(text) => setFormData({...formData, email: text})}
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
                                {loading ? 'En cours...' : 'Valider'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default EditProfileModal;
