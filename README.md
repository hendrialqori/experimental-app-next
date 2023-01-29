# Next JS [Experimental-app]

### 1. Data fetching (server side / client side)
- **With Server Side**
```tsx

type TRequestGETFunc = () => Promise<TUser | undefined>

const GetUser: TRequestGETFunc = async () => {
    const request = await fetch('https://dummyjson.com/users', {
      next: {
        revalidate: 10 //10 Second
        // After 10s interval, will be give fresh data from server
      }
    }) 
    // cache: 'force-cache' is the default
    // To fetch fresh data on every fetch request, use the cache: 'no-store' option : 
    // fetch('https://...', { cache: 'no-store' });
    
    if(!request.ok){
      throw new Error('Something went wrong!')
      }
      
    return await request.json()
  }
  
export default async Home(){

    const userResponse = await GetUser()
    
    return <></>
  }
```
By fetching data inside the component, each fetch request and nested segment in the route cannot start fetching data and rendering until the previous request or segment has completed.


**When we should use Client / Server component ?**
| When ..       | Server        | Client        |
| ------------- | ------------- |-------------- |
| Data fetching  | ✅ | ✅ |
| Direct access to backend | ✅ | ❌ |
| Storage sensitve data (token, api key, etc) | ✅| ❌ |
| Reduce dependency js client side | ✅ | ❌ |
| Interactivity user / Add event listener | ❌ | ✅
| Use of Hooks (useState, useEffect, useReducers, useRef, etc) | ❌ | ✅

 ### 2. Fetching Patterns
 - **Parellel**  
 To minimize client-server waterfalls, we recommend this pattern to fetch data in parallel.  
 ```tsx
 const getData1 = async () => {
    const request = await fetch(...)
   }
 
const getData2 = async () => {
    const request = await fetch(...)
  }
  
export default async function Page(){
    const [data1, data2] = await Promise.all([getData1(), getData2()])
    
    return (<></>)
  }
 ```  
 - **Sequential**  
 To fetch data sequentially, you can fetch directly inside the component that needs it, or you can await the result of fetch inside the component that needs it.
 ```tsx
 async function Playlists({ artistID }) {
  // Wait for the playlists
  const playlists = await getArtistPlaylists(artistID);

  return (
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist.id}>{playlist.name}</li>
      ))}
    </ul>
  );
}

export default async function Page({ params: { username } }) {
  // Wait for the artist
  const artist = await getArtist(username);
  // If you add multiple requests here with `await`
  // fetches would be parallelized

  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Playlists artistID={artist.id} />
      </Suspense>
    </>
  );
}
 ```  
By fetching data inside the component, each fetch request and nested segment in the route cannot start fetching data and rendering until the previous request or segment has completed.  

 - **Blocking**  
By fetching data in a layout, rendering for all route segments beneath it can only start once the data has finished loading.
In the pages directory, pages using server-rendering would show the browser loading spinner until getServerSideProps had finished, then render the React component for that page. This can be described as "all or nothing" data fetching. Either you had the entire data for your page, or none.

In the app directory, you have additional options to explore:

First, you can use loading.js to show an instant loading state from the server while streaming in the result from your data fetching function.
Second, you can move data fetching lower in the component tree to only block rendering for the parts of the page that need it. For example, moving data fetching to a specific component rather than fetching it at the root layout.
Whenever possible, it's best to fetch data in the segment that uses it. This also allows you to show a loading state for only the part of the page that is loading, and not the entire page.
