import { useMemo, useState } from "react";
import "./App.css";

type Puppy = {
 id: string;
 name: string;
 breed: string;
 color: string;
 sex: "Male" | "Female";
 price: number;
 status: "Available" | "Hold" | "Sold";
 breederSlug: string;
 breederName: string;
};

const MOCK_PUPPIES: Puppy[] = [
 {
   id: "p1",
   name: "Skye",
   breed: "Yorkshire Terrier",
   color: "Merle",
   sex: "Female",
   price: 3200,
   status: "Available",
   breederSlug: "exoticpups",
   breederName: "ExoticPups",
 },
 {
   id: "p2",
   name: "Nova",
   breed: "Yorkshire Terrier",
   color: "Chocolate",
   sex: "Female",
   price: 2800,
   status: "Available",
   breederSlug: "exoticpups",
   breederName: "ExoticPups",
 },
 {
   id: "p3",
   name: "Onyx",
   breed: "Yorkshire Terrier",
   color: "Black/Gold",
   sex: "Male",
   price: 2400,
   status: "Hold",
   breederSlug: "exoticpups",
   breederName: "ExoticPups",
 },
 {
   id: "p4",
   name: "Luna",
   breed: "Yorkshire Terrier",
   color: "Parti",
   sex: "Female",
   price: 3000,
   status: "Sold",
   breederSlug: "exoticpups",
   breederName: "ExoticPups",
 },
];

function money(n: number) {
 return new Intl.NumberFormat("en-US", {
   style: "currency",
   currency: "USD",
   maximumFractionDigits: 0,
 }).format(n);
}

function Pill({ children }: { children: React.ReactNode }) {
 return <span className="pill">{children}</span>;
}

function Tag({
 tone,
 children,
}: {
 tone: "aqua" | "pink" | "lilac" | "muted";
 children: React.ReactNode;
}) {
 return <span className={`tag tag-${tone}`}>{children}</span>;
}

