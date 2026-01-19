# Inicio rápido
Esta es una guía para entender el flujo de trabajo de este
modulo.
> Espera cambios agresivos, esta guía no es definitiva

**👉 [Nuevo] - Clase cliente (🛠️ En construcción) > [Cliente](client.md)**


# Configurar nuestro cliente

Nuestro cliente de comunicación con leo, requiere
que se proporcione la key para la firma de los tokens,
una vez instanciado, se puede iniciar sesion en la plataforma
de Leo

```ts
import {Client} from "@carlosnunezmx/aru"
import {readFileSync} from "node:fs"
const key = readFileSync("key.pem")
const client = new Client(key); // creacion de cliente
await client.login("usr", "pwd"); // inicio de sesion
```

### Hacer peticiones autenticadas
Para esto ya debemos de haber establecido una sesión en el 
controlador.
```ts
// Modulos incluidos
import {StudentData} from "@carlosnunezmx/aru/modules"
await StudentData(client);
```
