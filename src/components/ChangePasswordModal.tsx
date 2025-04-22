import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { changePassword } from '../services/student';
import { styles } from './style/style'

const ChangePasswordModal = ({ visible, onClose, studentId }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        setLoading(true);
        try {
            await changePassword(studentId, newPassword);
            Alert.alert('Succès', 'Mot de passe changé avec succès');
            onClose();
        } catch (error) {
            Alert.alert('Erreur', 'Échec du changement de mot de passe');
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
                    <Text style={styles.modalTitle}>Changer le mot de passe</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nouveau mot de passe"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Confirmer le nouveau mot de passe"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
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

export default ChangePasswordModal;
