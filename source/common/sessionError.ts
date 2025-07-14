export default class NotSessionError extends Error {
    constructor(){
        super("No hay una sesión iniciada");
    }
}