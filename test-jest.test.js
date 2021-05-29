const soma = require('./soma');
const axios = require('axios');
var nock = require('nock');

test('Deve retornar 1 + 1 = 2', () => {
    expect(1 + 1).toBe(2);
});

test('Deve retornar 1 + 1 como diferente de 7', () => {
    expect(1 + 1).not.toBe(7);
});

describe('Testes de valor em array', () => {
    test('Deve retornar 3 como contido em [1,2,3,4,5]', () => {
        expect([1,2,3,4,5]).toContain(3);
    });

    test('Não deve conter "TDD é Top" no array [6,7,8,9]', () => {
        expect([6,7,8,9]).not.toContain("TDD é Top");
    });
});

describe('Testes de objeto.', () => {
    test('Objeto {attr1: 13} deve conter atributo attr1', () => {
        expect({attr1:13}).toHaveProperty('attr1')
    });
    
    test('Objeto {attr3: 13} não deve conter atributo attr1', () => {
        expect({attr3: 13}).not.toHaveProperty('attr1');
    });
});

describe('Match entre regex /([Investtools])/ e as string deve ocorrer', () => {
        let string1 = 'Não existe concorrente com a investtools para a melhor empresa para se estagiar';
        let string2 = 'Investtools cuida melhor dos seus estagiários quea bloomberg';
        let string3 = 'Somos parte do Programa de Formação da Investtools';

        test('Teste da string1', () => {
            expect(string1).toMatch(/([Investools])/);
        });
        test('Teste da string2', () => {
            expect(string2).toMatch(/([Investools])/);
        });
        test('Teste da string3', () => {
            expect(string3).toMatch(/([Investools])/);
        });
});

describe('Verificar funcao de soma.', () => {
    test('Deve retornar 1 + 1 = 2', () => {
        expect(soma(1,1)).toBe(2);
    });
    test('Deve retornar 2 + 2 = 4', () => {
        expect(soma(2,2)).toBe(4);
    });
    test('Deve retornar 4 + 5 = 9', () => {
        expect(soma(4,5)).toBe(9);
    });
    test('Deve retornar 6 + 7 = 13', () => {
        expect(soma(6,7)).toBe(13);
    });
    test('Deve retornar 9 + 9 = 18', () => {
        expect(soma(9,9)).toBe(18);
    });
});

describe('Testes de requisição.', () => {
    test('Verifica que o html da página do google contem a tag body', async() => {
        let googleResult = await axios.get("https://www.google.com/");

        expect(googleResult.data).toContain("<body");
    });
    test('Verifica que o html da página do google contem a tag body em menos de 100ms.', async() => {

        nock("https://www.google.com/")
                                .get('/').replyWithFile(200, './public/Google.html');

        let googleResult = await axios.get("https://www.google.com/");

        expect(googleResult.data).toContain("<body");
    });
});