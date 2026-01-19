# Modulos personalizados
> **Inestable:** Espere cambios importantes a la API

Se pueden crear modulos personalizados, apartir de recibir el cliente como
argumento, este por si solo posee:
  * La sesion del usuario
  * Un wrapper para la funcion fetch, la cual, llena la peticion
    con los datos requeridos para que Leo acepte la petición

```ts
import {Client} from "@carlosnunezmx/aru";
export async function doSomething(client: Client): Promise<any>{
  client.session!; // contiene datos de la sesión, tales como el ID del 
                   // estudiante
  client.fetch.fetch() // usalo como un fetch normal, este
                       // se encarga de lo demás 
}; 
```

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