export default function App() {
 const [breed, setBreed] = useState("");
 const [color, setColor] = useState("");
 const [status, setStatus] = useState<"" | Puppy["status"]>("");

 const filtered = useMemo(() => {
   return MOCK_PUPPIES.filter((p) => {
     const okBreed =
       !breed.trim() || p.breed.toLowerCase().includes(breed.toLowerCase());
     const okColor =
       !color.trim() || p.color.toLowerCase().includes(color.toLowerCase());
     const okStatus = !status || p.status === status;
     return okBreed && okColor && okStatus;
   });
 }, [breed, color, status]);

 return (
   <div className="app">
     {/* Glow backdrop */}
     <div className="glow glow-aqua" />
     <div className="glow glow-pink" />
     <div className="glow glow-lilac" />

     {/* Top nav */}
     <header className="topbar">
       <div className="brand">
         <div className="brandMark" aria-hidden="true">
           <span className="spark" />
           <span className="spark" />
           <span className="spark" />
         </div>
         <div className="brandText">
           <div className="brandName">Exotic Misfit Pups</div>
           <div className="brandSub">Rare • Ethical • Verified</div>
         </div>
       </div>

       <nav className="nav">
         <a className="navLink" href="#puppies">
           Find Puppies
         </a>
         <a className="navLink" href="#breeders">
           Breeders
         </a>
         <a className="navLink" href="#apply">
           Apply
         </a>
       </nav>

       <div className="navCtas">
         <button className="btn btnGhost" type="button">
           Sign In
         </button>
         <button className="btn btnNeon" type="button">
           Apply as Verified Breeder
         </button>
       </div>
     </header>

     {/* Hero */}
     <main className="container">
       <section className="hero">
         <div className="heroLeft">
           <div className="kicker">
             <Tag tone="aqua">EMP Verified</Tag>
             <Tag tone="pink">Exotic Colors Welcome</Tag>
             <Tag tone="lilac">Buyer-Safe Marketplace</Tag>
           </div>

           <h1 className="headline">
             The dark-luxe marketplace for{" "}
             <span className="grad">rare &amp; exotic</span> pups.
           </h1>

           <p className="subhead">
             A GoodDog-style experience — but built for breeders &amp; buyers
             who want exotic colors, high standards, and real transparency.
           </p>

           <div className="heroBtns">
             <a className="btn btnPrimary" href="#puppies">
               Browse Puppies
             </a>
             <a className="btn btnGlass" href="#apply">
               Breeder Application
             </a>
           </div>

           <div className="trustRow">
             <Pill>Manual approval</Pill>
             <Pill>Verified profiles</Pill>
             <Pill>Search by breed/color</Pill>
             <Pill>Puppy → Breeder profile flow</Pill>
           </div>
         </div>

         <div className="heroRight">
           <div className="panel">
             <div className="panelTop">
               <div>
                 <div className="panelTitle">Quick Search</div>
                 <div className="panelSub">
                   Find pups fast (demo filters — real database comes next)
                 </div>
               </div>
               <Tag tone="muted">Live Preview</Tag>
             </div>

             <div className="filters" id="puppies">
               <label className="field">
                 <span>Breed</span>
                 <input
                   value={breed}
                   onChange={(e) => setBreed(e.target.value)}
                   placeholder="Yorkie, Frenchie, etc."
                 />
               </label>
               <label className="field">
                 <span>Color</span>
                 <input
                   value={color}
                   onChange={(e) => setColor(e.target.value)}
                   placeholder="Merle, Parti, Chocolate..."
                 />
               </label>
               <label className="field">
                 <span>Status</span>
                 <select
                   value={status}
                   onChange={(e) =>
                     setStatus(e.target.value as "" | Puppy["status"])
                   }

                   <option value="">Any</option>
                   <option value="Available">Available</option>
                   <option value="Hold">Hold</option>
                   <option value="Sold">Sold</option>
                 </select>
               </label>
             </div>

             <div className="grid">
               {filtered.map((p) => (
                 <article key={p.id} className="card">
                   <div className="cardTop">
                     <div className="avatar" aria-hidden="true">
                       {p.name.slice(0, 1)}
                     </div>
                     <div className="cardMeta">
                       <div className="cardName">
                         {p.name} <span className="dim">• {p.sex}</span>
                       </div>
                       <div className="cardSub">
                         {p.breed} • <span className="emph">{p.color}</span>
                       </div>
                     </div>

                     <span
                       className={`status ${
                         p.status === "Available"
                           ? "status-available"
                           : p.status === "Hold"
                           ? "status-hold"
                           : "status-sold"
                       }`}

                       {p.status}
                     </span>
                   </div>

                   <div className="cardBottom">
                     <div className="price">{money(p.price)}</div>
                     <a className="link" href="#breeders">
                       View breeder →
                     </a>
                   </div>
                 </article>
               ))}
             </div>
           </div>

           <div className="miniPanels">
             <div className="mini">
               <div className="miniTitle">Breeder Approval</div>
               <div className="miniText">
                 Applications are reviewed before profiles go live.
               </div>
             </div>
             <div className="mini">
               <div className="miniTitle">EMP Profile Pages</div>
               <div className="miniText">
                 Each pup links directly to the breeder’s verified profile.
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Breeder section */}
       <section className="section" id="breeders">
         <div className="sectionHead">
           <h2>Breeders (Verified + Exotic-friendly)</h2>
           <p>
             Buyers see trust indicators first — then pups. This keeps the vibe
             premium and the marketplace safer.
           </p>
         </div>

         <div className="breederGrid">
           <div className="breederCard">
             <div className="breederTop">
               <div className="breederBadge">EMP VERIFIED</div>
               <div className="breederName">ExoticPups</div>
               <div className="breederSub">
                 Micro Yorkies • Exotic colors • Transparent standards
               </div>
             </div>
             <div className="breederStats">
               <Pill>4 pups listed</Pill>
               <Pill>TX region</Pill>
               <Pill>Health-first</Pill>
             </div>
             <div className="breederActions">
               <button className="btn btnGlass" type="button">
                 View Profile
               </button>
               <button className="btn btnPrimary" type="button">
                 View Puppies
               </button>
             </div>
           </div>

           <div className="breederCard">
             <div className="breederTop">
               <div className="breederBadge ghost">PENDING VERIFICATION</div>
               <div className="breederName dim">Coming Soon</div>
               <div className="breederSub">
                 This slot will populate as new breeders are approved.
               </div>
             </div>
             <div className="breederStats">
               <Pill>Manual review</Pill>
               <Pill>Profile required</Pill>
               <Pill>Badge shown</Pill>
             </div>
             <div className="breederActions">
               <a className="btn btnNeon" href="#apply">
                 Apply Now
               </a>
             </div>
           </div>
         </div>
       </section>

       {/* Apply section */}
       <section className="section" id="apply">
         <div className="sectionHead">
           <h2>Apply to become an EMP Verified Breeder</h2>
           <p>
             This is the start of your approval flow. Next we’ll wire it to a
             database + admin approve/reject.
           </p>
         </div>

         <div className="apply">
           <form
             className="applyForm"
             onSubmit={(e) => {
               e.preventDefault();
               alert(
                 "Demo submit ✅ Next step: connect to database + approval dashboard."
               );
             }}

             <div className="row">
               <label className="field">
                 <span>Breeder/Program Name</span>
                 <input placeholder="ExoticPups, Jeanie’s Minis, etc." required />
               </label>
               <label className="field">
                 <span>Email</span>
                 <input type="email" placeholder="you@email.com" required />
               </label>
             </div>

             <div className="row">
               <label className="field">
                 <span>Location (State)</span>
                 <input placeholder="TX" required />
               </label>
               <label className="field">
                 <span>Main Breed(s)</span>
                 <input placeholder="Yorkies, Frenchies..." required />
               </label>
             </div>

             <label className="field">
               <span>Tell buyers about your standards</span>
               <textarea
                 placeholder="Health testing, vet care, contracts, socialization, etc."
                 rows={4}
                 required
               />
             </label>

             <div className="applyActions">
               <button className="btn btnPrimary" type="submit">
                 Submit Application
               </button>
               <span className="dim small">
                 You control approvals. Nothing goes live without review.
               </span>
             </div>
           </form>

           <div className="applySide">
             <div className="sideCard">
               <div className="sideTitle">What happens next?</div>
               <ol className="steps">
                 <li>Breeder submits application</li>
                 <li>You approve or reject in Admin</li>
                 <li>Approved breeders build profiles</li>
                 <li>Breeders list puppies</li>
                 <li>Buyers search → puppy → breeder profile</li>
               </ol>
             </div>
             <div className="sideCard glowBorder">
               <div className="sideTitle">EMP Look & Feel</div>
               <p className="dim">
                 Dark-luxe, neon accents, premium trust signals. This is your
                 new theme — nothing like the last site.
               </p>
             </div>
           </div>
         </div>
       </section>

       <footer className="footer">
         <div className="footerLeft">
           <div className="brandName">Exotic Misfit Pups</div>
           <div className="dim small">
             © {new Date().getFullYear()} • Built for rare colors + ethical
             standards
           </div>
         </div>
         <div className="footerRight">
           <a className="footerLink" href="#apply">
             Breeder Apply
           </a>
           <a className="footerLink" href="#puppies">
             Puppies
           </a>
           <a className="footerLink" href="#breeders">
             Breeders
           </a>
         </div>
       </footer>
     </main>
   </div>
 );
}
