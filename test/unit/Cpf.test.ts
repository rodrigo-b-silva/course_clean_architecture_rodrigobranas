import Cpf from "../../src/domain/entity/Cpf";

test("Deve validar um CPF válido", function () {
	expect(() => new Cpf("357.188.378-05")).toBeTruthy();
});

test("Não deve validar o cpf (todos os números iguais)", function () {
	expect(() => new Cpf("111.111.111-11")).toThrow(new Error('Invalid cpf'));
});

test("Não deve validar o cpf (número aleatório)", function () {
  expect(() => new Cpf("123.456.789-00")).toThrow(new Error('Invalid cpf'));
});

test("Não deve validar o cpf (além do limite)", function () {
	expect(() => new Cpf("123.456.789-00000000")).toThrow(new Error('Invalid cpf'));
});

test("Não deve validar o cpf (abaixo do limite)", function () {
	expect(() => new Cpf("123456789")).toThrow(new Error('Invalid cpf'));
});

test("Não deve validar o cpf com letras", function () {
  expect(() => new Cpf("987a654b321c00")).toThrow(new Error('Invalid cpf'));
});