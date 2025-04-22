import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { getStudentProfile, deleteStudentAccount } from '../../services/student';
import ChangePasswordModal from '../../components/ChangePasswordModal';
import EditProfileModal from '../../components/EditProfileModal';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from './style/styleprofile'

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);
    const [editProfileVisible, setEditProfileVisible] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profile = await getStudentProfile();
                setStudent(profile);
            } catch (error) {
                Alert.alert('Erreur', 'Impossible de charger le profil');
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    useEffect(() => {
        const checkStorage = async () => {
            const email = await AsyncStorage.getItem('email');
            const token = await AsyncStorage.getItem('token');
            console.log('Current storage:', { email, token });
        };
        checkStorage();
    }, []);

    const getWarningColor = (count) => {
        if (count <= 3) return 'green';
        if (count <= 5) return 'orange';
        return 'red';
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'CONFORME': return 'green';
            case 'ATTENTION': return 'orange';
            case 'BLOQUE': return 'red';
            default: return 'black';
        }
    };

    const handleDeleteAccount = async () => {
        Alert.alert(
            'Confirmation',
            'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteStudentAccount(student.idEt);
                            await AsyncStorage.removeItem('token');
                            await AsyncStorage.removeItem('role');
                            // @ts-ignore
                            navigation.navigate('Connexion');
                        } catch (error) {
                            Alert.alert('Erreur', 'La suppression a échoué');
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6a1b9a" />
            </View>
        );
    }

    if (!student) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Impossible de charger le profil</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Photo de profil */}
            <View style={styles.profileImageContainer}>
                <Image
                    source={require('../../../assets/default-profile.png')}
                    style={styles.profileImage}
                />
            </View>

            {/* Informations étudiant */}
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Code étudiant : </Text>
                    <Text style={styles.infoValue}>{student.codeEtudiant}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Nom : </Text>
                    <Text style={styles.infoValue}>{student.nom}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Prénom : </Text>
                    <Text style={styles.infoValue}>{student.prenom}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Email : </Text>
                    <Text style={styles.infoValue}>{student.email}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Livres empruntés : </Text>
                    <Text style={styles.infoValue}>{student.nbrLivreEmprunter}</Text>
                </View>

                {/* Nouveaux champs */}
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Nombre d'avertissements : </Text>
                    <Text style={[styles.infoValue, {color: getWarningColor(student.nbrAvertissement)}]}>
                        {student.nbrAvertissement}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Statut : </Text>
                    <Text style={[styles.infoValue, {color: getStatusColor(student.statut)}]}>
                        {student.statut}
                    </Text>
                </View>
            </View>

            {/* Boutons d'action */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setEditProfileVisible(true)}
                >
                    <Text style={styles.buttonText}>Modifier mon profil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setChangePasswordVisible(true)}
                >
                    <Text style={styles.buttonText}>Changer mon mot de passe</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={handleDeleteAccount}
                >
                    <Text style={styles.buttonText}>Supprimer mon compte</Text>
                </TouchableOpacity>
            </View>

            {/* Modals */}
            <ChangePasswordModal
                visible={changePasswordVisible}
                onClose={() => setChangePasswordVisible(false)}
                studentId={student.idEt}
            />

            <EditProfileModal
                visible={editProfileVisible}
                onClose={() => setEditProfileVisible(false)}
                student={student}
                onUpdate={(updatedStudent) => setStudent(updatedStudent)}
            />
        </ScrollView>
    );
};

export default ProfileScreen;
