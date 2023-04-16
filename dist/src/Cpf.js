"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cpf {
    constructor(value) {
        if (!this.validate(value))
            throw new Error('Invalid cpf');
        this.value = value;
    }
    validate(rawCpf) {
        if (!rawCpf)
            return false;
        const cpf = this.clean(rawCpf);
        if (!this.isValidLength(cpf))
            return false;
        if (this.isBlocked(cpf))
            return false;
        const digit1 = this.calculateDigit(cpf, 10);
        const digit2 = this.calculateDigit(cpf, 11);
        const actualDigit = this.extractActualDigit(cpf);
        const calculatedDigit = `${digit1}${digit2}`;
        return actualDigit === calculatedDigit;
    }
    clean(cpf) {
        return cpf.replace(/[\.\-]*/g, "");
    }
    isValidLength(cpf) {
        return cpf.length === 11;
    }
    isBlocked(cpf) {
        const [firstDigit] = cpf;
        return [...cpf].every(digit => digit === firstDigit);
    }
    calculateDigit(cpf, factor) {
        let total = 0;
        for (const digit of cpf) {
            if (factor > 1) {
                total += parseInt(digit) * factor--;
            }
        }
        const rest = total % 11;
        return (rest < 2) ? 0 : 11 - rest;
    }
    extractActualDigit(cpf) {
        return cpf.slice(9);
    }
}
exports.default = Cpf;
