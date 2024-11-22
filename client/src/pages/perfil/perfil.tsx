import { Avatar, IconButton, Stack } from "@mui/material"
import { Col, Row } from "react-bootstrap"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Perfil() {

    const [avatar, setAvatar] = useState<string | null>()
    const [nomeUsuario, setNomeUsuario] = useState<string>()
    const [profissao, setProfissao] = useState<string>()
    const [dataNascimento, setDataNascimento] = useState<string>()
    const [endereco, setEndereco] = useState<string>()
    const [numero, setNumero] = useState<string>()
    const [cep, setCep] = useState<string>()
    const [genero, setGenero] = useState<string>()
    const [perfilFinanceiro, setPerfilFinanceiro] = useState<string>()

    const idUsuario = sessionStorage.getItem("idUsuario")

    const navigate = useNavigate()

    async function atualizarPerfil() {
        await axios.put(`http://localhost:8000/atualizarPerfil`, {
            idUsuario,
            avatar,
            nomeUsuario,
            profissao,
            dataNascimento,
            endereco,
            numero,
            cep,
            genero,
            perfilFinanceiro
        })
            .then(function (resposta) {
                toast.success(resposta.data.message)
            }).catch(function (erro) {
                toast.error(erro.response.data.message)
            })
    }

    async function carregarDados() {
        await axios.get(`http://localhost:8000/carregarDados/perfil/${idUsuario}`)
            .then(function (resposta) {
                setNomeUsuario(resposta.data.data[0].nome)
                setProfissao(resposta.data.data[0].profissao)
                setDataNascimento((resposta.data.data[0].data_nascimento).split('T')[0])
                setEndereco(resposta.data.data[0].endereco)
                setNumero(resposta.data.data[0].telefone)
                setCep(resposta.data.data[0].cep)
                setGenero(resposta.data.data[0].genero)
                setPerfilFinanceiro(resposta.data.data[0].perfil_financeiro)
                setAvatar(resposta.data.data[0].avatar)
            }).catch(function (erro) {
                toast.error(erro.response.data.message)
            })
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {

                    const base64String = reader.result.split(",")[1]; // Remove o prefixo `data:image/...`
                    console.log(base64String)
                    setAvatar(base64String);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarRemove = () => {
        setAvatar(null)
    };

    useEffect(() => {
        carregarDados()
    }, [])

    return (
        <>
            <h2 className='text-white m-3 '>Perfil</h2>
            <div className="p-4 interface-padrao rounded">
                <Row>
                    <Col md={4}>
                        <div className="form-group">
                            <label className="text-light">Nome Usuário</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome de usuário"
                                value={nomeUsuario}
                                style={{
                                    backgroundColor: '#2E3440',
                                    color: '#ecf0f1',
                                    border: '1px solid #495057',
                                    borderRadius: '5px'
                                }}
                                onChange={(e) => setNomeUsuario(e.target.value)}
                            />
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="form-group">
                            <label className="text-light">Profissão</label>
                            <input
                                type="profissao"
                                className="form-control"
                                placeholder="E-mail do usuário"
                                style={{
                                    backgroundColor: '#2E3440',
                                    color: '#ecf0f1',
                                    border: '1px solid #495057',
                                    borderRadius: '5px'
                                }}
                                value={profissao}
                                onChange={(e) => setProfissao(e.target.value)}
                            />
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="form-group">
                            <label className="text-light">Data de Nascimento</label>
                            <input
                                type="date"
                                className="form-control"
                                style={{
                                    backgroundColor: '#2E3440',
                                    color: '#ecf0f1',
                                    border: '1px solid #495057',
                                    borderRadius: '5px'
                                }}
                                value={dataNascimento}
                                onChange={(e) => setDataNascimento(e.target.value)}
                            />
                        </div>
                    </Col>
                </Row>

                <Row className="mt-3">

                    <Col md={4}>
                        <div className="form-group">
                            <label className="text-light">Endereço</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Rua, Número, Bairro, Cidade"
                                style={{
                                    backgroundColor: '#2E3440',
                                    color: '#ecf0f1',
                                    border: '1px solid #495057',
                                    borderRadius: '5px'
                                }}
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                            />
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="form-group">
                            <label className="text-light">Número de Telefone</label>
                            <input
                                type="tel"
                                className="form-control"
                                placeholder="(00) 00000-0000"
                                style={{
                                    backgroundColor: '#2E3440',
                                    color: '#ecf0f1',
                                    border: '1px solid #495057',
                                    borderRadius: '5px'
                                }}
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                            />
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="form-group">
                            <label className="text-light">CEP</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="00000-000"
                                style={{
                                    backgroundColor: '#2E3440',
                                    color: '#ecf0f1',
                                    border: '1px solid #495057',
                                    borderRadius: '5px'
                                }}
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                            />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={3} className="mt-3">
                        <div className="form-group">
                            <label className="text-light">Gênero</label>
                            <select
                                className="form-control"
                                style={{
                                    backgroundColor: '#2E3440',
                                    color: '#ecf0f1',
                                    border: '1px solid #495057',
                                    borderRadius: '5px'
                                }}
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                            >
                                <option value="masculino">Selecione...</option>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>
                    </Col>

                    <Col md={9} className="mt-3">
                        <div className="form-group">
                            <label className="text-light">Conte um pouco sobre seu perfil financeiro</label>
                            <textarea
                                className="form-control"
                                placeholder="Fale um pouco sobre você"
                                style={{
                                    backgroundColor: '#2E3440',
                                    color: '#ecf0f1',
                                    border: '1px solid #495057',
                                    borderRadius: '5px'
                                }}
                                value={perfilFinanceiro}
                                onChange={(e) => setPerfilFinanceiro(e.target.value)}
                            ></textarea>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col md={5}>
                        <div className="d-flex align-items-center">
                            <Avatar
                                src={avatar ? `data:image/jpeg;base64,${avatar}` : ""}
                                alt="Avatar"
                                sx={{ width: 240, height: 240 }}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                id="avatar-input"
                                onChange={handleAvatarChange}
                                style={{ display: "none" }}
                            />
                            <label htmlFor="avatar-input">
                                <IconButton color="primary" component="span">
                                    <PhotoCameraIcon />
                                </IconButton>
                            </label>
                            {avatar && (
                                <button
                                    onClick={handleAvatarRemove}
                                    className="btn btn-outline-secondary"
                                    style={{ marginLeft: "10px" }}
                                >
                                    Remover Avatar
                                </button>
                            )}
                        </div>
                    </Col>
                </Row>

                <Row className="mt-4 d-flex justify-content-end ">
                    <Col md={2} >
                        <button
                            className="btn btn-primary me-2 w-100"
                            onClick={atualizarPerfil}
                        >
                            Salvar
                        </button>
                    </Col>

                    <Col md={2}>
                        <button
                            className="btn btn-secondary w-100"
                            onClick={() => navigate("/main/dashboard")}
                        >
                            Cancelar
                        </button>
                    </Col>
                </Row>
            </div >
        </>
    );
}

export default Perfil