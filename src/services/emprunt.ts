import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.11.107:8080/bibliotheque/api/emprunts';

interface Emprunt {
    id: number;
    livre: {
        idL: number;
        titre: string;
        auteur: string;
        imageUrl?: string;
    };
    dateEmprunt: string;
    dateRetour: string | null;
    dateRetourPrevu: string;
    prolonge: boolean;
}

export const emprunterLivre = async (livreId: number): Promise<Emprunt> => {
    try {
        const [token, email] = await Promise.all([
            AsyncStorage.getItem('token'),
            AsyncStorage.getItem('email')
        ]);

        if (!token || !email) throw new Error('Authentification requise');

        // Récupération de l'ID étudiant comme dans getStudentProfile
        const responseEtudiant = await axios.get(
            `http://192.168.11.107:8080/bibliotheque/api/etudiants/email/${encodeURIComponent(email)}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 5000
            }
        );

        const etudiantId = responseEtudiant.data.idEt;

        const { data } = await axios.post<Emprunt>(
            API_URL,
            {
                livreId: livreId,  // Format simplifié
                etudiantId: etudiantId
            },
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
        const message = axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : 'Erreur lors de l\'emprunt';
        throw new Error(message);
    }
};

export const retournerLivre = async (empruntId: number): Promise<void> => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Authentification requise');

        await axios.patch(
            `${API_URL}/${empruntId}`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 5000
            }
        );
    } catch (error) {
        throw new Error(
            axios.isAxiosError(error)
                ? error.response?.data?.message || 'Erreur lors du retour'
                : 'Erreur lors du retour'
        );
    }
};

export const getTousEmprunts = async (): Promise<Emprunt[]> => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Authentification requise');

        const { data } = await axios.get<Emprunt[]>(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: 5000
        });

        return data.sort((a, b) => {
            if (a.dateRetour === null && b.dateRetour !== null) return -1;
            if (a.dateRetour !== null && b.dateRetour === null) return 1;
            return new Date(b.dateEmprunt).getTime() - new Date(a.dateEmprunt).getTime();
        });
    } catch (error) {
        throw new Error(
            axios.isAxiosError(error)
                ? error.response?.data?.message || 'Erreur de chargement'
                : 'Erreur de chargement'
        );
    }
};

export const getEmpruntsEtudiant = async (): Promise<Emprunt[]> => {
    try {
        const [token, email] = await Promise.all([
            AsyncStorage.getItem('token'),
            AsyncStorage.getItem('email')
        ]);

        if (!token || !email) throw new Error('Authentification requise');

        // D'abord récupérer l'ID de l'étudiant
        const responseEtudiant = await axios.get(
            `http://192.168.11.107:8080/bibliotheque/api/etudiants/email/${encodeURIComponent(email)}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 5000
            }
        );

        const etudiantId = responseEtudiant.data.idEt;

        const { data } = await axios.get<Emprunt[]>(
            `${API_URL}/etudiant/${etudiantId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 5000
            }
        );

        return data.sort((a, b) => {
            // Les emprunts en cours d'abord, puis les plus récents
            if (a.dateRetour === null && b.dateRetour !== null) return -1;
            if (a.dateRetour !== null && b.dateRetour === null) return 1;
            return new Date(b.dateEmprunt).getTime() - new Date(a.dateEmprunt).getTime();
        });
    } catch (error) {
        throw new Error(
            axios.isAxiosError(error)
                ? error.response?.data?.message || 'Erreur de chargement'
                : 'Erreur de chargement'
        );
    }
};

export const getDetailsEmprunt = async (empruntId: number): Promise<EmpruntDetail> => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Authentification requise');

        const { data } = await axios.get<EmpruntDetail>(
            `${API_URL}/${empruntId}`,
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
                ? error.response?.data?.message || 'Erreur de chargement'
                : 'Erreur de chargement'
        );
    }
};

export const prolongerEmprunt = async (empruntId: number): Promise<Emprunt> => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Authentification requise');

        const { data } = await axios.patch<Emprunt>(
            `${API_URL}/${empruntId}/prolonger`,
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
        const message = axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : 'Erreur lors de la prolongation';
        throw new Error(message);
    }
};

export const avertirEtudiant = async (empruntId: number): Promise<Etudiant> => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Authentification requise');

        const { data } = await axios.patch<Etudiant>(
            `${API_URL}/${empruntId}/avertir`,
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
        const message = axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : 'Erreur lors de l\'avertissement';
        throw new Error(message);
    }
};

export const changerStatutEtudiant = async (etudiantId: number, nouveauStatut: string): Promise<Etudiant> => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Authentification requise');

        const { data } = await axios.patch<Etudiant>(
            `http://192.168.11.107:8080/bibliotheque/api/etudiants/${etudiantId}/statut`,
            { statut: nouveauStatut },
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
        const message = axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : 'Erreur lors du changement de statut';
        throw new Error(message);
    }
};

export type EmpruntDetail = Emprunt & {
    etudiant: {
        idEt: number;
        codeEtudiant: string;
        nom: string;
        prenom: string;
        nbrLivreEmprunter: number;
        nbrAvertissement: number;
        statut: string;
    };
};

export type Etudiant = {
    idEt: number;
    codeEtudiant: string;
    nom: string;
    prenom: string;
    nbrLivreEmprunter: number;
    nbrAvertissement: number;
    statut: string;
};
