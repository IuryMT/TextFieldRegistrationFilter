import { Input } from 'antd';
import React, { useState } from 'react';

export function InputMasc(e) {

    const [complet, setComplet] = useState('');

    const handleComplet = (e) => {

        let inputValue = e.currentTarget.value;
        let inputSize = inputValue.length;

        const Cpf_validation = (inputSize) => {
            if (inputSize === 0) return false;

            // Elimina Cpfs inválidos conhecidos	
            if (inputSize != 11 ||
                inputValue == "00000000000" ||
                inputValue == "11111111111" ||
                inputValue == "22222222222" ||
                inputValue == "33333333333" ||
                inputValue == "44444444444" ||
                inputValue == "55555555555" ||
                inputValue == "66666666666" ||
                inputValue == "77777777777" ||
                inputValue == "88888888888" ||
                inputValue == "99999999999") {
                return false;
            }
            // Valida 1º digito, soma os números até a penultima casa, e verifica a condição com último caractere
            let i = 0;
            let add = 0;
            for (i = 0; i < 9; i++) add += parseInt(inputValue.charAt(i)) * (10 - i);

            let rev = 11 - (add % 11);
            if (rev === 10 || rev === 11)
                rev = 0;
            if (rev != parseInt(inputValue.charAt(9))) {
                return false;
            }

            // Valida 2º dígito, soma todos os números, verifica com penúltimo caractere
            add = 0;
            for (i = 0; i < 10; i++)
                add += parseInt(inputValue.charAt(i)) * (11 - i);
            rev = 11 - (add % 11);
            if (rev === 10 || rev === 11)
                rev = 0;
            if (rev != parseInt(inputValue.charAt(10))) return false;
            else {
                return true;
            }

        }

        const phone_validation = (inputSize) => {
            // Retira todos os caracteres menos os números 
            inputValue = inputValue.replace(/\D/g, '');
            // Verifica se tem a quantidade de números correta
            if (!(inputSize >= 10 && inputSize <= 11)) return false;

            // Se tiver 11 caracteres, verificar se começa com 9 o celular
            if (inputSize == 11 && parseInt(inputValue
                .substring(2, 3)) != 9) return false;

            // Verifica se não é nenhum número digitado errado (propositalmente)
            for (var n = 0; n < 10; n++) {
                if (inputValue == new Array(11).join(n) || inputValue
                    == new Array(12).join(n)) return false;
            }
            //DDDs validos
            var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
                21, 22, 24, 27, 28, 31, 32, 33, 34,
                35, 37, 38, 41, 42, 43, 44, 45, 46,
                47, 48, 49, 51, 53, 54, 55, 61, 62,
                64, 63, 65, 66, 67, 68, 69, 71, 73,
                74, 75, 77, 79, 81, 82, 83, 84, 85,
                86, 87, 88, 89, 91, 92, 93, 94, 95,
                96, 97, 98, 99];
            // verifica se o DDD é valido
            if (codigosDDD.indexOf(parseInt(inputValue
                .substring(0, 2))) == -1) return false;

            //  Verifica se o numero é realmente válido.
            if (new Date().getFullYear() < 2017) return true;
            if (inputSize == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(inputValue
                .substring(2, 3))) == -1) return false;

            return true;
        }

        const isNumber = (inputValue) => {
            return !isNaN(parseFloat(inputValue)) && isFinite(inputValue);
        }


        if (inputSize === 11 && (/[a-zA-Z]/).test(inputValue) === false) {


            if (phone_validation(inputSize) === true) {
                let value = e.currentTarget.value;
                value = value.replace(/^(\d{0})(\d{2})(\d{1})(\d{4})(\d{4})/, "$1($2) $3 $4-$5")
                e.currentTarget.value = value;
            }

            else if (Cpf_validation(inputSize) === true) {
                let value = e.currentTarget.value;
                value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
                e.currentTarget.value = value;
            }

        }
        else {
            
            if ((/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(inputValue) === true) {
                let car_replaced = inputValue.replace(/(\.)|(\/)|(\-)/g, '')
                e.currentTarget.value = car_replaced;
            }
            else {
                let car_replaced = inputValue.replace(/\D/g, '')
                if (car_replaced.length === 14) {
                    car_replaced = car_replaced.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
                    e.currentTarget.value = car_replaced;
                    e.currentTarget.maxLength = 14;
                }
            }
        }
    }


    return (
        <>
            <Input placeholder='Cpf, Email, Telefone ou CNPJ' onKeyUp={handleComplet} value={complet} onChange={(event) => setComplet(event.target.value)} />
        </>
    )

}
