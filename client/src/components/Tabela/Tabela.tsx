import { Badge } from "react-bootstrap";
import { interfaceTable } from "./TabelaInterface";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";

interface TabelaProps {
    coluna: interfaceTable[];
    dados: any;
    usaDelete?: boolean
    deleteClick?: (dados: any) => void
}

const Tabela: React.FC<TabelaProps> = ({
    coluna,
    dados,
    usaDelete = false,
    deleteClick = function () { }
}) => {

    return (
        <>
            <div className="table-responsive">
                <table className="table table-centered w-100 dt-responsive nowrap table-striped table-hover">
                    <thead className="table-cabecalho">
                        {coluna.map((item, index) => (
                            <th key={index}>{item.titulo}</th>
                        ))}
                        <th hidden={!usaDelete}>Ações</th>
                    </thead>
                    <tbody>
                        {dados.map((item: any, index: any) => (
                            <tr key={index}>

                                {coluna.map((coluna, index) => (
                                    <td key={index}>

                                        {coluna.titulo === 'Renda' ? (
                                            <Badge bg="success">{`R$ ${item[coluna.acesso]}`}</Badge>
                                        ) : (
                                            item[coluna.acesso]
                                        )}

                                    </td>
                                ))}
                                <td hidden={!usaDelete}>
                                    <button type="button">
                                        <Icon path={mdiDelete} size={1} />Excluir
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Tabela