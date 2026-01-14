import SoyAlumno from "../source/modules/soyalumno/credencial.ts";
Bun.serve({
  async fetch(request, server) {
    const code = new URL(request.url).searchParams.get("siiau");
    if (!code) return new Response("Fuck you!", {
      status: 404
    });

    console.log("sending query...")
    const query = await SoyAlumno(code);

    return new Response(`
    <styles>
      main {
        display: flex;
      }
    </styles>
    <div>
      <h1>Reporte de 
        <br/>
        ${query.nombre} 
        ${query.apellido_paterno} 
        ${query.apellido_materno}
      </h1>
      <main>
        <aside>
          <img src="data:image/png;base64,${query.foto}"/>
          <img src="data:image/png;base64,${query.firma}"/>
        </aside> 
      </main>
    </div>
`,
      {
        headers: {
          "Content-Type": "text/html"
        }
      })
  },
  port: 3030
})
