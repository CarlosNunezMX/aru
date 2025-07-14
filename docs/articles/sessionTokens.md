# Como funcionan los SessionTokens

Cuando empezamos a estudiar la segunda versión del sistema de Leo, nos
encontramos con que ahora el `authorization-key` había cambiado, con eso en
mente se localizaron 4 funciones que generaban ese token.

## encode 
  **En código fuente: **n[9988]->nc****
  **Recreación en:** **[createSessionToken.ts](../../source/auth/tokens/createSessionToken.ts)**
  **Argumentos:** _sessionID: string_, _key?: string_
  Convierte un sessionID en una cadena codificada usando un número aleatorio
  
### Explicación 
  * Guardamos el tamaño de la cadena _sessionID_ y generamos un número aleatorio el cual sera usado para mover la cadena
  * Usando la formúla: **(n) => 122 - n + 1**, creamos un número mágico
  * Creamos una variable para almacenar el token
  * Para el for principal se sigue las instrucciones:
    * acc toma el valor de la suma de **sessionID.charCodeAt(i) - toMove** y **MAGIC_STR.charCodeAt(i) - toMove**
    * Usando el acomulador, construimos un caracter con la formúla (acc % magic) + toMove y se lo agregamos a la variable del token
  * Regresamos el token con la siguiente estructura: `token + "~" + String.fromCharCode(toMove) + token`

## clear
  **En código fuente:** **n[9988]->nd**
  **Recreación en:** **[createSessionToken.ts](../../source/auth/tokens/createSessionToken.ts)**
  **Argumentos:** _transformed: string_
  Le da la estructura al token
  
## decode
  **En código fuente:**: **n[9988]->dc**
  **Recreación en:** **[createSessionToken.ts](../../source/auth/tokens/createSessionToken.ts)**
  **Argumentos:** _token: string_, _key?: string_
  Regresa el token al estado original
