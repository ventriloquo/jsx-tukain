/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { serve } from "https://deno.land/std@0.133.0/http/server.ts";
import { router } from "https://crux.land/router@0.0.11";
import { h, ssr } from "https://crux.land/nanossr@0.0.4";

const render = (component) => ssr(() => <App>{component}</App>);

serve(router(
  {
    "/": () => render(<Home />),
    "/about": () => render(<About />),
    "/blog": () => render(<Blog />),
    "/gallery": () => render(<Gallery />),
  },
  () => render(<NotFound />),
));

console.log("Listening on http://localhost:8000");

function App({ children }) {
  return (
    <html>
      <head>
        <link rel="icon" type="image/png" href="https://f4.bcbits.com/img/0038995394_41.jpg" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlightjs-themes@1.0.0/tomorrow-night-eighties.css"/>
        <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/highlight.min.js"></script>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

            :root {
              --bg-0:     #1F1F28;
              --bg-1:     #363646;
              --bg-2:     #2A2A37;
              --fg-1:     #DCD7BA;
              --fg-2:     #717C7C;
              --accent-1: #9CABCA;
              --accent-2: #957FB8;
              --accent-3: #98bb6c;
              --accent-4: #6A9589;

              --border: solid 1px var(--bg-1);
            }

            * {
              padding: 0;
              margin: 0;
            }

            ::-webkit-scrollbar {
              display: none;
            }

            html {
              font-family: "Noto Sans", sans-serif;
              background-color: var(--bg-0);
            }

            body {
              color: var(--fg-1);
            }

            mark {
              background-color: #e6c384;
            }

            a {
              color: var(--accent-1);
              text-decoration: none;
            }

            a:hover {
              opacity: 80%;
            }

            .center {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }

            ul {
              list-style: "· "
            }

            .content {
              display: block;
              margin: 0 auto;
              padding: 1em;
              position: relative;
              max-width: 80ch;
              min-height: 100vh;
            }

            header {
              position: sticky;
              top: 0;
              z-index: 10;
              background-color: var(--bg-0);
              color: var(--fg-1);
              justify-content: space-between;
              margin: auto;
            }

            footer {
              padding: .5em 0;
              border-top: solid 1px var(--bg-1)
            }

            nav {
              background-color: var(--bg-0);
              border-bottom: solid 1px var(--bg-1);
              height: 60px;
              display: flex;
              align-items: center;
              margin-bottom: 2em;
            }

            .links-container {
              height: 100%;
              width: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
            }

            nav a {
              height: 100%;
              padding: 0 20px;
              display: flex;
              align-items: center;
              text-decoration: none;
              color: var(--accent-2);
            }

            nav a:hover {
              background-color: var(--accent-2);
              color: var(--bg-0);
            }

            nav .home-link {
              margin-right: auto;
            }

            #sidebar-active {
              display: none;
            }

            nav img, nav hgroup, .open-sidebar-button, .close-sidebar-button {
              display: none;
            }

            .post {
              display: block;
              margin: auto;
              margin: 1em 0;
            }

            button, .alternative_button {
              border-radius: 3px;
              box-shadow: 0px 1px 2px 0px black;
              font-size: small;
              margin: 5px;
              padding: 6px 20px;
              background-color: var(--bg-1);
              color: var(--fg-1);
              transition: all 0.2s;
            }

            button:hover {
              opacity: 100%;
              background-color: var(--accent-2);
              color: var(--bg-0);
            }

            button:active, .alternative_button {
              box-shadow: inset 0px 1px 2px 0px black;
              background-color: var(--bg-2);
              color: var(--fg-1);
            }

            button:active, .alternative_button:hover {
              opacity: 100%;
            }

            hr {
              border: none;
              border-bottom: var(--border);
              margin: 1em 16em;
            }

            time {
              color: var(--accent-1);
              font-size: small;
            }

            hgroup {
              margin-bottom: 1em;
              overflow: hidden;
            }

            hgroup p {
              color: var(--fg-2);
              margin-top: -1em;
            }

            h1, h2, h3 {
              font-weight: normal;
            }

            h1 {
              color: var(--accent-3);
              font-size: x-large;
            }

            h3 {
              color: var(--accent-4);
              font-size: x-large;
            }

            p {
              padding-top: .7em;
              padding-bottom: .7em;
            }

            pre {
              padding: 1em;
            }

            blockquote {
                background-color: var(--bg-1);
                color: var(--fg-1);
                border-left: solid 5px var(--accent-1);
                padding: 10px 20px;
                margin: 10px auto;
                margin-bottom: 1em;
            }

            img, iframe {
              max-width: 90%;
              max-height: 400px;
              margin: 2px;
            }

            table, th, td {
                padding: 5px;
                border-collapse: collapse;
            }

            table {
                border: none;
                overflow: scroll;
                margin: 1em;
                margin-left: auto;
                margin-right: auto;
                border: var(--border);
            }

            th, td {
                padding-left: 1em;
                padding-right: 1em;
                margin: 0;
            }

            th {
                font-weight: bold;
                background-color: var(--accent-1);
            }

            tr {
                background-color: var(--bg-0);
            }

            tr:nth-of-type(even) {
                background-color: var(--fg-2);
                color: var(--fg-1);
            }

            thead > tr > th {
                background-color: var(--accent-2);
                color: var(--bg-0);
                font-weight: bold;
                border-bottom: var(--border);
            }

            colgroup {
                border: solid 2px var(--fg-2);
            }

            img:hover {
              border: solid 2px var(--accent-1);
              transition: all 50ms;
            }
            article ul {
              margin: .5em 1em;
            }
            article code, kbd {
              padding: 3px 6px;
              border-radius: 3px ;
            }
            pre:has(code), code {
              background-color: var(--bg-1) !important;
              margin: 10px 0;
              border-radius: 3px;
              overflow-x: scroll;
            }
            kbd {
              background-color: var(--fg-1);
              color: var(--bg-0);
            }
            tr:nth-of-type(2n) {
              background-color: var(--bg-1);
            }
            article {
              background-color: var(--bg-2);
              padding: 1em;
              border-radius: 3px;
            }
            article img {
              display: block;
              margin: auto;
              max-width: 300px;
            }
            .gallery {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }
            .gallery img {
              object-fit: cover;
              max-width: 300px;
            }
            .gallery.albun img {
              max-width: 200px;
              margin: 2px;
            }
                        @media only screen and (max-width: 768px) {
              #search {
                width: 40ch;
              }

              nav {
                backdrop-filter: none;
                background-color: var(--bg-0);
                z-index: 100;
              }

              nav img {
                display: block;
                margin: 0.8em;
                border: var(--border);
                border-radius: var(--border-radius);
                max-width: 30%;
              }

              .links-container {
                flex-direction: column;
                align-items: flex-start;

                position: fixed;
                top: 0;
                left: -102%;
                z-index: 100;
                width: 100%;

                background-color: var(--bg-2);
                transition: 0.30s ease-out;
              }

              nav a {
                box-sizing: border-box;
                height: auto;
                width: 100%;
                padding: 20px 30px;
                justify-content: flex-start;
              }

              .open-sidebar-button, .close-sidebar-button {
                padding: 20px;
                display: block;
              }

              #sidebar-active:checked ~ .links-container {
                left: 0;
              }
              
              hr {
                display: none;
              }
              
              article {
                background-color: none;
                border-top: solid 1px var(--bg-2);
                padding: 1em 0;
              }
              
              pre:has(code), code {
                background-color: var(--bg-2) !important;
              }
            }

            @media only screen and (max-width: 800px) {

              h1 {
                font-size: larger;
              }
              h2, h3 {
                font-size: large;
              }
            }
          `}
        </style>
        <title>Tukain</title>
      </head>
      <body>
        <main>
          <NavBar />
          <div class="content">
            {children}
          </div>
        </main>
        <script>hljs.highlightAll();</script>
      </body>
    </html>
  );
}

const posts = [
  {
    title: "HighlightJS + Outras atualizações",
    date: "13/05/2025",
    content: `Ontem eu tirei um pouco do meu tempo para procurar um |syntax-highlighter|
    para o site, e achei o [highlightjs](https://highlightjs.org/). Eu tenho a impressão
    de que já usei ele no passado, mas é difícil dizer ao certo.

    Enfim.

    Agora os blocos de código do site tem *cores*!
    <pre><code>console.log("AEEEEEEEE, KASINÃOOO!!!")</code></pre>
    <center>[ASSISTA ESSE VÍDEO.](https://www.youtube.com/watch?v=LCDaw0QmQQc)</center>

    Isso facilita bastante se levar em conta que um dos assuntos que eu mais gosto de comentar
    sobre são assuntos que necessitam de blocos de código.

    Outra coisa também é que o HighlightJS detecta _automagicamente_ qual a linguagem que
    está no bloco de código, ou tenta pelo menos achar a mais próxima. Por exemplo, ele
    não tem um highlighting para a [Hare](https://harelang.org), então o highlighting vai
    derivar do highlighting para a |Zephir|, o |C++| e a |Rust|. Olha aqui:

    <pre>C++, não sei dizer o porquê<code>
    use fmt;

    export fn main() void = {
      fmt::println("Olá, mundo!")!;
    };
    </code>Zephir, por conta do for-loop que se comporta como while-loop<code>
    use fmt;

    export fn main() void = {
      let saudacoes = [
        "Salve",
        "Dale",
        "Opa"
      ];

      for (let saudacao .. saudacoes) {
        fmt::printfln("{}, mundo", saudacao)!;
      };
    };
    </code>Rust, bastando colocar um type-casting:<code>
    use fmt;

    export fn main() void = {
      let saudacoes = [
        "Salve",
        "Dale",
        "Opa"
      ];

      for (let saudacao .. saudacoes) {
        fmt::printfln("{}, mundo", saudacao: str)!;
      };
    };
    </code></pre>
    Inclusive, fica aqui a minha recomendação, teste a Hare.

    # Além disso...
    Eu venho aprimorando cada vez mais a minha configuração do [Neovim](https://neovim.io/),
    eu diria que eu está ficando próximo do que seria considerado uma
    [IDE](https://pt.wikipedia.org/wiki/Ambiente_de_desenvolvimento_integrado) leve. E também eu coloquei
    uma caralhada de temas nele, você só tem que apertar 'espaço' 't' e uma janelinha com a seleção de temas
    aparece. Na realidade, todas os atalhos extras que adicionei são acessados (e podem ser visualizados)
    apertando 'espaço'.

    Acho que é isso o que eu tenho para falar por agora, até mais!`
  },
  {
    title: "Sintaxe no estilo Markdown!",
    date: "11/05/2025",
    content: `Graças ao advento do ChatGPT, eu pude colocar uma sintaxe no estilo
    [Markdown](https://www.markdownguide.org/) para esse site!

    A implementação é repleta de expressões regulares, e olha, agora eu entendo porquê que fizeram
    um [livro](https://www.oreilly.com/library/view/mastering-regular-expressions/0596528124/)
    inteiro que só fala sobre isso, eita coisinha complicada do cacete.

    Esse site, pelo menos no momento, não tem o código-fonte público, mas isso não vai
    levar muito tempo, só o suficiente para que eu dê um jeito de pôr isso aqui no Neocities.`
  },
  {
    title: "Espera um pouco...",
    date: "09/05/2025",
    content: `Eu acabei de notar uma coisa aqui enquanto estava ajustando o PicoCSS para
    que ele melhor se encaixasse no meu padrão de design, e percebi uma coisa...

    # Esse site não tem Javascript no lado do cliente!
    
    Cara, isso me pegou muito de surpresa, sério. Tipo, esse site é
    literalemente 1 arquivo |JSX|, e é hosteado por um
    Runtime Javascript, a última coisa que eu esperava seria que o resultado
    final fosse ter 0 Javascript!

    Sei lá, foi algo tipo... parece um pato, nada como pato, mas na verdade é
    um *ganso*. Tecnicamente, isso aqui não é lá muito diferente de um SSG,
    como o próprio [Lume](https://lume.land), mas, logicamente, ele
    tem bem menos funcionalidades... por padrão, por que a única limitação aqui
    é quem usa, e no meu caso ele vai permanecer bem limitado mesmo, o limite do
    meu raciocínio já foi atingido só de usar uma arquitetura serverless, quanto
    mais transformar esse _pequenito_ projeto aqui em um site
    autossuficiente com um SSG interno.

    Apesar de eu querer muito, não vou mentir...
    `
  },
  {
    title: "Deno Deploy",
    date: "08/05/2025",
    content:
    `Essa semana eu comecei a experimentar o
    [Deno](https://deno.com), e também o 
    [Deno Deploy](https://deno.com/deploy) e rapaz...
    que. coisa. *incrível!*

    Bom, para começar, eu tenho que deixar claro que eu não sou um programador,
    apesar de ter um interesse *muito* grande na área. Eu tenho o custome
    de "desenvolver" apenas websites simples e etc, sempre com a intenção de
    experimentar alguma ferramenta ou framework nova, como por exemplo:
    <ul>
      <li>Jekyll</li>
      <li>Lume</li>
      <li>Hugo</li>
      <li>PicoCSS</li>
      <li>Bootstrap</li>
    </ul>
    As ferramentas da vez são o Deno, Deno Deploy e... o |JSX|. É,
    dessa vez eu cedi a tentação e decidi aprender a como usar esse
    "kit junior dev". E rapaz, não vou mentir, eu tô curtindo.

    Eu não sei ainda como que eu posso fazer um "projeto" no Deno Deploy onde
    só tem 1 arquivo |JSX|, mas não acho que seja lá muito complexo.
    <blockquote>
      Na realidade eu só precisava apertar o botão "Export to Github" no
      playground, o próprio Deno Deploy cria um repositório com um Workflow
      preparado para pôr o site no ar!
    </blockquote>
    Fora isso, a estrutura do site é beeeeem simples, tem o total de 6
    componentes aqui, e a inspiração para isso foi um artigo (do próprio Deno)
    onde é mostrado um site criado com apenas 1 arquivo |JSX|.
    O link é esse <a href="https://deno.com/blog/a-whole-website-in-a-single-js-file">aqui</a>.

    Lógico que com "inspirado" eu quero dizer que eu fiz um 'Ctrl C'
    'Ctrl V' do que eu precisava e improvisei no resto 😁
    `
  },
  {
    title: "Teste",
    date: "01/01/1974",
    content:
    `Isso é _só_ *um* _*teste*_.

    'Ctrl' 'Alt' 'Del'

    |code|

    <pre><code>use fmt;
export fn main() void = {
  fmt::println("Olá, mundo!")!;
};</code></pre>

    <table>
      <thead>
        <tr>
          <th>teste</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>teste</td>
        </tr>
        <tr>
          <td>teste</td>
        </tr>
      </tbody>
    </table>

    # teste
    Aqui vai um link para o [google](https://google.com).
    ![](https://www.pngrepo.com/png/378789/512/deno.png)
    <center>Simplesmente *BASED*</center>
    `
  },
];

function Blog() {
  function format(text) {
    return text
    .split('\n')
    .map((linha, i, arr) => {
      const anterior = arr[i - 1] || ''
      const linhaTrim = linha.trim()

      if (linha.trim() === '' && !anterior.trim().endsWith('</h1>')) {
        return '<br><br>'
      }


      let markup = linha

      markup = markup
                    .replace(/\*(.+?)\*/g, '<b>$1</b>')
                    .replace(/_(.+?)_/g, '<i>$1</i>')
                    .replace(/\'(.+?)\'/g,'<kbd>$1</kbd>')
                    .replace(/\|(.+?)\|/g,'<code>$1</code>')
                    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
                    .replace(/\!\[.*?]\(([^\s)]+)\)/g, '<img src="$1"/>')

      if (linhaTrim.startsWith('#')) {
        const conteudo = linhaTrim.replace(/^#\s*/, '')
        markup = `<h3>${conteudo}</h3>`
      }

      return markup
    })
    .join('\n')
  }
  return (
    <div>
      <hgroup class="intro">
        <h1>Bem-vindo ao meu blog!</h1>
        <p>
          Aqui eu falo sobre coisas do meu cotidiano
          ou sobre assuntos que me interessam.
        </p>
      </hgroup>
    {posts.map((post) => (
      <div class="post">
      <hr />
      <article>
          <time>{post.date}</time>
          <h1>{post.title}</h1>
          <p dangerouslySetInnerHTML={{__html: format(post.content)}}></p>
      </article>
      </div>
    ))}
    </div>
  )
}

function Gallery() {
  return (
    <div>
      <div>
        <hgroup class="intro">
          <h1>Capas de Albuns</h1>
          <p>
            Estas são algumas das capas de álbuns da
            <a href="https://bandcamp.com/ventriloquo"> minha coleção de músicas </a>
            que eu acho mais bonitas
          </p>
        </hgroup>
      </div>
      <div class="gallery albun">
        <a href="https://amigadeluxe.bandcamp.com/album/luminance-chrominance">
          <img src="https://f4.bcbits.com/img/a0100050758_16.jpg" />
        </a>
        <a href="https://amigadeluxe.bandcamp.com/album/what-ive-been-working-on">
          <img src="https://f4.bcbits.com/img/a0950128750_16.jpg" />
        </a>
        <a href="https://amigadeluxe.bandcamp.com/track/wish-you-would-care">
          <img src="https://f4.bcbits.com/img/a1278008791_10.jpg" />
        </a>
        <a href="https://amigadeluxe.bandcamp.com/album/amiga-deluxe">
          <img src="https://f4.bcbits.com/img/a1979892281_16.jpg" />
        </a>
        <a href="https://chancedelasoul.bandcamp.com/album/goodbye-future-funk">
          <img src="https://f4.bcbits.com/img/a0456279434_16.jpg" />
        </a>
        <a href="https://chancedelasoul.bandcamp.com/album/in-media-rez">
          <img src="https://f4.bcbits.com/img/a1545796500_16.jpg" />
        </a>
        <a href="https://chancedelasoul.bandcamp.com/album/always-working-on-something">
          <img src="https://f4.bcbits.com/img/a3115343954_16.jpg" />
        </a>
        <a href="https://twrp.bandcamp.com/track/creator-clash-theme">
          <img src="https://f4.bcbits.com/img/a0041113168_16.jpg" />
        </a>
        <a href="https://music.businesscasual.biz/album/intuit-may">
          <img src="https://f4.bcbits.com/img/a0188007539_16.jpg" />
        </a>
        <a href="https://music.businesscasual.biz/album/summer-hits-vol-2">
          <img src="https://f4.bcbits.com/img/a1741019365_16.jpg" />
        </a>
        <a href="https://music.businesscasual.biz/album/transmute">
          <img src="https://f4.bcbits.com/img/a0290116458_16.jpg" />
        </a>
        <a href="https://music.businesscasual.biz/album/the-angel-the-demon">
          <img src="https://f4.bcbits.com/img/a3415872383_16.jpg" />
        </a>
      </div>
      <br />
      <div>
        <hgroup class="intro">
          <h1>Wallpapers</h1>
          <p>Alguns wallpapers que eu achei por ai</p>
        </hgroup>
      </div>
      <div class="gallery">
        <img src="https://images.unsplash.com/photo-1479030160180-b1860951d696?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRlc2t0b3AlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D" />
        <img src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRlc2t0b3AlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D" />
        <img src="https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVza3RvcCUyMHdhbGxwYXBlciUyMGFuaW1lfGVufDB8fDB8fHww" />
        <img src="https://images.unsplash.com/photo-1502759683299-cdcd6974244f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGVza3RvcCUyMHdhbGxwYXBlciUyMGFuaW1lfGVufDB8fDB8fHww" />
        <img src="https://images.unsplash.com/photo-1712087857426-62e5c2a80f8e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRlc2t0b3AlMjB3YWxscGFwZXIlMjBhbmltZXxlbnwwfHwwfHx8MA%3D%3D" />
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <header>
      <nav>
        <input id="sidebar-active" type="checkbox" />
        <label class="open-sidebar-button" for="sidebar-active">Menu</label>
        <div class="links-container">
          <a class="home-link" href="/">Home</a>
          <a href="/blog">Blog</a>
          <a href="/gallery">Galeria</a>
        </div>
      </nav>
    </header>
  );
}

function Home() {
  return (
    <div>
      <hgroup>
        <h1>Tukain</h1>
        <p>Usuário Linux / Curioso por tecnologia / Blogger</p>
      </hgroup>
      <p>
        Sou alguém que busca por músicas que me relaxam ou que dão adrenalina…
        <br />
        Só depende do dia.
        <br />
        <br />
        Sinta-se livre para explorar o meu espaço neste vasto mundo chamado internet!
      </p>
    </div>
  );
}

function NotFound() {
  return (
    <center>
      <h1>404</h1>
      <p>Página não encontrada!</p>
    </center>
  );
}
