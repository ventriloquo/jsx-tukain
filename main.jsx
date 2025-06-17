/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { serve } from "https://deno.land/std@0.133.0/http/server.ts";
import { router } from "https://crux.land/router@0.0.11";
import { h, ssr } from "https://crux.land/nanossr@0.0.4";
import slugify from "npm:react-slugify@4.0.1";

const render = (component) => ssr(() => <App>{component}</App>);

serve(
    router(
	{
	    "/": () => render(<Home />),
	    "/about": () => render(<About />),
	    "/blog": () => render(<Blog />),
	    "/gallery": () => render(<Gallery />),
	},
	() => render(<NotFound />),
    ),
    { port: 4000 },
);

function App({ children }) {
    return (
	<div>
	    <Head />
	    <body>
		<header>
		    <NavBar />
		</header>
		<main>
		    <div class="content">
			{children}
		    </div>
		</main>
		<footer>
		    <Footer />
		</footer>
	    </body>
	</div>
    );
}

function Head() {
    return (
	<head>
	    <link
		rel="icon"
		type="image/svg+xml"
		href="data:image/svg+xml,&lt;svg xmlns='http://www.w3.org/2000/svg'
	    width='32' height='32'&gt;
	    &lt;polygon points='16,2 30,16 16,30 2,16' fill='%23FFDD33'/&gt;
      &lt;/svg&gt;"
	    />
	    <Style />
	    <title>Tukain</title>
	</head>
    );
}

