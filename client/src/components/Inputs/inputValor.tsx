import React from 'react';
import { NumericFormat } from 'react-number-format';

interface InputValorProps {
    valor: number | string;
    setValor: (value: number | string) => void;
}

const InputValor: React.FC<InputValorProps> = ({ valor, setValor }) => {
    return (
        <div className="form-group mt-3">
            <label className="text-light">Valor</label>
            <NumericFormat
                className="form-control"
                placeholder="Insira sua despesa"
                style={{
                    backgroundColor: '#2E3440',
                    color: '#ecf0f1',
                    border: '1px solid #495057',
                    borderRadius: '5px',
                }}
                value={valor}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                onValueChange={(values) => {
                    const { floatValue } = values;
                    setValor(floatValue!);
                }}
            />
        </div>
    );
};

export default InputValor;
