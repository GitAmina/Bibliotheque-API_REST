import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator} from 'react-native';
import { getDetailsEmprunt, prolongerEmprunt, avertirEtudiant, changerStatutEtudiant, retournerLivre } from '../../services/emprunt';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from "./style/styleemprunt";
import { EmpruntDetail} from "../../services/emprunt";

const EmpruntDetailScreen = () => {
    const [emprunt, setEmprunt] = useState<EmpruntDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const navigation = useNavigation();
    // @ts-ignore
    const { empruntId } = route.params;

    useEffect(() => {
        const chargerDetails = async () => {
            try {
                const data = await getDetailsEmprunt(empruntId);
                setEmprunt(data);
            } catch (error) {
                Alert.alert('Erreur', error.message);
            } finally {
                setLoading(false);
            }
        };
        chargerDetails();
    }, [empruntId]);

    const handleProlonger = async () => {
        try {
            await prolongerEmprunt(empruntId);
            Alert.alert('Succès', 'Emprunt prolongé de 5 jours');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erreur', error.message);
        }
    };

    const handleAvertir = async () => {
        try {
            await avertirEtudiant(empruntId);
            Alert.alert('Succès', 'Étudiant averti');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erreur', error.message);
        }
    };

    const handleChangerStatut = async (nouveauStatut) => {
        try {
            await changerStatutEtudiant(emprunt.etudiant.idEt, nouveauStatut);
            Alert.alert('Succès', `Statut changé à ${nouveauStatut}`);
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erreur', error.message);
        }
    };

    const handleRestituer = async () => {
        try {
            await retournerLivre(empruntId);
            Alert.alert('Succès', 'Livre restitué');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erreur', error.message);
        }
    };

    if (loading || !emprunt) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6a1b9a" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informations du livre</Text>
                <Text>Titre: {emprunt.livre.titre}</Text>
                <Text>Auteur: {emprunt.livre.auteur}</Text>
                <Text>Date emprunt: {new Date(emprunt.dateEmprunt).toLocaleDateString()}</Text>
                <Text>Date retour prévu: {new Date(emprunt.dateRetourPrevu).toLocaleDateString()}</Text>
                {emprunt.dateRetour && <Text>Date retour: {new Date(emprunt.dateRetour).toLocaleDateString()}</Text>}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informations de l'étudiant</Text>
                <Text>Code: {emprunt.etudiant.codeEtudiant}</Text>
                <Text>Nom: {emprunt.etudiant.nom} {emprunt.etudiant.prenom}</Text>
                <Text>Livres empruntés: {emprunt.etudiant.nbrLivreEmprunter}</Text>
                <Text>Avertissements: {emprunt.etudiant.nbrAvertissement}</Text>
                <Text>Statut: {emprunt.etudiant.statut}</Text>
            </View>

            {!emprunt.dateRetour && (
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.button} onPress={handleProlonger}>
                        <Text style={styles.buttonText}>Prolonger de 5 jours</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleAvertir}>
                        <Text style={styles.buttonText}>Avertir l'étudiant</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleChangerStatut(emprunt.etudiant.statut === 'BLOQUE' ? 'CONFORME' : 'BLOQUE')}
                    >
                        <Text style={styles.buttonText}>
                            {emprunt.etudiant.statut === 'BLOQUE' ? 'Débloquer' : 'Bloquer'} l'étudiant
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleRestituer}>
                        <Text style={styles.buttonText}>Restituer le livre</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

export default EmpruntDetailScreen;
