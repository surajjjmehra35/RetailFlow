import { ArrowRight, Boxes, BrainCircuit, ShoppingBasket } from "lucide-react";

export default function App() {
  return (
    <main className="shell">
      <nav className="nav">
        <div className="brand"><span className="brand-mark"><Boxes size={20} /></span> RetailFlow</div>
        <span className="status">PROJECT PREVIEW</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">B2B RETAILER ORDERING</p>
        <h1>Wholesale ordering,<br /><span>without the back-and-forth.</span></h1>
        <p className="intro">
          A simpler way for retailers to browse products, discover schemes and
          prepare orders — manually or with AI assistance.
        </p>
        <div className="actions">
          <button className="primary" onClick={() => alert("Catalogue flow is coming in the next build step.")}>
            Explore the experience <ArrowRight size={17} />
          </button>
          <span className="muted">Starter environment · Day 1</span>
        </div>
      </section>

      <section className="cards">
        <article className="card">
          <div className="icon"><ShoppingBasket /></div>
          <h2>Retailer catalogue</h2>
          <p>Browse dealer-priced products, check stock and see active schemes.</p>
        </article>
        <article className="card">
          <div className="icon"><BrainCircuit /></div>
          <h2>AI order capture</h2>
          <p>Turn everyday order messages into a reviewable draft — never an automatic order.</p>
        </article>
        <article className="card">
          <div className="icon"><Boxes /></div>
          <h2>One clear order desk</h2>
          <p>Keep confirmed orders and retailer activity visible to the sales team.</p>
        </article>
      </section>
      <footer>RetailFlow · Built for the FMCG distributor brief</footer>
    </main>
  );
}
