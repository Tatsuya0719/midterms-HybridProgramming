# Reflection Paper

## Hybrid Programming Midterms

# Routing Mapping

midterms/  
├── app/  
│   ├── layout.tsx                 \# Global Navigation & Layout  
│   ├── page.tsx                   \# Landing/Home Page  
│   ├── dashboard/  
│   │   ├── loading.tsx            \# Streaming fallback for Dashboard  
│   │   └── page.tsx               \# SSR: User Dashboard  
│   ├── posts/  
│   │   └── page.tsx               \# ISR: Posts Feed  
│   ├── products/  
│   │   ├── page.tsx               \# SSG: Products Listing  
│   │   └── \[id\]/  
│   │       └── page.tsx           \# SSG: Product Details (generateStaticParams)  
│   └── todos/  
│       └── page.tsx               \# CSR Core: Interactivity leaf container  
└── components/  
    ├── AddToCartButton.tsx        \# CSR Leaf component  
    └── TodoList.tsx               \# CSR Interactive filter component

# 

# Rendering Justification Matrix

| Page Route | Strategy  | Justification |
| :---- | :---- | :---- |
| /products | SSG | Product catalogs change infrequently and benefit heavily from CDN caching. Serving raw pre-rendered HTML optimizes SEO indexing  |
| /products/\[id\] | SSG | By mapping top-performing inventory items at build-time, specific asset paths load dynamically without causing on-the-fly execution lags or server overhead database lookup requests |
| /dashboard | SSR |  |
| /posts | ISR | Social content/activity streams demand global freshness but do not justify wasting runtime CPU cycles processing the exact same timeline markup repeatedly. Setting revalidate: 60 offers a performance balance |
| /todos | CSR | Interactive dashboard tooling requires reactive, browser-level UI updates. Leaving this on the server would lead to slow network round-trips for simple filter operations.  |

# 

# Caching and Optimization Defense

* **Forcing Fresh Server Data** (SSR): Inside \`app/dashboard/page.tsx\`, I explicitly told Next.js not to save any cached data by using the \`force-dynamic\` setting and adding \`{ cache: "no-store" }\` directly inside our user and cart \`fetch\` requests.  
* **Setting Background Timers** (ISR): Inside \`app/posts/page.tsx\`, we used \`{ next: { revalidate: 60 } }\` to tell the app it is safe to serve a fast cached file, but to refresh it in the background at most once every minute.   
* **Stopping Network Waterfalls:** A common mistake is loading data sequentially (waiting for Users to completely finish loading before starting to load Carts). This creates a "waterfall" lag. I stopped this inside my Dashboard by making both fetch requests at the exact same time as separate promises, and then waiting for them to resolve together using \`Promise.all\`: 

  *// Both requests start running at the same instant in parallel*  
  *const usersPromise \= getUsers();*  
  *const cartsPromise \= getCarts();*  
    
  *// Wait for both to cross the finish line together*  
  *const \[userData, cartData\] \= await Promise.all(\[usersPromise, cartsPromise\]);*  
    
  I verified this works by checking our terminal logs; both API requests are fired during the exact same millisecond.

# Server vs. Client Boundaries

I placed the "use client" directive at the very top of our components/TodoList.tsx and components/AddToCartButton.tsx files. This logic belongs in the browser for reasons that:

1. **Immediate State Toggling**: When a user checks a task box or clicks "Add to Cart," they expect a visual response instantly. Because these files live on the client side, our useState hooks can update the UI   
2. **Interactive Listening**: Features like onClick and onChange can only be heard by the browser. A Server Component has no concept of a user's mouse pointer or keyboard input.  
3. **Keeping the App Lightweight**: By isolating our interactive needs into small "leaf" components, the rest of our pages remain clean, ultra-fast Server Components that send less heavy JavaScript down to the user's computer.  
     
     
     
     
   