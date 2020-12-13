import React from 'react';

export default class HoursTable extends React.Component {

    render() {
        return (
            <div className="columns">
                <div className="column is-2">

                </div>
                <div className="column is-8 mt-4">
                    <table className="table is-fullwidth is-striped">
                        <thead>
                        <tr>
                            <th className="is-link is-vcentered"><abbr title="Modalidade">Modalidade</abbr></th>
                            <th className="is-link is-vcentered"><abbr title="Atividade">Atividade</abbr></th>
                            <th className="is-link"><abbr title="Carga Horária Equivalente">Carga Horária
                                Equivalente</abbr></th>
                            <th className="is-link is-vcentered"><abbr title="Documentação exigida">Documentação
                                exigida</abbr></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th rowSpan="8" className="is-primary is-vcentered">ENSINO</th>
                            <td><strong>Aula inaugural</strong></td>
                            <td>4h</td>
                            <td>Lista de presença</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Unidade Curricular não prevista na organização
                                curricular do curso</strong></td>
                            <td className="is-vcentered">Carga horária total da UC, máximo 50h</td>
                            <td className="is-vcentered">Atestado de aprovação fornecido pela Instituição</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Monitoria acadêmica</strong></td>
                            <td className="is-vcentered">Carga horária total da Monitoria, Máximo 40h</td>
                            <td className="is-vcentered">Declaração da Instituição</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Visita técnica</strong></td>
                            <td className="is-vcentered">4h por visita, máximo 20h</td>
                            <td className="is-vcentered">Lista de presença organizada pelo Professor Responsável e
                                Relatório de Visita
                            </td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Visita em feiras</strong></td>
                            <td className="is-vcentered">4h por visita, máximo 20h</td>
                            <td className="is-vcentered">Lista de presença organizada pelo Professor Responsável e
                                Relatório de Visita
                            </td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Ministrante de curso</strong></td>
                            <td className="is-vcentered">Carga horária total do Curso ministrado, máximo 30h</td>
                            <td className="is-vcentered">Declaração da Instituição onde ministrou curso e Plano dos conteúdos ministrados</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Participação em palestra</strong></td>
                            <td className="is-vcentered">3h por palestra</td>
                            <td className="is-vcentered">Declaração</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Participação em Projetos Integradores</strong></td>
                            <td className="is-vcentered">20h, máximo 1 projeto</td>
                            <td className="is-vcentered">Declaração e Relatório</td>
                        </tr>
                        <tr>
                            <th rowSpan="5" className="is-warning is-vcentered">PESQUISA</th>
                            <td className="is-vcentered"><strong>Participação em Projeto de Pesquisa ou Iniciação Científica</strong> <br/> (Bolsista)</td>
                            <td className="is-vcentered">Máximo 40h</td>
                            <td className="is-vcentered">Declaração e Relatório</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Apresentação oral ou na forma de pôster de trabalhos em eventos técnicos</strong> <br/>(congresso, seminário, simpósio)</td>
                            <td className="is-vcentered">40h por evento</td>
                            <td className="is-vcentered">Certificado ou Declaração de apresentação</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Publicação de artigo técnico-científico completo</strong><br/> (anais, revistas especializadas)</td>
                            <td className="is-vcentered">40h por artigo</td>
                            <td className="is-vcentered">Cópia da publicação</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Publicação de resumo técnico-científico</strong><br/> (anais, revistas especializadas)</td>
                            <td className="is-vcentered">40h por resumo</td>
                            <td className="is-vcentered">Cópia da publicação</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Autoria ou co-autoria em capitulo de livro</strong></td>
                            <td className="is-vcentered">40h</td>
                            <td className="is-vcentered">Cópia da publicação</td>
                        </tr>
                        <tr>
                            <th rowSpan="13" className="is-info is-vcentered">EXTENSÃO</th>
                            <td className="is-vcentered"><strong>Estágio não obrigatório</strong></td>
                            <td className="is-vcentered">50h por estágio, máximo 50h</td>
                            <td className="is-vcentered">Declaração da Instituição estagiada e Relatório de Estágio</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Participação e organização de eventos</strong></td>
                            <td className="is-vcentered">5h por evento, máximo 10h</td>
                            <td className="is-vcentered">Certificado ou Declaração de Participação</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Participação em congresso</strong></td>
                            <td className="is-vcentered">10 h por dia</td>
                            <td className="is-vcentered">Certificado</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Participação em seminários, simpósios, workshops, fóruns ou mesas redondas</strong></td>
                            <td className="is-vcentered">5h por dia</td>
                            <td className="is-vcentered">Certificado</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Participação em cursos e minicursos de extensão ou atualização profissional</strong></td>
                            <td className="is-vcentered">De acordo com a carga horária de duração do curso, máximo 40h</td>
                            <td className="is-vcentered">Certificado</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Participação em pré-incubadora </strong></td>
                            <td className="is-vcentered">30 h</td>
                            <td className="is-vcentered">Certificado ou Declaração</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Representação acadêmica </strong> <br/>(Colegiado do Curso, Conselho Superior da Faculdade, CPA, Comissão permanente de seleção e acompanhamento do FIES, Comissões para bolsa de estudo e pesquisa do Art. 170)</td>
                            <td className="is-vcentered">10h por semestre, máximo 20h</td>
                            <td className="is-vcentered">Declaração da Instituição de Ensino</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Representação Estudantil</strong></td>
                            <td className="is-vcentered">5h por semestre, máximo 10h</td>
                            <td className="is-vcentered">Declaração</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Representante de turma</strong></td>
                            <td className="is-vcentered">5h por semestre, máximo 20h</td>
                            <td className="is-vcentered">Declaração da Instituição de Ensino</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Curso de língua estrangeira</strong></td>
                            <td className="is-vcentered">10h por semestre, máximo 40h </td>
                            <td className="is-vcentered">Declaração</td>
                        </tr>
                        <tr>
                            <td className="is-vcentered"><strong>Trabalho voluntário</strong></td>
                            <td className="is-vcentered">5h por trabalho, máximo 40h</td>
                            <td className="is-vcentered">Declaração da Instituição do voluntariado</td>
                        </tr>

                        <tr>
                            <td className="is-vcentered"><strong>Presença como ouvinte em bancas de defesa de
                                Trabalho de Conclusão de Curso</strong><br/>(Graduação e Pós Graduação)</td>
                            <td className="is-vcentered">2h por banca de defesa, máximo 10h </td>
                            <td className="is-vcentered">Lista de Presença, Declaração da Instituição</td>
                        </tr>

                        <tr>
                            <td className="is-vcentered"><strong> Certificação de mercado na área do curso</strong></td>
                            <td className="is-vcentered">20h por certificação</td>
                            <td className="is-vcentered">Certificado</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
