export default class OrderCode {
    readonly value: string;

    constructor(readonly date: Date, readonly sequence: number) {
        this.value = this.generateCode(date, sequence)
    }
    
    generateCode(date: Date, sequence: number) {
        const year = date.getFullYear();
        return `${year}${sequence.toString().padStart(8, "0")}`; 
    }
}