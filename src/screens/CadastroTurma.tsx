import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationParameter } from "../features/navigation";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Turma from '../features/turma';
import { Status } from '../features/result';

export default function CadastroTurma({ navigation }: NavigationParameter<"CadastroTurma">) {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [disciplina, setDisciplina] = useState('');
    const [tag, setTag] = useState('');
    const [loading, setLoading] = useState(false);

    const cadastrar = async () => {
        // Validação básica
        if (!nome.trim() || !disciplina.trim() || !tag.trim() || !quantidade.trim()) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios');
            return;
        }

        const qtd = parseInt(quantidade);
        if (isNaN(qtd) || qtd < 0) {
            Alert.alert('Erro', 'Quantidade de alunos inválida');
            return;
        }

        setLoading(true);
        try {
            const res = await Turma.criar(nome, disciplina, tag, qtd);
            if (res.status === Status.okay) {
                Alert.alert('Sucesso', 'Turma cadastrada com sucesso!', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert('Erro', res.mensagem || 'Não foi possível criar a turma');
            }
        } catch (e: any) {
            Alert.alert('Erro', e?.message || 'Erro desconhecido ao criar turma');
        } finally {
            setLoading(false);
        }
    }

    const cancelar = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#8b9fc0ff' }}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />
                    
                    <Text style={styles.titulo}>Nova Turma</Text>

                    <Text style={styles.label}>Nome da Turma</Text>
                    <TextInput
                        placeholder="Digite o nome da turma"
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Text style={styles.label}>Quantidade de alunos</Text>
                    <TextInput
                        placeholder="Digite a quantidade de alunos"
                        keyboardType="numeric"
                        style={styles.input}
                        value={quantidade}
                        onChangeText={setQuantidade}
                    />

                    <Text style={styles.label}>Disciplina</Text>
                    <TextInput style={styles.input}
                        placeholder="Digite o nome da disciplina"
                        value={disciplina}
                        onChangeText={setDisciplina}
                    />

                    <Text style={styles.label}>ID da Turma</Text>
                    <TextInput style={styles.idView}
                        placeholder="Digite uma tag única para a turma"
                        value={tag}
                        onChangeText={setTag}
                    />

                    <TouchableOpacity 
                        style={[styles.BotaoCadastrar, loading && styles.botaoDesabilitado]} 
                        onPress={cadastrar}
                        disabled={loading}
                    >
                        <Text style={styles.txtBotaoCadastrar}>
                            {loading ? 'Criando...' : 'Criar Turma'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.BotaoCancelar} 
                        onPress={cancelar}
                        disabled={loading}
                    >
                        <Text style={styles.txtBotaoCancelar}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
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
    idView: {
        backgroundColor: '#E8F0FE',
        borderRadius: 6,
        padding: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#1E5CC8',
        alignItems: 'center'
    },
    idText: {
        fontSize: 16,
        color: '#1E5CC8',
        fontWeight: '700'
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
    },
    botaoDesabilitado: {
        opacity: 0.7
    }
});
