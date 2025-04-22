import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Connexion from './src/pages/Auth/Connexion';
import Inscription from './src/pages/Auth/Inscription';
import StudentHome from './src/pages/Student/StudentHome';
import BookDetails from './src/pages/Student/BookDetails';
import ProfileScreen from "./src/pages/Student/ProfileScreen";
import HistoryScreen from "./src/pages/Student/HistoryScreen";
import SearchScreen from "./src/pages/Student/SearchScreen";
import AdminHome from "./src/pages/Admin/AdminHome";
import BookDetailsAdmin from "./src/pages/Admin/BookDetailsAdmin";
import HistoryScreenAdmin from "./src/pages/Admin/HistoryAdminScreen";
import ProfileScreenAdmin from "./src/pages/Admin/ProfileAdminScreen";
import SearchScreenAdmin from "./src/pages/Admin/SearchScreenAdmin";
import AddAdminScreen from "./src/pages/Admin/AddAdminScreen";
import AddBookScreen from "./src/pages/Admin/AddBookScreen";
import EmpruntDetailScreen from "./src/pages/Admin/EmpruntDetailScreen";
import StudentSearchScreen from "./src/pages/Admin/StudentSearchScreen";
import StudentDetailsScreen from "./src/pages/Admin/StudentDetailsScreen";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Connexion">
                <Stack.Screen
                    name="Connexion"
                    component={Connexion}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Inscription"
                    component={Inscription}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="StudentHome"
                    component={StudentHome}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Details du livre"
                    component={BookDetails}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="Emprunts"
                    component={HistoryScreen}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="Recherche"
                    component={SearchScreen}
                    options={{ headerShown: true }}
                />

                <Stack.Screen
                    name="AdminHome"
                    component={AdminHome}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Details livre"
                    component={BookDetailsAdmin}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="Les Emprunts"
                    component={HistoryScreenAdmin}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="Mon Profile"
                    component={ProfileScreenAdmin}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="Rechercher"
                    component={SearchScreenAdmin}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="Ajouter Admin"
                    component={AddAdminScreen}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="Ajouter Livre"
                    component={AddBookScreen}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="EmpruntDetail"
                    component={EmpruntDetailScreen}
                    options={{ title: 'Détails de l\'emprunt' }}
                />
                <Stack.Screen
                    name="Rechercher Etudiant"
                    component={StudentSearchScreen}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="StudentDetails"
                    component={StudentDetailsScreen}
                    options={{ title: 'Détails étudiant', headerShown: true }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
