# Cliente
> **No estable:** espere cambios que rompan su código
Este es una aglomeración de los datos necesarios para ejecutar una petición
incluye los datos de sesión, el controlador de Fetch y más datos del estudiante

Utiliza el metodo launch para lanzar peticiones que necesiten estar autenticadas, utiliza
un callback para permitir al programador utilizar la API, puede ver el archivo [client.ts](../../source/client.ts)

**Ejemplo de uso**
```ts
import Client from "@carlosnunezmx/aru"
// Carga de la private key
const client = await new Client(key) // Configuramos el cliente con la llave
    .login("usr", "pwd"); // Iniciamos sesión en el API de Leo
```

## Enviar peticiones

Aru viene con varias peticiones preconfiguradas(desde ahora modulos), para usarlos
comenzaremos con importarlos
```ts
import { StudentData } from "@carlosnunezmx/aru/modules";
```
Al importar un modulo este será una función que se utiliza con el cliente o sin el,
pero en este caso lo usaremos pasandole el cliente como argumento.

```ts
// Code ...
const myData = await StudentData(client);
```
Si quieres ver un ejemplo puedes consultar [**StudentData**](../../source/modules/data.ts)

_Para construir módulos personalizados, vea [**Modulos personalizados**](custom_modules.md)_

_* Para utilizar un modulo sin el cliente vea [**Guia de incio rápido**](getting_started.md#hacer-peticiones-autenticadas)_
