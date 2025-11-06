import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationParameter } from "../features/navigation";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../supabase';

export default function CadastroAtividade({ navigation, route }: NavigationParameter<"CadastroAtividade">) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [entrega, setEntrega] = useState('');
    const [loading, setLoading] = useState(false);

    const cadastrar = async () => {
        if (!titulo.trim() || !descricao.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
            return;
        }

        const turmaId = (route?.params as any)?.turmaId;
        if (!turmaId) {
            Alert.alert('Erro', 'Turma não especificada');
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.from('atividades').insert({
                titulo,
                descricao,
                data_de_entrega: entrega,
                turma: turmaId
            });

            if (error) throw error;

            Alert.alert('Sucesso', 'Atividade cadastrada com sucesso!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error: any) {
            Alert.alert('Erro', error.message || 'Não foi possível cadastrar a atividade');
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
                    
                    <Text style={styles.titulo}>Nova Atividade</Text>

                    <Text style={styles.label}>Título da Atividade</Text>
                    <TextInput
                        placeholder="Digite o título da atividade"
                        style={styles.input}
                        value={titulo}
                        onChangeText={setTitulo}
                    />

                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        placeholder="Digite a descrição da atividade"
                        style={[styles.input, styles.textArea]}
                        multiline={true}
                        numberOfLines={4}
                        textAlignVertical="top"
                        value={descricao}
                        onChangeText={setDescricao}
                    />

                    <Text style={styles.label}>Data de Entrega</Text>
                    <TextInput
                        placeholder="Digite a data de entrega"
                        style={styles.input}
                        value={entrega}
                        onChangeText={setEntrega}
                    />


                    <TouchableOpacity style={styles.BotaoCadastrar} onPress={cadastrar}>
                        <Text style={styles.txtBotaoCadastrar}>Criar Atividade</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.BotaoCancelar} onPress={cancelar}>
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
    textArea: {
        height: 100,
        textAlignVertical: 'top'
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