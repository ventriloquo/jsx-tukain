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
    <html data-theme="dark">
      <head>
        <link rel="icon" type="image/png" href="https://f4.bcbits.com/img/0038995394_41.jpg" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"/>
        <style>
          {`
            :root {
              --bg-0: #1f1f28;
              --bg-2: #2a2a37;
              --bg-1: #363646;
              --fg-1: #dcd7ba;
              --fg-2: #717c7c;
              --accent-1: #957fb8;
              --accent-2: #9cabca;
              --accent-3: #98bb6c;

              --pico-background-color: var(--bg-0);
              --pico-color: var(--fg-1);
              --pico-muted-color: var(--fg-2);
              --pico-primary: var(--accent-1);
              --pico-secondary: var(--accent-2);
              --pico-primary-hover: var(--accent-3);
              --pico-code-background-color: var(--bg-1);
              --pico-card-sectioning-background-color: var(--bg-1);
              --pico-card-background-color: var(--bg-2);
              --pico-muted-border-color: var(--pico-muted-color);
              --pico-code-color: var(--pico-muted-color);
              --pico-table-border-color: var(--pico-muted-color);
              --pico-h1-color: var(--pico-color);
              --pico-h2-color: var(--pico-color);
              --pico-h3-color: var(--pico-color);
            }
            ::-webkit-scrollbar {
              display: none;
            }
            main {
              max-width: 80ch !important;
            }
            a {
              text-decoration: underline;
              color: var(--pico-secondary);
            }
            nav a {
              color: var(--pico-primary);
            }
            img {
              max-width: 400px;
              margin: 2px;
            }
            img:hover {
              border: solid 2px var(--pico-primary);
              transition: all 50ms;
            }
            article ul {
              margin: .5em 1em;
            }
            article img {
              display: block;
              margin: auto;
              max-width: 300px;
            }
            article header {
              color: var(--pico-muted-color);
            }
            blockquote {
              background-color: var(--pico-code-background-color);
            }
            pre {
              margin: 1em auto;
            }
            .gallery {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }
            .gallery img {
              object-fit: cover;
            }
            .gallery.albun img {
              max-width: 200px;
              margin: 2px;
            }
          `}
        </style>
        <title>Tukain</title>
      </head>
      <body>
        <main class="container">
          <NavBar />
          <div>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

const posts = [
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
      <article>
          <header>{post.date}</header>
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
        <ul>
          <li><a href="/">Home</a></li>
        </ul>
        <ul>
          <li><a style="color: var(--pico-secondary)" href="/blog">Blog</a></li>
          <li><a style="color: var(--pico-secondary)" href="/gallery">Galeria</a></li>
        </ul>
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