import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { styles } from "./style/stylestudent";

const StudentDetailsScreen = () => {
    const route = useRoute();
    // @ts-ignore
    const { student, onStatusChange, onWarningsReset } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informations de l'étudiant</Text>
                <Text>Code: {student.codeEtudiant}</Text>
                <Text>Nom: {student.nom}</Text>
                <Text>Prénom: {student.prenom}</Text>
                <Text>Email: {student.email}</Text>
                <Text>Livres empruntés: {student.nbrLivreEmprunter}</Text>
                <Text>Avertissements: {student.nbrAvertissement}</Text>
                <Text>Statut: {student.statut}</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onStatusChange(student.idEt, student.statut)}
                >
                    <Text style={styles.buttonText}>
                        {student.statut === 'BLOQUE' ? 'Débloquer' : 'Bloquer'} l'étudiant
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onWarningsReset(student.idEt)}
                >
                    <Text style={styles.buttonText}>Réinitialiser les avertissements</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default StudentDetailsScreen;