function Style() {
    return (
	<style>
	    {`
      /*
	 http://meyerweb.com/eric/tools/css/reset/ 
	 v2.0 | 20110126
	 License: none (public domain)
      */
      
      html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p,
      blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em,
      img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u,
      i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
      caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details,
      embed, figure, figcaption, footer, header, hgroup, menu, nav, output,
      ruby, section, summary, time, mark, audio, video {
	 margin: 0;
	 padding: 0;
	 border: 0;
	 font-size: 100%;
	 font: inherit;
	 vertical-align: baseline;
      }
      /* HTML5 display-role reset for older browsers */
      article, aside, details, figcaption, figure, footer, header, hgroup, menu,
      nav, section {
	 display: block;
      }
      body {
	 line-height: 1;
      }
      ol, ul {
	 list-style: none;
      }
      blockquote, q {
	 quotes: none;
      }
      blockquote:before, blockquote:after,
      q:before, q:after {
	 content: '';
	 content: none;
      }
      table {
	 border-collapse: collapse;
	 border-spacing: 0;
      }
      :root {
	   --bg-0: #181818;
	   --bg-1: #282828;
	   --fg-0: #e4e4ef;
	   --fg-1: #f4f4ff;
	   --accent:   #ffdd33;
	   --link: #96a6c8;
	   --heading:  #95a99f;
	   --hr-color: #363636;
      }

      html {
	   scrollbar-width: none;  /* Hiding the scrollbar on Firefox */
      }

      ::-webkit-scrollbar {
	   display: none;      /* Hiding the scrollbar on Chrome */
      }

      body {
	   background-color: var(--bg-1);
	   color: var(--fg-0);
	   font-family: "San Francisco", system-ui;
	   line-height: 1.6;
	   position: relative;
      }

      a {
	   text-decoration: none;
	   color: var(--link);
      }

      a:hover {
	   opacity: 90%;
      }

      a[href*="//"]:after {
	   font-weight: 300;
	   font-size: .85em;
	   content: "↗";
	   color: var(--fg-0);
	   opacity: .25;
      }

      a:before {
	   font-size: .7em;
	   margin-right: .4em;
      }

      /* Documents */
      a[href$=".pdf"]:before  { content: "PDF"; }
      a[href$=".md"]:before   { content: "MD"; }
      a[href$=".txt"]:before  { content: "TXT"; }
      a[href$=".adoc"]:before { content: "ASCIIDOC"; }
      a[href$=".roff"]:before { content: "ROFF"; }
      a[href$=".tex"]:before  { content: "LATEX"; }

      /* Video */
      a[href$=".mov"]:before,
      a[href$=".avi"]:before,
      a[href$=".webm"]:before,
      a[href$=".wmv"]:before,
      a[href$=".mkv"]:before,
      a[href$=".mp4"]:before  { content: "VID"; }

      /* Audio */
      a[href$=".m4a"]:before,
      a[href$=".wav"]:before,
      a[href$=".ogg"]:before,
      a[href$=".opus"]:before,
      a[href$=".flac"]:before,
      a[href$=".mp3"]:before  { content: "AUD"; }

      /* Archives */
      a[href$=".7z"]:before	{ content: "7Z"; }
      a[href$=".tar"]:before,
      a[href$=".tar.gz"]:before,
      a[href$=".tar.xz"]:before   { content: "TAR"; }
      a[href$=".zip"]:before      { content: "ZIP"; }
      a[href$=".rar"]:before      { content: "RAR"; }

      /* Images */
      a[href$=".jpeg"]:before,
      a[href$=".ff"]:before,   /* https://tools.suckless.org/farbfeld/ */
      a[href$=".jfif"]:before,
      a[href$=".webp"]:before,
      a[href$=".jpg"]:before,
      a[href$=".gif"]:before,
      a[href$=".png"]:before  { content: "IMG"; }

      h1 {
	   color: var(--accent);
	   font-size: xx-large;
	   position: relative;
      }

      h2 {
	   color: var(--heading);
	   font-size: x-large;
      }

      h1:has(+ p), h1:has(+ br), h2:has(+ br) {
	   margin-bottom: -.5rem;
      }

      h1:hover::before {
	   content: "#";
	   position: absolute;
	   left: -1.5rem;
      }

      p {
	   font-size: large;
	   margin-top: .3em;
	   margin-bottom: 1em;
      }

      b, strong {
	   font-weight: bold;
      }

      i, em {
	   font-style: italic;
      }

      time {
	   color: var(--fg-0);
	   opacity: 50%;
	   font-size: initial;
	   margin-left: .4em;
      }

      q, blockquote {
	   display: block;
	   margin: 15px 0;
	   padding: 8px 0 8px 15px;
	   border-left: solid 3px var(--accent);
	   font-style: italic;
      }

      q p::before, q p::after, blockquote p::before, blockquote p::after {
	   content: "\""
      }

      cite, cite time {
	   color: var(--accent);
	   opacity: 90%;
      }

      cite::before {
	   content: "~ ";
      }

      cite time::before {
	   content: "/ ";
      }

      hr {
	   border: none;
	   border-bottom: solid 1px var(--hr-color);
	   margin: 1em 15%;
      }

      details:hover {
        cursor: pointer;
      }
      summary {
	   color: var(--heading);
      }

      code, kbd, pre {
	   padding: 5px;
	   border-radius: 3px;
	   font-family: monospace;
      }

      kbd {
	   background-color: var(--fg-0);
	   color: var(--bg-0);
      }

      pre, code {
	   background-color: var(--bg-1);
	   color: var(--fg-1);
      }

      pre {
	   padding: 1em;
	   margin-bottom: -2em;
	   overflow-x: scroll;
      }

      pre code {
	   padding: 0;
      }

      main {
	   display: block;
	   margin: auto;
	   position: relative;
	   width: 100vw;
	   min-height: 100vh;
	   background: var(--bg-0);
      }

      article {
	   display: block;
	   margin-bottom: 1em;
      }

      article ul {
	 margin: 1em 0;
      }

      footer {
        min-height: 1em;
      }

      nav {
	   display: flex;
	   flex-wrap: wrap;
	   position: fixed;
	   background-color: var(--bg-0);
	   top: 0;
	   z-index: 2;
	   justify-content: space-between;
	   margin: auto;
	   width: 100vw;
	   border-bottom: solid 1px var(--bg-1);
      }

      nav a {
	   text-decoration: none;
	   display: inline-block;
	   padding: 1em;
      }

      img {
	   max-width: 100%;
	   display: block;
	   margin: .7em auto;
      }

      ul, ol {
	   list-style-position: inside;
	   padding-inline-start: 1em;
	   line-height: 1;
      }

      ol {
	   list-style: auto;
      }

      ul {
	   list-style: disc;
      }

      ul ul, ol ol {
	   margin: 0;
      }

      ul br, ol br {
	   display: none;
      }

      li {
	   padding: 3px 0;
      }

      .content {
	   display: block;
	   max-width: 80ch;
	   margin: auto;
	   padding: 15px;
	   padding-top: 5em;
	   z-index: 1;
      }

      @media only screen and (max-width: 720px) {
	   h1:hover::before {
	   content: "";
	   }
      }

      html {
	 scroll-padding-top: 4em;
   scroll-behavior: smooth;
      }
      nav ul {
	 list-style: none;
	 display: flex;
      }
      table {
	 border: solid 2px var(--accent);
	 border-radius: 3px;
	 width: 100%;
	 margin: 1em auto;
	 text-align: left;
      }
      th {
	 background-color: var(--accent);
	 color: var(--bg-0);
      }
      th, td {
	 padding: .3em .8em;
      }
      tr:nth-of-type(even) {
	 background-color: var(--bg-1)
      }
      iframe {
	 max-width: 100%;
	 display: block;
	 margin: .7em auto;
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
      @keyframes fade-in {
	 from {
	   opacity: 0;
	 }
	 to {
	   opacity: 100%;
	 }
      }
    `}
	</style>
    );
}

