import Professor from "./professor";

export default class Turma {
    public id: number;
    public nome: string;
    public disciplina: string;
    public tag: string;
    public descricao: string;
    public professor: Professor;

    private constructor(id: number, nome: string, disciplina: string, tag: string, descricao: string, professor: Professor) {
        this.id = id;
        this.nome = nome;
        this.disciplina = disciplina;
        this.tag = tag;
        this.descricao = descricao;
        this.professor = professor;
    }

    public async editar(nome: string | undefined, disciplina: string | undefined, tag: string | undefined, descricao: string | undefined) {}

    public async excluir() {}

    public static async listar() {}

    public static async criar(nome: string, disciplina: string, tag: string, descricao: string) {}
}