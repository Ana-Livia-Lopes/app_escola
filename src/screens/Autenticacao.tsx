import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationParameter } from "../features/navigation";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Professor from '../features/professor';
import { Status } from '../features/result';

interface FormEntrar {
    email: string;
    senha: string;
}

export default function Autenticacao({ navigation }: NavigationParameter<"Autenticacao">) {
    const [ form, setForm ] = useState<FormEntrar>({
        email: "",
        senha: "",
    });

    const entrar = async () => {
        const resultado = await Professor.entrar(form.email, form.senha);
        if (resultado.status === Status.erro) {
            Alert.alert("Erro ao entrar", resultado.mensagem, [{ text: "Ok" }])
        } else {
            navigation.navigate("Inicio")
        }
        // Alert.alert('Alert', 'fazer depois', [{ text: 'OK' }]);
    }

    const cadastrar = () => {
        navigation.navigate("CadastroProfessor");
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#8b9fc0ff' }}>
            <View style={styles.container}>
                    
                <View style={styles.card}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        placeholder="ex@email.com"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={(email) => setForm(() => ({ ...form, email }))}
                    />

                    <Text style={styles.label}>Senha</Text>
                    <TextInput

                        placeholder="Digite sua senha"
                        style={styles.input}
                        secureTextEntry
                        onChangeText={(senha) => setForm(() => ({ ...form, senha }))}
                    />

                    <TouchableOpacity style={styles.botaoEntrar} onPress={entrar}>
                        <Text style={styles.txtbotaoEntrar}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botaoCadastrar} onPress={cadastrar}>
                        <Text style={styles.txtbotaoCadastrar}>Criar conta</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8b9fc0ff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    logo: {
        width: 64,
        height: 64,
        resizeMode: 'contain',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    headerRight: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700'
    },

    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    label: {
        fontSize: 14,
        color: '#0B3D91',
        marginBottom: 6,
        fontWeight: '600'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
        fontSize: 16
    },
    botaoEntrar: {
        backgroundColor: '#1E5CC8',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center'
    },
    txtbotaoEntrar: {
        color: '#fff',
        fontWeight: '700'
    },
    botaoCadastrar: {
        backgroundColor: '#083067',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    txtbotaoCadastrar: {
        color: '#fff',
        fontWeight: '700'
    },
    link: {
        color: '#0B3D91',
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
});