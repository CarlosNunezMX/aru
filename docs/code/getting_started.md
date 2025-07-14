# Inicio rápido
Esta es una guía para entender el flujo de trabajo de este
modulo.
> Espera cambios agresivos, esta guía no es definitiva

## Fetch
Se utiliza para hacer las peticiones internas del modulo, para evitar cosas legales, me reservo el derecho de no compartir la privateKey.

Al instanciarla, se puede compartir una sesion y se debe compartir la key para la firma de tokens

```ts
import {Fetch} from "@carlosnunezmx/aru"
import {readFileSync} from "node:fs"
const key = readFileSync("key.pem")
const fetch = new Fetch(key, /** session? **/);
```

### Hacer peticiones autenticadas
Para esto ya debemos de haber establecido una sesión en el 
controlador.
```ts
await fetch.fetch<T>(url, {
    method: "POST",
    body: "test"
});
```

## Manejo de sesiones
Se pueden mantener varias sesiones abiertas, para esto se puede utilizar la siguiente forma:
```ts
import { createSession } from "@carlosnunezmx/aru"

const session = await createSession();
fetch.setSession(session)
// tambien fetch.setSession.bind(fetch)(session)
```