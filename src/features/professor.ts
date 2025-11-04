import { supabase } from "../../supabase";
import { Resultado, Status } from "./result";

export default class Professor {
    public uid: string
    public nome: string;
    public email: string;

    private constructor(uid: string, nome: string, email: string) {
        this.nome = nome;
        this.email = email;
        this.uid = uid;
    }

    private static _professor: Professor | undefined;

    private static get professor() { return this._professor; }

    public static async entrar(email: string, senha: string): Promise<Resultado<Professor>> {
        email = email.trim();
        senha = senha.trim();

        const camposVazios = [];
        if (!email) camposVazios.push("e-mail");
        if (!senha) camposVazios.push("senha");

        if (camposVazios.length > 0) {
            return {
                status: Status.erro,
                mensagem: `Campos vazios: ${camposVazios.join(", ")}`,
            };
        }

        if (!email.includes("@")) {
            return {
                status: Status.erro,
                mensagem: "E-mail inválido",
            };
        }

        const authResponse = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        });

        if (authResponse.error) {
            return {
                status: Status.erro,
                mensagem: authResponse.error.message,
            };
        }

        const uid = authResponse.data.user?.id;

        if (uid) {
            const tupla = await supabase.from("usuarios").select("*").eq("id", uid).single();

            const professor = new Professor(uid, tupla.data.nome, email);
            this._professor = professor;
            return {
                status: Status.okay,
                resultado: professor,
            }
        }

        throw Error("Erro desconhecido ao entrar");
    }

    public static async cadastrar(nome: string, email: string, senha: string): Promise<Resultado<Professor>> {
        nome = nome.trim();
        email = email.trim();
        senha = senha.trim();

        const camposVazios = [];
        if (!nome) camposVazios.push("nome");
        if (!email) camposVazios.push("e-mail");
        if (!senha) camposVazios.push("senha");

        if (camposVazios.length > 0) {
            return {
                status: Status.erro,
                mensagem: `Campos vazios: ${camposVazios.join(", ")}`,
            };
        }

        if (!email.includes("@")) {
            return {
                status: Status.erro,
                mensagem: "E-mail inválido",
            };
        }

        const authResponse = await supabase.auth.signUp({
            email: email,
            password: senha,
        });

        if (authResponse.error) {
            return {
                status: Status.erro,
                mensagem: authResponse.error.message,
            }
        }

        const uid = authResponse.data.user?.id;

        if (uid) {
            const { error: insertError } = await supabase.from("usuarios").insert({
                id: uid,
                nome: nome,
            });
            if (insertError) {
                return {
                    status: Status.erro,
                    mensagem: insertError.message,
                }
            }
            const professor = new Professor(uid, nome, email);
            this._professor = professor;
            return {
                status: Status.okay,
                resultado: professor,
            }
        }

        throw Error("Erro desconhecido ao cadastrar");
    }

    public static async sair() {
        this._professor = undefined;
        const result = await supabase.auth.signOut();
        
        if (result.error) {
            return {
                status: Status.erro,
                mensagem: result.error.message,
            };
        }

        return {
            status: Status.okay,
        };
    }
}