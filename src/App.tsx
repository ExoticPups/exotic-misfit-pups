import { useMemo, useState } from "react";
import "./App.css";

type PuppyStatus = "Available" | "Hold" | "Sold";

type Puppy = {
 id: string;
 name: string;
 breed: string;
 color: string;
 sex: "Male" | "Female";
 price: number;
 status: PuppyStatus;
 breederSlug: string;
 breederName: string;
};

type BreederApplication = {
 id: string;
 businessName: string;
 contactName: string;
 email: string;
 state: string;
 status: "Pending" | "Approved" | "Declined";
 submittedAt: string; // simple string for now
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
   name: "Nico",
   breed: "Yorkshire Terrier",
   color: "Chocolate",
   sex: "Male",
   price: 2800,
   status: "Hold",
   breederSlug: "jeanies-minis",
   breederName: "Jeanie’s Minis",
 },
 {
   id: "p3",
   name: "Luna",
   breed: "Yorkshire Terrier",
   color: "Blue & Tan",
   sex: "Female",
   price: 3500,
   status: "Sold",
   breederSlug: "emp-verified",
   breederName: "EMP Verified",
 },
];

const MOCK_APPLICATIONS: BreederApplication[] = [
 {
   id: "a1",
   businessName: "Starfall Yorkies",
   contactName: "Jamie",
   email: "hello@starfallyorkies.com",
   state: "TX",
   status: "Pending",
   submittedAt: "2026-02-19",
 },
 {
   id: "a2",
   businessName: "Tiny Royal Paws",
   contactName: "Kelsey",
   email: "contact@tinyroyalpaws.com",
   state: "OK",
   status: "Pending",
   submittedAt: "2026-02-20",
 },
];

function money(n: number) {
 return new Intl.NumberFormat("en-US", {
   style: "currency",
   currency: "USD",
   maximumFractionDigits: 0,
 }).format(n);
}

export default function App() {
 const [query, setQuery] = useState("");
 const [statusFilter, setStatusFilter] = useState<PuppyStatus | "All">("All");

 const puppies = useMemo(() => {
   const q = query.trim().toLowerCase();

   return MOCK_PUPPIES.filter((p) => {
     const matchesQuery =
       !q ||
       p.name.toLowerCase().includes(q) ||
       p.breed.toLowerCase().includes(q) ||
       p.color.toLowerCase().includes(q) ||
       p.breederName.toLowerCase().includes(q);

     const matchesStatus = statusFilter === "All" ? true : p.status === statusFilter;

     return matchesQuery && matchesStatus;
   });
 }, [query, statusFilter]);

 return (
   <div className="appShell">
     <header className="topBar">
       <div className="brand">
         <div className="brandMark">EMP</div>
         <div className="brandText">
           <div className="brandName">Exotic Misfit Pups</div>
           <div className="brandTag">Dark Theme Homepage (Vite + React + TS)</div>
         </div>
       </div>

       <nav className="topNav">
         <a className="navLink" href="#puppies">
           Puppies
         </a>
         <a className="navLink" href="#breeders">
           Breeders
         </a>
         <a className="navLink" href="#apply">
           Apply
         </a>
       </nav>
     </header>

     <main className="page">
       <section className="hero">
         <h1 className="heroTitle">Find rare & exotic puppies — ethically.</h1>
         <p className="heroText">
           A marketplace built for breeders and families who love the “misfits” — merles, chocolates,
           blues, and everything in between.
         </p>

         <div className="heroControls">
           <div className="control">
             <label className="label">Search</label>
             <input
               className="input"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Search name, color, breeder…"
             />
           </div>

           <div className="control">
             <label className="label">Status</label>
             <select
               className="select"
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value as PuppyStatus | "All")}

               <option value="All">All</option>
               <option value="Available">Available</option>
               <option value="Hold">Hold</option>
               <option value="Sold">Sold</option>
             </select>
           </div>
         </div>
       </section>

       <section id="puppies" className="section">
         <div className="sectionHeader">
           <h2 className="sectionTitle">Available Puppies</h2>
           <div className="sectionSub">{puppies.length} shown</div>
         </div>

         <div className="grid">
           {puppies.map((p) => (
             <article key={p.id} className="card">
               <div className="cardTop">
                 <div className="cardTitleRow">
                   <div className="cardTitle">{p.name}</div>
                   <span className={`status status-${p.status.toLowerCase()}`}>{p.status}</span>
                 </div>
                 <div className="cardSub">
                   {p.breed} • {p.sex} • {p.color}
                 </div>
               </div>

               <div className="cardBottom">
                 <div className="price">{money(p.price)}</div>
                 <a className="link" href={`#breeder-${p.breederSlug}`}>
                   View breeder →
                 </a>
               </div>
             </article>
           ))}
         </div>
       </section>

       <section id="breeders" className="section">
         <div className="sectionHeader">
           <h2 className="sectionTitle">Breeders</h2>
           <div className="sectionSub">Profiles & verification coming next</div>
         </div>

         <div className="miniPanels">
           <div className="miniPanel" id="breeder-exoticpups">
             <div className="miniTitle">ExoticPups</div>
             <div className="miniText">Micro Yorkies • rare colors • ethical placement</div>
           </div>

           <div className="miniPanel" id="breeder-jeanies-minis">
             <div className="miniTitle">Jeanie’s Minis</div>
             <div className="miniText">Tiny companions • education-first puppy packs</div>
           </div>

           <div className="miniPanel" id="breeder-emp-verified">
             <div className="miniTitle">EMP Verified</div>
             <div className="miniText">Verified badge system (coming soon)</div>
           </div>
         </div>
       </section>

       <section id="apply" className="section">
         <div className="sectionHeader">
           <h2 className="sectionTitle">Breeder Applications</h2>
           <div className="sectionSub">Applications are reviewed before profiles go live.</div>
         </div>

         <div className="tableWrap">
           <table className="table">
             <thead>
               <tr>
                 <th>Business</th>
                 <th>Contact</th>
                 <th>Email</th>
                 <th>State</th>
                 <th>Status</th>
                 <th>Submitted</th>
               </tr>
             </thead>
             <tbody>
               {MOCK_APPLICATIONS.map((a) => (
                 <tr key={a.id}>
                   <td>{a.businessName}</td>
                   <td>{a.contactName}</td>
                   <td>{a.email}</td>
                   <td>{a.state}</td>
                   <td>{a.status}</td>
                   <td>{a.submittedAt}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>

         <div className="note">
           Next step: we can add a real application form + connect to a database (Supabase / Firebase)
           when you’re ready.
         </div>
       </section>
     </main>

     <footer className="footer">
       <div>© {new Date().getFullYear()} Exotic Misfit Pups</div>
     </footer>
   </div>
 );
}

export default App;
