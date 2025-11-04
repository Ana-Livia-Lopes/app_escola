import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native"
import React from "react";
import { NativeStackNavigationOptions, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Autenticacao from "../screens/Autenticacao";
import CadastroAtividade from "../screens/CadastroAtividade";
import CadastroTurma from "../screens/CadastroTurma";
import Inicio from "../screens/Inicio";
import ListarAtividades from "../screens/ListarAtividades";
import ListarTurmas from "../screens/ListarTurmas";

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
        | NativeStackNavigationOptionsCallback
        | undefined
}

class Screens {
    private constructor() {}

    Inicio: ParamItem<"Inicio"> = { component: Inicio };
    Autenticacao: ParamItem<"Autenticacao"> = { component: Autenticacao };
    CadastroAtividade: ParamItem<"CadastroAtividade"> = { component: CadastroAtividade };
    CadastroTurma: ParamItem<"CadastroTurma"> = { component: CadastroTurma };
    ListarAtividades: ParamItem<"ListarAtividades"> = { component: ListarAtividades }
    ListarTurmas: ParamItem<"ListarTurmas"> = { component: ListarTurmas }

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