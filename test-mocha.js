var assert = require('assert');
var chai = require('chai');
var nock = require('nock');
var soma = require('./soma');
var axios = require('axios').default;
var expect = chai.expect;

describe('Testes com valores', function() {
    describe('Testes estáticos de soma', function(){
        it('Deve retornar 1 + 1 como igual a 2', () => {
            assert.strictEqual(1 + 1, 2);
        });

        it('Deve retornar 1 + 1 como diferente de 7', () => {
            assert.notStrictEqual(1 + 1,9);
        });
    });

    describe('Testes de valor em array', () => {
        it('Deve retornar 3 como contido em [1,2,3,4,5]', () => {
            expect([1,2,3,4,5]).to.contain(3);
        });

        it('Não deve conter "TDD é Top" no array [6,7,8,9]', () => {
            expect([6,7,8,9]).to.not.contain("TDD é Top");
        });
    });

    describe('Testes de valor em objeto', () => {
        it('Objeto {attr1: 13} deve conter atributo attr1', () => {
            expect({ attr1 : 13 }).to.have.property("attr1");
        });
        it('Objeto {attr3: 13} não deve conter atributo attr3', () => {
            expect({ attr3: 13}).to.not.have.property("attr1");
        });
    });

    describe('Testes com regex em strings', () => {
        let string1 = 'Não existe concorrente com a investtools para a melhor empresa para se estagiar';
        let string2 = 'Investtools cuida melhor dos seus estagiários quea bloomberg'
        let string3 = 'Somos parte do Programa de Formação da Investtools';
        it('Deve conter regex /[investtools]/ na string1', () => {
            assert.match(string1,/([Investtools])/);
        });
        it('Deve conter regex /[investtools]/ na string2', () => {
            assert.match(string2,/([Investtools])/);
        });
        it('Deve conter regex /[investtools]/ na string3', () => {
            assert.match(string3,/([Investtools])/);
        });
    });

    describe('Testes com soma de valores', () => {
        it('Deve retornar 1 + 1 como igual a 2', () => {
            assert.strictEqual(soma(1,1),2);
        });
        it('Deve retornar 2 + 2 como igual a 4', () => {
            assert.strictEqual(soma(2,2),4);
        });
        it('Deve retornar 4 + 5 como igual a 9', () => {
            assert.strictEqual(soma(4,5),9);
        });
        it('Deve retornar 6 + 7 como igual a 13', () => {
            assert.strictEqual(soma(6,7),13);
        });
        it('Deve retornar 1 + 1 como igual a 2', () => {
            assert.strictEqual(soma(9,9),18);
        });
    });

    describe('Testes HTTP', () => {
        it('Requisição deve retornar atributo <body> do html do google', async () => {

            let googleResult = await axios.get("https://www.google.com/");

            expect(googleResult.data).to.include("<body");

        });


        // Finalizar essa parte
        it('Requisição deve retornar tag <body> to html do google em menos de 100ms', async () => {


            nock("https://www.google.com/")
                                .get('/').replyWithFile(200, './public/Google.html');

            
            let googleResult = await axios.get("https://www.google.com/");                  

            expect(googleResult.data).to.include("<body");
        });
    })
});