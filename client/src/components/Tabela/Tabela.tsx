import { Badge } from "react-bootstrap";
import { interfaceTable } from "./TabelaInterface";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";

interface TabelaProps {
    coluna: interfaceTable[];
    dados: any;
    usaDelete?: boolean;
    deleteClick?: (dados: any) => void;
}

const Tabela: React.FC<TabelaProps> = ({
    coluna,
    dados,
    usaDelete = false,
    deleteClick = function () { }
}) => {
    const totalRenda = dados.reduce((acc: number, item: any) => {
        const rendaColuna = coluna.find((col) => col.titulo === 'Renda');
        if (rendaColuna) {
            const renda = parseFloat(item[rendaColuna.acesso]) || 0;
            return acc + renda;
        }
        return acc;
    }, 0);

    return (
        <>
            <div className="table-responsive">
                <table className="table table-centered w-100 dt-responsive nowrap table-striped table-hover">
                    <thead className="table-cabecalho">
                        <tr>
                            {coluna.map((item, index) => (
                                <th key={index}>{item.titulo}</th>
                            ))}
                            <th hidden={!usaDelete}>Ações</th>
                        </tr>
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
                                    <button className="icon-button" type="button" onClick={() => deleteClick(item)}>
                                        <Icon path={mdiDelete} size={1} />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        <tr>
                            <td style={{ fontWeight: 'bold', textAlign: 'left' }}>Total da Renda:</td>
                            <td style={{ fontWeight: 'bold', textAlign: 'left' }}>
                                <Badge bg="primary">{`R$ ${totalRenda.toFixed(2)}`}</Badge>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Tabela;
