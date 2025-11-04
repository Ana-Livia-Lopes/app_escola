import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationParameter } from "../features/navigation";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

export default function CadastroProfessor({ navigation }: NavigationParameter<"CadastroProfessor">) {
    const cadastrar = () => {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    }

    const cancelar = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#8b9fc0ff' }}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />

                    <Text style={styles.label}>Nome Completo</Text>
                    <TextInput
                        placeholder="Digite seu nome completo"
                        style={styles.input}
                    />

                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        placeholder="Digite seu e-mail"
                        style={styles.input}
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        placeholder="Digite sua senha"
                        style={styles.input}
                        secureTextEntry
                    />


                    <TouchableOpacity style={styles.BotaoCadastrar} onPress={cadastrar}>
                        <Text style={styles.txtBotaoCadastrar}>Criar Conta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.BotaoCancelar} onPress={cancelar}>
                        <Text style={styles.txtBotaoCancelar}>Cancelar</Text>
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
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 16
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
    titulo: {
        fontSize: 20,
        color: '#0B3D91',
        textAlign: 'center',
        fontWeight: '700',
        marginBottom: 16
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
    BotaoCadastrar: {
        backgroundColor: '#1E5CC8',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10
    },
    txtBotaoCadastrar: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    },
    BotaoCancelar: {
        backgroundColor: '#D9534F',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center'
    },
    txtBotaoCancelar: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    }
});