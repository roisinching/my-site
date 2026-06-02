import { Hono } from "hono"
import { html } from "hono/html"

const app = new Hono()

const Layout = (props: { title: string; active: string; children: any }) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${props.title}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Caveat:wght@500;700&display=swap" rel="stylesheet">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        :root {
          --cream: #fff4e6;
          --cream-2: #ffe9d2;
          --ink: #4a3b2f;
          --coral: #ff6b5b;
          --sun: #ffc23c;
          --mint: #43c9b0;
          --grape: #a06bd4;
          --sky: #5cb8e8;
          --leaf: #7bc043;
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Fredoka', sans-serif;
          background: var(--cream);
          color: var(--ink);
          margin: 0;
          overflow-x: hidden;
        }
        .hand { font-family: 'Caveat', cursive; }
        .paper {
          background-image:
            radial-gradient(circle at 20% 30%, rgba(255,194,60,0.06) 0, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(67,201,176,0.06) 0, transparent 40%);
        }
        @keyframes popIn {
          0% { opacity: 0; transform: translateY(24px) scale(0.95) rotate(-2deg); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotate(0); }
        }
        .pop { opacity: 0; animation: popIn 0.6s cubic-bezier(0.2,0.9,0.3,1.4) forwards; }
        .d1{animation-delay:.05s}.d2{animation-delay:.14s}.d3{animation-delay:.24s}
        .d4{animation-delay:.36s}.d5{animation-delay:.48s}.d6{animation-delay:.6s}

        /* flying soccer ball across the sky */
        @keyframes flyBall {
          0%   { left: -8%;  top: 38%; transform: rotate(0deg) scale(0.8); }
          25%  { top: 8%; }
          50%  { left: 50%; top: 30%; transform: rotate(540deg) scale(1.1); }
          75%  { top: 10%; }
          100% { left: 108%; top: 42%; transform: rotate(1080deg) scale(0.8); }
        }
        .fly-ball {
          position: fixed;
          font-size: 2.4rem;
          z-index: 5;
          pointer-events: none;
          animation: flyBall 7s ease-in-out infinite;
          filter: drop-shadow(0 6px 6px rgba(0,0,0,0.15));
        }
        @keyframes wobble {
          0%,100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .wobble { animation: wobble 3s ease-in-out infinite; }
        @keyframes bobble {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .bobble { animation: bobble 3s ease-in-out infinite; }

        .sticker {
          border-radius: 26px;
          border: 3px solid var(--ink);
          box-shadow: 5px 6px 0 rgba(74,59,47,0.18);
          transition: transform 0.2s cubic-bezier(0.2,0.9,0.3,1.4), box-shadow 0.2s;
        }
        .sticker:hover { transform: translateY(-5px) rotate(-1.5deg); box-shadow: 7px 9px 0 rgba(74,59,47,0.22); }
        .tape {
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%) rotate(-4deg);
          width: 70px; height: 24px; background: rgba(255,194,60,0.55);
          border: 1px dashed rgba(74,59,47,0.25);
        }
        .navpill { transition: transform 0.2s, background 0.2s; }
        .navpill:hover { transform: translateY(-2px) rotate(-2deg); }
      </style>
    </head>
    <body class="paper min-h-screen">
      <div class="fly-ball">⚽</div>

      <header class="relative z-10 px-5 sm:px-10 py-6 flex items-center justify-between pop d1">
        <a href="/" class="hand font-bold" style="font-size:2rem;color:var(--coral);">Noe ✿</a>
        <nav class="flex items-center gap-2 sm:gap-3 text-sm font-600" style="font-weight:600;">
          ${nav("/", "Home", "var(--sun)", props.active)}
          ${nav("/soccer", "Soccer", "var(--mint)", props.active)}
          ${nav("/makes", "I Make", "var(--grape)", props.active)}
          ${nav("/pets", "My Pets", "var(--sky)", props.active)}
        </nav>
      </header>

      ${props.children}

      <footer class="relative z-10 mt-16 px-5 sm:px-10 py-10 text-center">
        <div class="hand" style="font-size:1.5rem;color:var(--coral);">made by Noe with lots of glitter ✨</div>
        <div style="font-size:0.8rem;color:rgba(74,59,47,0.5);margin-top:4px;">© 2026 · almost 10 years old</div>
      </footer>
    </body>
  </html>
`

const nav = (href: string, label: string, color: string, active: string) => html`
  <a href="${href}" class="navpill px-3 sm:px-4 py-2 rounded-full" style="${active === href ? `background:${color};color:var(--ink);border:2px solid var(--ink);` : `background:transparent;color:var(--ink);border:2px solid transparent;`}">${label}</a>
`

app.get("/", (c) => {
  const likes = [
    { emoji: "⚽", name: "Soccer", color: "var(--mint)" },
    { emoji: "🌺", name: "Hula", color: "var(--coral)" },
    { emoji: "🎨", name: "Art", color: "var(--grape)" },
    { emoji: "✂️", name: "Making Things", color: "var(--sun)" },
    { emoji: "🧁", name: "Baking Brownies", color: "var(--sky)" },
    { emoji: "🧻", name: "Paper Squishies", color: "var(--leaf)" },
  ]
  return c.html(
    <Layout title="Noe's Website" active="/">
      <main class="relative z-10 px-5 sm:px-10">
        <section class="pt-8 sm:pt-14 pb-6 text-center">
          <div class="hand pop d1" style="font-size:1.8rem;color:var(--mint);">hi friends! welcome to my website</div>
          <h1 class="pop d2 font-700 mt-2" style="font-weight:700;font-size:clamp(3rem,14vw,8rem);line-height:0.95;color:var(--ink);">
            I'm <span style="color:var(--coral);">Noe</span>!
          </h1>
          <p class="pop d3 mt-5 mx-auto" style="max-width:32rem;font-size:1.1rem;color:rgba(74,59,47,0.8);">
            I'm almost <b>10</b>! I love soccer, hula, and making all kinds of stuff.
            Look around and say hi to my new pets! 🐛🐛
          </p>
        </section>

        <section class="mt-6">
          <h2 class="hand text-center mb-5" style="font-size:2rem;color:var(--grape);">stuff I love ♡</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto">
            {likes.map((it, i) => html`
              <div class="sticker pop d${(i % 6) + 1} p-5 flex flex-col items-center gap-2 text-center" style="background:${it.color};">
                <span style="font-size:2.8rem;line-height:1;" class="bobble">${it.emoji}</span>
                <span class="font-600" style="font-weight:600;font-size:1.05rem;">${it.name}</span>
              </div>
            `)}
          </div>
        </section>

        <section class="mt-12 max-w-3xl mx-auto">
          <div class="sticker pop d2 relative p-6 sm:p-8 text-center" style="background:var(--cream-2);">
            <div class="tape"></div>
            <div style="font-size:3.5rem;" class="wobble">🐛 🐛</div>
            <h3 class="font-700 mt-2" style="font-weight:700;font-size:clamp(1.4rem,5vw,2rem);color:var(--coral);">Meet Pinky &amp; Parry!</h3>
            <p class="mt-2" style="color:rgba(74,59,47,0.8);">My two roly-polies live in a habitat I made and they're munching on fish food right now. 🐟</p>
            <a href="/pets" class="inline-block mt-4 px-6 py-3 rounded-full font-600" style="font-weight:600;background:var(--sky);border:2px solid var(--ink);box-shadow:4px 5px 0 rgba(74,59,47,0.2);">meet them →</a>
          </div>
        </section>
      </main>
    </Layout>
  )
})

app.get("/soccer", (c) => {
  const players = [
    { name: "Mia Hamm", emoji: "🇺🇸", note: "a total legend", color: "var(--coral)" },
    { name: "Alex Morgan", emoji: "⭐", note: "so good at scoring", color: "var(--sun)" },
    { name: "Messi", emoji: "🐐", note: "the GOAT", color: "var(--mint)" },
    { name: "Gisele Thompson", emoji: "✨", note: "rising star", color: "var(--grape)" },
  ]
  return c.html(
    <Layout title="Soccer · Noe" active="/soccer">
      <main class="relative z-10 px-5 sm:px-10 pt-8 text-center">
        <div class="hand pop d1" style="font-size:1.8rem;color:var(--mint);">my favorite thing ever</div>
        <h1 class="pop d2 font-700 mt-1" style="font-weight:700;font-size:clamp(2.5rem,10vw,5.5rem);color:var(--ink);">Soccer ⚽</h1>
        <p class="pop d3 mt-3 mx-auto" style="max-width:30rem;color:rgba(74,59,47,0.8);">These are my favorite soccer players in the whole world!</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mt-10">
          {players.map((p, i) => html`
            <div class="sticker pop d${(i % 6) + 1} p-6 flex items-center gap-4 text-left" style="background:${p.color};">
              <span style="font-size:3rem;" class="bobble">${p.emoji}</span>
              <div>
                <div class="font-700" style="font-weight:700;font-size:1.4rem;">${p.name}</div>
                <div class="hand" style="font-size:1.2rem;">${p.note}</div>
              </div>
            </div>
          `)}
        </div>

        <a href="/" class="inline-block mt-10 hand" style="font-size:1.4rem;color:var(--coral);">← back home</a>

        <div class="pop d6 mt-12">
          <div class="sticker inline-block px-6 py-4" style="background:var(--sun);">
            <span class="bobble" style="font-size:2.4rem;">🏆</span>
            <span class="hand" style="font-size:1.6rem;margin-left:0.5rem;">my goal: team USA one day!</span>
          </div>
        </div>
      </main>
    </Layout>
  )
})

app.get("/makes", (c) => {
  const makes = [
    { emoji: "🧻", name: "Paper Squishies", note: "my newest hobby! I fold and paint them", color: "var(--leaf)" },
    { emoji: "🎨", name: "Art", note: "drawing and painting all the time", color: "var(--grape)" },
    { emoji: "🧁", name: "Brownies", note: "warm, gooey, and SO good", color: "var(--sun)" },
    { emoji: "✂️", name: "Crafts", note: "I make things out of almost anything", color: "var(--coral)" },
  ]
  return c.html(
    <Layout title="Things I Make · Noe" active="/makes">
      <main class="relative z-10 px-5 sm:px-10 pt-8 text-center">
        <div class="hand pop d1" style="font-size:1.8rem;color:var(--grape);">my craft corner</div>
        <h1 class="pop d2 font-700 mt-1" style="font-weight:700;font-size:clamp(2.3rem,9vw,5rem);color:var(--ink);">Things I Make ✂️</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mt-10">
          {makes.map((m, i) => html`
            <div class="sticker pop d${(i % 6) + 1} p-6 text-left" style="background:${m.color};">
              <span style="font-size:3rem;" class="wobble">${m.emoji}</span>
              <div class="font-700 mt-2" style="font-weight:700;font-size:1.3rem;">${m.name}</div>
              <div class="hand" style="font-size:1.25rem;">${m.note}</div>
            </div>
          `)}
        </div>

        <a href="/" class="inline-block mt-10 hand" style="font-size:1.4rem;color:var(--coral);">← back home</a>
      </main>
    </Layout>
  )
})

app.get("/pets", (c) => {
  return c.html(
    <Layout title="My Pets · Noe" active="/pets">
      <main class="relative z-10 px-5 sm:px-10 pt-8 text-center">
        <div class="hand pop d1" style="font-size:1.8rem;color:var(--sky);">my newest friends</div>
        <h1 class="pop d2 font-700 mt-1" style="font-weight:700;font-size:clamp(2.2rem,8vw,4.5rem);color:var(--ink);">My Roly-Polies 🐛</h1>

        <div class="sticker pop d3 max-w-2xl mx-auto mt-8 p-8" style="background:var(--cream-2);">
          <div style="font-size:5rem;" class="wobble">🐛 🐛</div>
          <p class="mt-4" style="font-size:1.15rem;color:rgba(74,59,47,0.85);">
            Meet <b style="color:var(--coral);">Pinky</b> and <b style="color:var(--leaf);">Parry</b>
            (short for Parrot)! I just adopted them and right now they are eating
            <b> fish food</b> in the special habitat I built for them. 🏠
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-md mx-auto">
            <div class="sticker p-5" style="background:var(--coral);">
              <div style="font-size:2.4rem;" class="bobble">🐛</div>
              <div class="font-700 mt-1" style="font-weight:700;font-size:1.3rem;">Pinky</div>
              <div class="hand" style="font-size:1.15rem;">the pink one 💕</div>
            </div>
            <div class="sticker p-5" style="background:var(--leaf);">
              <div style="font-size:2.4rem;" class="bobble">🐛</div>
              <div class="font-700 mt-1" style="font-weight:700;font-size:1.3rem;">Parry</div>
              <div class="hand" style="font-size:1.15rem;">short for Parrot 🦜</div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div class="sticker p-4" style="background:var(--leaf);">
              <div style="font-size:2rem;">🏠</div>
              <div class="font-600 mt-1" style="font-weight:600;">Their Habitat</div>
              <div class="hand" style="font-size:1.1rem;">I made it myself!</div>
            </div>
            <div class="sticker p-4" style="background:var(--sun);">
              <div style="font-size:2rem;">🐟</div>
              <div class="font-600 mt-1" style="font-weight:600;">Snack Time</div>
              <div class="hand" style="font-size:1.1rem;">fish food yum</div>
            </div>
            <div class="sticker p-4" style="background:var(--coral);">
              <div style="font-size:2rem;">2️⃣</div>
              <div class="font-600 mt-1" style="font-weight:600;">How Many</div>
              <div class="hand" style="font-size:1.1rem;">a little duo!</div>
            </div>
          </div>
        </div>

        <a href="/" class="inline-block mt-10 hand" style="font-size:1.4rem;color:var(--coral);">← back home</a>
      </main>
    </Layout>
  )
})

export default app
