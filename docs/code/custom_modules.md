# Modulos personalizados
> **Inestable:** Espere cambios importantes a la API

Se pueden crear modulos personalizados utilizando funciones que sean callbacks,
se tienen que configurar con dos parametros, las cuales cumplan con el siguiente 
tipado

```ts
export type LaunchCB<T> = (fetch: Fetch, session: SessionToken.Session) => Promise<T>;
```

* Fetch: Utilizamos este campo, ya que fetch será donde hagamos nuestras peticiones, haciendo 
    shadowning a la api original
* session: Se pueden obtener datos del usuario a travez de la clase sesssion

## Helpers
Se han programado varias funciones que pueden ayudar al desarrollo de modulos personalizados,
aquí una lista recopilatoria (ahorita esta chiquita >.<):
    * [buildURL](../../source/common/url.ts): Esta funcion permite el construir una url a partir
    de una plantilla, además de un tipado dinamico que permite que de a partir de la url definir los parametros de entrada
    de la función:
```ts
import {buildURL} from "@carlosnunezmx/aru"
const url = buildURL("https://example.com/:id", {
    id: "hello-world" // Dinamicamente tipado :D
})
```
