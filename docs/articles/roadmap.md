# Roadmap
Estas son algunas de las funciones que se esperan inmplementar en un futuro.
- [x] Fetch general para solicitudes al API de Leo
- [x] Forma de generar tokens de sesión
- [x] Iniciar sesión en la API
- [ ] Implementar metodos para la obtención de
    - [ ] Calificaciones
    - [x] Datos del estudiante
    - [ ] Orden de pago
    - [ ] Pre-agendar
    - [ ] Más modulos
- [x] Aglomeración de todos los metodos en una clase cliente

## Expectativas
Se busca crear una forma fácil de interactuar, utilizando 
el concepto de la api de Discord

```ts
import {Client} from "@carlosnunezmx/aru"
import {Student} from "@carlosnunezmx/aru/modules";

const client = await new Client(key)
    .login(usr, pwd);

// Store variables
client.setCiclo("2025A"); // O algo por el estilo

const Iam = await client.launch(Student);
```