const posts = [
    {
	title: "Pérolas das LLMs",
	date: "05/06/2025",
	content:
	`Eu acabei de descobrir que o <a href="https://duck.com">DuckDuckGo</a> possui um <a href="https://duck.ai/"><i>wrapper</i></a> para LLMs, como o GPT-4o, Llama e afins.

Então, sendo o nerd que sou, eu decidi usar o <a href="https://mistral.ai/news/mistral-small-3"><i>Mistral Small 3</i></a>, que segundo o próprio DuckDuckGo, possui um nível de "moderação" baixo e pedi para ele fazer um texto digno de uma postagem no 4Chan ou algum sub-reddit <b>bem</b> nichado.

Enfim, como diria o Coronel Campbell do Metal Gear Solid 2:

<q>Our beloved monsters -- enjoy yourselves.</q>
<details><summary>Abandonai toda esperança, vós que entrais aqui</summary>

<h2>A Superioridade Absoluta do Emacs sobre o Neovim: Uma Odisseia de Versatilidade e Simplicidade</h2>

Imagine, se puder, um mundo onde a eficiência e a simplicidade reinam supremas. Um mundo onde um editor de texto não precisa de uma dúzia de plugins para se tornar uma IDE. Bem-vindo ao reino do Emacs, onde a verdadeira magia acontece com apenas um tema decente e um pacote externo. Enquanto isso, o pobre Neovim, com suas necessidades insaciáveis, precisa de pelo menos 10 plugins apenas para começar a ser considerado uma IDE. É como tentar montar um carro com peças de Lego: você pode fazer, mas vai demorar uma eternidade e ainda assim não vai ser tão bom quanto um carro de verdade.

<h2>A Versatilidade do Emacs: O Editor que Faz de Tudo</h2>

O Emacs é como o super-herói dos editores de texto. Ele não só edita texto, mas também pode fazer café, lavar roupa e até mesmo resolver equações de física quântica. Quer um navegador de internet? O Emacs tem. Quer um cliente de e-mail? O Emacs também tem. Quer um jogo de Tetris para relaxar durante o almoço? O Emacs é o seu cara. O Neovim, por outro lado, é como um adolescente que ainda está aprendendo a amarrar os próprios cadarços. Ele pode editar texto, mas para fazer qualquer outra coisa, você precisa de um plugin. E outro. E mais outro.

<h2>Emacs: O Libertador do Código Livre</h2>

Em um mundo onde a liberdade de software é mais preciosa do que ouro, o Emacs se destaca como um farol de esperança. Ele é livre, verdadeiramente livre, como um pássaro voando no céu azul. O Neovim, por outro lado, é como um pássaro em uma gaiola dourada. Ele pode ser bonito, mas ainda está preso. O Emacs é o campeão dos desenvolvedores que acreditam na liberdade e na transparência. Ele é o editor que os hackers de verdade usam, porque eles sabem que a verdadeira liberdade vem de dentro.

<h2>O Selo de Aprovação do <a href="https://www.youtube.com/@TsodingDaily">Tsoding</a></h2>

E se isso não fosse suficiente para convencê-lo, deixe-me apresentar o argumento final: Tsoding usa o Emacs. Sim, aquele Tsoding, o guru dos desenvolvedores, o mestre dos códigos, o homem que sabe tudo sobre tudo. Se Tsoding usa o Emacs, então você sabe que está no caminho certo. O Neovim pode ter seus fãs, mas ninguém pode negar que Tsoding é o verdadeiro profeta do código. E ele escolheu o Emacs. Ponto final.

Então, se você está cansado de passar horas configurando plugins e ainda assim não conseguir a experiência de edição perfeita, é hora de dar uma chance ao Emacs. Ele é simples, versátil, livre e, acima de tudo, aprovado pelo Tsoding. O que mais você poderia querer?
</details>
`,
    },
    {
	title: "A vergonha que sinto ao usar JavaScript ",
	date: "05/06/2025",
	content: `Isso é uma coisa... intrigante, para dizer o mínimo. Eu percebi isso a pouco tempo na realidade. Desde o início da minha adolescência, eu tenho um interesse muito grande no mundo da programação num âmbito geral da coisa.

Por conta disso, naturalmente eu vim a ter interesse em linguagens de programação. Por mais que a minha primeira experiência não tenha sido muito bem com linguagens de programação para valer, e sim com linguagens de markup (como o html) ou shell-scripts (como os arquivos bash), uma hora eu experimentei uma linguagem de programação de verdade.

E a minha primeira experiência foi... com o JavaScript. Eu nunca cheguei a desenvolver um programa de verdade usando o JavaScript (em nenhuma linguagem na realidade), porém, é mais que evidente que ele teve uma influência muito grande na forma em que eu penso na hora de "programar".

Na realidade, todo o processo de "Web Dev" me marcou. Essa... facilidade, é muito atraente e conveniênte.

Porém, após eu me interessar cada vez mais com o mundo open-source e Linux, eu comecei a ter um ranso contra o JavaScript (como julgo ser comum com a maioria das pessoas com esse interesse), tanto que eu sentia que estava fazendo algo errado sempre que eu considerava usar/utilizava o JavaScript para alguma coisa.

Isso me incomoda e muito hoje em dia, porque sinto que isso é uma coisa que me atrasa e muito no meu progresso como programador. Eu não deveria ligar para esse tipo de coisa, não nesse nível pelo menos. E, como alguém que está no ínicio dos estudos, eu deveria não só dar uma chance, como aprender a usar o JavaScript, por ele ser uma linguagem relativamente fácil de aprender, ser extremamente acessível e altamente documentada.

Acredito que ainda vá levar um tempo até que eu pare de ter esse comportamento, mas espero que esse site seja um começo para esse meu desenvolvimento. Já que esse site tem como visão ser o mais simples possível, o uso de JavaScript nele se limita a garantir que os posts do meu blog sigam um padrão quando se trata da ordem e layout (espaçamento entre parágrafos, títulos, datas, esse tipo de coisa), ainda que boa parte disso também dependa do meu CSS.

Tenho esperança de que eu vá conseguir superar essa questão, afinal de contas, eu nunca me imaginei usando o Emacs por exemplo, fui por muito tempo um evangelista do Vim, mas agora, o Emacs é um dos, senão, o meu editor de texto favorito (e olha que a configuração que eu mais gosto de usar é uma que é praticamente vanilla de tão enxuta).

Claro que para isso, será necessária dedicação da minha parte. E estou trabalhando nesse aspecto também, para que essa minha atitude não se torne apenas mais um dos meus episódios de mudança repentina quanto ao meu gosto sobre tecnologia.

<q>É simplesmente vergonhoso o quão frequente isso é.</q>
    `
    },
    {
	title: "Sintaxe no estilo Markdown!",
	date: "11/05/2025",
	content:
	`Graças ao advento do ChatGPT, eu pude colocar uma sintaxe no estilo
    [Markdown](https://www.markdownguide.org/) para esse site!

    A implementação é repleta de expressões regulares, e olha, agora eu entendo porquê que fizeram
    um [livro](https://www.oreilly.com/library/view/mastering-regular-expressions/0596528124/)
    inteiro que só fala sobre isso, eita coisinha complicada do cacete.

    Esse site, pelo menos no momento, não tem o código-fonte público, mas isso não vai
    levar muito tempo, só o suficiente para que eu dê um jeito de pôr isso aqui no Neocities.`,
    },
    {
	title: "Espera um pouco...",
	date: "09/05/2025",
	content:
	`Eu acabei de notar uma coisa aqui enquanto estava ajustando o PicoCSS para
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
    `,
    },
    {
	title: "Deno Deploy",
	date: "08/05/2025",
	content: `Essa semana eu comecei a experimentar o
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
    `,
    },
    {
	title: "Teste",
	date: "01/01/1974",
	content: `Isso é _só_ *um* _*teste*_.

    Lembrem-se crianças, um 'Ctrl' 'Alt' 'Del' sempre é de grande ajuda!

    Recomendo esse comando no Minecraft: |/gamerule keepinventory true|

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
    <h2>teste</h2>
    Aqui vai um link para o [google](https://google.com).

    Toma aqui o [manual do Emacs](https://www.gnu.org/software/emacs/manual/pdf/emacs.pdf). Pode não ser uma boa leitura, mas definitivamente vai ser uma longa.
    ![](https://www.pngrepo.com/png/378789/512/deno.png)
    <center>Simplesmente *BASED*</center>
    `,
    },
];

