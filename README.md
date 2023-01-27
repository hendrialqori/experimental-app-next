# Next JS [Experimental-app]

### Data fetching (server side / client side)
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


**When we should use Client / Server component ?**
| When ..       | Server        | Client        |
| ------------- | ------------- |-------------- |
| Data fetching  | ✅ | ✅ |
| Direct access to backend | ✅ | ❌ |
| Storage sensitve data (token, api key, etc) | ✅| ❌ |
| Reduce dependency js client side | ✅ | ❌ |
| Interactivity user / Add event listener | ❌ | ✅
| Use of Hooks (useState, useEffect, useReducers, useRef, etc) | ❌ | ✅
