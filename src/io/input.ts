import promptSync from "prompt-sync";

export default class Input {
    public receiveNumber(message: string): number {
        let prompt = promptSync();
        let value = prompt(message);
        let number = new Number(value);
        return number.valueOf()
    }
    public receiveText(message: string): string {
        let prompt = promptSync();
        let text = prompt(message);
        return text
    }
}