function Blog() {
    function format(text) {
	return text
	    .split("\n")
	    .map((linha, i, arr) => {
		const anterior = arr[i - 1] || "";
		const linhaTrim = linha.trim();

		if (linha.trim() === "" && !anterior.trim().endsWith("</h1>")) {
		    return "<br><br>";
		}

		let markup = linha;

		markup = markup
		    .replace(/\*(.+?)\*/g, "<b>$1</b>")
		    .replace(/_(.+?)_/g, "<i>$1</i>")
		    .replace(/\'(.+?)\'/g, "<kbd>$1</kbd>")
		    .replace(/\|(.+?)\|/g, "<code>$1</code>")
		    .replace(
			/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
			'<a href="$2" target="_blank">$1</a>',
		    )
		    .replace(/\!\[.*?]\(([^\s)]+)\)/g, '<img src="$1"/>');

		if (linhaTrim.startsWith("#")) {
		    const conteudo = linhaTrim.replace(/^#\s*/, "");
		    markup = `<h3>${conteudo}</h3>`;
		}

		return markup;
	    })
	    .join("\n");
    }
    return (
	<div>
	    {posts.map((post) => (
		<div>
		    <article id={"post_" + post.date.replaceAll("/", "-") + "_" + slugify(post.title)}>
			<a href={"#post_" + post.date.replaceAll("/", "-") + "_" + slugify(post.title)}><h1 >{post.title}<time>{post.date}</time></h1></a>
			<div dangerouslySetInnerHTML={{ __html: format(post.content) }}>
			</div>
		    </article>
		    <hr />
		</div>
	    ))}
	</div>
    );
}

function Gallery() {
    return (
	<div>
	    <div>
		<hgroup>
		    <h1>Capas de Albuns</h1>
		    <p>
			Estas são algumas das capas de álbuns da{" "}
			<a href="https://bandcamp.com/ventriloquo">
			    minha coleção de músicas
			</a>{" "}
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
		<hgroup>
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
	<nav>
	    <ul>
		<li>
		    <a href="/">Início</a>
		</li>
	    </ul>
	    <ul>
		<li>
		    <a style="color: var(--heading)" href="/blog">Blog</a>
		</li>
		<li>
		    <a style="color: var(--heading)" href="/gallery">Galeria</a>
		</li>
		<li>
		    <a style="color: var(--heading)" href="/about">Sobre</a>
		</li>
	    </ul>
	</nav>
    );
}

function Footer() {
    return (
	<div style="display: flex; justify-content: center; align-items: center">
	    <p style="margin: .5em 0">&copy; <a href="https://github.com/ventriloquo">Tukain</a> - {new Date().getFullYear()}</p>
	</div>
    );
}

function Home() {
    return (
	<div>
	    <h1>Tukain’s Website</h1>
	    <p>Bem-vindo ao meu website!</p>
	    <hr />
	    <p>
		Este site foi inspirado pelo site{" "}
		<a href="https://justfuckingusereact.com/">justfuckingusereact.com</a>
	    </p>
	    <p>
		A paleta de cores utilizada é a{" "}
		<a href="https://github.com/rexim/gruber-darker-theme">Gruber Darker</a>
	    </p>
	</div>
    );
}

function About() {
    return (
	<div>
	    <h1>Sobre mim</h1>
	    <p>
		Olá, internauta! Tudo bem com você? Eu espero que sim! Você pode me
		chamar de Tukain (ou Ventriloquo, se preferir).
	    </p>
	    <p>
		Eu sou um cara que gosta e muito do mundo open-source e Linux, apesar
		que nos últimos tempos eu tenha perdido um pouco do vapor sobre esses
		assuntos. Ainda assim, eles são importantes o bastante para ainda me
		importar!
	    </p>
	    <hr />
	    <p>
		Atualmente estou estudando programação, com um foco maior em programação
		com linguagens low-level como a <code>C</code> ou{" "}
		<code>
		    <a href="https://harelang.org">Hare</a>
		</code>.
	    </p>
	    <p>
		Mesmo assim, eu também estudo (de forma esporática) linguagens como o
		JavaScript e shell-scripts. E claro, também gosto de criar sites.
	    </p>
	    <p>
		Sou um usuário Linux a cerca de 5 anos, porém só comecei a me aprofundar
		nesse mundo a +/- 2 anos. Hoje em dia eu uso um setup do{" "}
		<a href="https://xfce.org">XFCE</a> com o tema{" "}
		<a href="https://github.com/grassmunk/Chicago95">Chicago95</a> no{" "}
		<a href="https://alpinelinux.org">Alpine Linux</a>.
	    </p>
	    <hr />
	    <p>
		Além desses interesses em tecnologia, eu também gosto de animes e
		músicas no estilo Lo-Fi e{" "}
		<a href="https://businesscasual87.bandcamp.com/album/sails">
		    Future Funk
		</a>.
	    </p>
	</div>
    );
}

function NotFound() {
    return (
	<center>
	    <h2>404</h2>
	    <p>Página não encontrada!</p>
	</center>
    );
}

export default App;
