import { Avatar, IconButton, Stack } from "@mui/material"
import { Col, Row } from "react-bootstrap"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useState } from "react";

function Perfil() {

    const [avatar, setAvatar] = useState<string>("")

    return (
        <>
            <h2 className='text-white m-3 '>Perfil</h2>
            <div
                className="p-4 interface-padrao rounded"
            >

                <Row>
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

                    <Col md={4}>
                        <div className="form-group">
                            <label className="text-light">Nome Usuário</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome de usuário"
                                style={{
                                    backgroundColor: '#2E3440',
                                    color: '#ecf0f1',
                                    border: '1px solid #495057',
                                    borderRadius: '5px'
                                }}
                            // value={fonteRenda}
                            // onChange={(e) => setFonteRenda(e.target.value)}
                            />
                        </div>
                    </Col>

                    <Col md={3}>
                        <div className="form-group">
                            <label className="text-light">E-mail</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="E-mail do usuário"
                                style={{
                                    backgroundColor: '#2E3440',
                                    color: '#ecf0f1',
                                    border: '1px solid #495057',
                                    borderRadius: '5px'
                                }}
                            // value={fonteRenda}
                            // onChange={(e) => setFonteRenda(e.target.value)}
                            />
                        </div>
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default Perfil