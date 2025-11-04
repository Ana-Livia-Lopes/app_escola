import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native"
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import React from "react";
import { NativeStackNavigationOptions, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Autenticacao from "../screens/Autenticacao";
import CadastroAtividade from "../screens/CadastroAtividade";
import CadastroTurma from "../screens/CadastroTurma";
import Inicio from "../screens/Inicio";
import ListarAtividades from "../screens/ListarAtividades";
import CadastroProfessor from "../screens/CadastroProfessor";

type NativeStackNavigationOptionsCallback = (props: {
    route: RouteProp<ParamListBase, "Cadastro">;
    navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
    theme: ReactNavigation.Theme;
}) => NativeStackNavigationOptions | undefined;

type NavigationParameterItem<P extends ScreenNames> = NavigationParameter<P> & NavigationParameter

export interface ParamItem<P extends ScreenNames, T = undefined> {
    component: React.ComponentType<NavigationParameterItem<P>>,
    // params: T,
    options?: NativeStackNavigationOptions
        | DrawerNavigationOptions
        | NativeStackNavigationOptionsCallback
        | undefined
}

class Screens {
    private constructor() {}

    Inicio: ParamItem<"Inicio"> = { 
        component: Inicio,
        options: {
            title: "Início",
            
        }
    };
    Autenticacao: ParamItem<"Autenticacao"> = {
        component: Autenticacao,
        options: {
            drawerItemStyle: { display: "none" },
            title: "Entrar",
            headerLeft: () => null
        }
    };
    CadastroAtividade: ParamItem<"CadastroAtividade"> = {
        component: CadastroAtividade,
        options: {
            title: "Cadastrar Atividade"
        }
    };
    CadastroTurma: ParamItem<"CadastroTurma"> = {
        component: CadastroTurma,
        options: {
            title: "Cadastrar Turma"
        }
    };
    CadastroProfessor: ParamItem<"CadastroProfessor"> = {
        component: CadastroProfessor,
        options: {
            title: "Cadastrar Professor"
        }
    };
    ListarAtividades: ParamItem<"ListarAtividades"> = {
        component: ListarAtividades,
        options: {
            drawerItemStyle: { display: "none" },
            title: "Listar Atividades"
        }
    };

    static readonly instance = new Screens();
}

export const screens = Screens.instance;

export type ScreenNames = keyof Screens;

export type RootStackParamList = {
    [K in keyof Screens]: Screens[K] extends ParamItem<K, infer T> ? T : undefined;
}

export interface NavigationParameter<N extends ScreenNames | undefined = undefined> {
    navigation: NavigationProp<RootStackParamList>,
    route: N extends ScreenNames ? RouteProp<RootStackParamList, N> : RouteProp<RootStackParamList>
}