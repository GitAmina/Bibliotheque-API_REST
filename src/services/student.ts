import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.11.103:8080/bibliotheque/api/etudiants';

export const getStudentProfile = async () => {
    try {
        const email = await AsyncStorage.getItem('email');
        const token = await AsyncStorage.getItem('token');

        if (!token || !email) {
            throw new Error('Authentication required');
        }

        console.log("Informations recuperées avec succes");

        const response = await axios.get(`${API_URL}/email/${encodeURIComponent(email)}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 5000
            }
        );

        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du profil');
        throw new Error('Impossible de charger le profil');
    }
};

export const updateStudentProfile = async (id: number, updates: { [key: string]: any }) => {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.patch(
        `${API_URL}/${id}`,
        updates,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
};

export const changePassword = async (id: number, newPassword: string) => {
    return updateStudentProfile(id, { motDePasse: newPassword });
};

export const deleteStudentAccount = async (id: number) => {
    try {
        const token = await AsyncStorage.getItem('token');

        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error deleting student account:', error);
        throw error;
    }
};

export const searchStudents = async (searchTerm: string, searchType: 'code' | 'nom' | 'prenom' | 'email') => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Authentification requise');

        let url = `${API_URL}/recherche`;
        if (searchType === 'code') {
            url = `${API_URL}/code/${searchTerm}`;
        } else if (searchType === 'nom' || searchType === 'prenom') {
            // Pour nom/prénom, on utilise la recherche combinée
            url = `${API_URL}/recherche?prenom=${searchType === 'prenom' ? searchTerm : ''}&nom=${searchType === 'nom' ? searchTerm : ''}`;
        } else if (searchType === 'email') {
            url = `${API_URL}/email/${encodeURIComponent(searchTerm)}`;
        }

        const { data } = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: 5000
        });

        const students = Array.isArray(data) ? data : [data];

        return students.sort((a, b) => {
            const nomComparison = a.nom.localeCompare(b.nom);
            if (nomComparison !== 0) return nomComparison;
            return a.prenom.localeCompare(b.prenom);
        });
    } catch (error) {
        throw new Error(
            axios.isAxiosError(error)
                ? error.response?.data?.message || 'Erreur de recherche'
                : 'Erreur de recherche'
        );
    }
};

export const resetStudentWarnings = async (studentId: number) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Authentification requise');

        const { data } = await axios.patch(
            `${API_URL}/${studentId}/reinitialiser-avertissements`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 5000
            }
        );
        return data;
    } catch (error) {
        throw new Error(
            axios.isAxiosError(error)
                ? error.response?.data?.message || 'Erreur lors de la réinitialisation'
                : 'Erreur lors de la réinitialisation'
        );
    }
};

export const changeStudentStatus = async (studentId: number, newStatus: string) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Authentification requise');

        const { data } = await axios.patch(
            `${API_URL}/${studentId}/statut`,
            { statut: newStatus },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 5000
            }
        );
        return data;
    } catch (error) {
        throw new Error(
            axios.isAxiosError(error)
                ? error.response?.data?.message || 'Erreur lors du changement de statut'
                : 'Erreur lors du changement de statut'
        );
    }
};
