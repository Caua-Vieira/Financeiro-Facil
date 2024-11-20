import { Avatar, IconButton, Stack } from "@mui/material"
import { Col, Row } from "react-bootstrap"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useState } from "react";

function Perfil() {

    const [avatar, setAvatar] = useState<string>("")
    const [nomeUsuario, setNomeUsuario] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [dataNascimento, setDataNascimento] = useState<string>()
    const [endereco, setEndereco] = useState<string>()
    const [numero, setNumero] = useState<string>()
    const [cep, setCep] = useState<string>()
    const [genero, setGenero] = useState<string>()
    const [biografia, setBiografia] = useState<string>()

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
                                onChange={(e) => setNomeUsuario}
                            />
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="form-group">
                            <label className="text-light">E-mail</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="E-mail do usuário"
                                style={{
                                    backgroundColor: '#2E3440',
                                    color: '#ecf0f1',
                                    border: '1px solid #495057',
                                    borderRadius: '5px'
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>
                    </Col>

                    <Col md={9} className="mt-3">
                        <div className="form-group">
                            <label className="text-light">Biografia</label>
                            <textarea
                                className="form-control"
                                placeholder="Fale um pouco sobre você"
                                style={{
                                    backgroundColor: '#2E3440',
                                    color: '#ecf0f1',
                                    border: '1px solid #495057',
                                    borderRadius: '5px'
                                }}
                                value={biografia}
                                onChange={(e) => setBiografia(e.target.value)}
                            ></textarea>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col md={5}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            {avatar ? (
                                <Avatar
                                    src={`data: image / png;base64,${avatar || null}`}
                                    alt="Avatar"
                                    sx={{ width: 240, height: 240 }}
                                />
                            ) : (
                                <Avatar
                                    src={""}
                                    alt="Avatar"
                                    sx={{ width: 240, height: 240 }}
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                id="avatar-input"
                                // onChange={handleAvatarChange}
                                style={{ display: "none" }}
                            />
                            <label htmlFor="avatar-input">
                                <IconButton color="primary" component="span">
                                    <PhotoCameraIcon />
                                </IconButton>
                            </label>
                            {avatar && (
                                <button
                                    // onClick={handleRemoveAvatar}
                                    className="btn btn-outline-secondary"
                                >
                                    Remover Avatar
                                </button>
                            )}
                        </Stack>
                    </Col>
                </Row>

                <Row className="mt-4 d-flex justify-content-end ">
                    <Col md={2} >
                        <button
                            className="btn btn-primary me-2 w-100"
                            onClick={() => console.log("Salvar clicado")}
                        >
                            Salvar
                        </button>
                    </Col>

                    <Col md={2}>
                        <button
                            className="btn btn-secondary w-100"
                            onClick={() => console.log("Cancelar clicado")}
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