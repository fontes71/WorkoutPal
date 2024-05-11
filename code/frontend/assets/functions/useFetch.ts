import {
    useState,
    useEffect,
} from 'react'

export function useFetch({uri, method, data}:{uri:string, method: string, data: Record<string, any>}) : any | null{
    const [content, setContent] = useState<any>()
    const requestOptions: RequestInit = {
        method: method ?? 'GET', // Use method if not null, otherwise the default value is 'GET'
        headers: {
          'Content-Type': 'application/json'
        }
      };
    
      if (data !== null) {
        requestOptions.body = JSON.stringify(data); // Set body if data is not null
      }

    useEffect(() => {
        let canceled = false
        async function doFetch() { 
            const response = await fetch(uri, requestOptions)
            if(canceled) return
            const body = await response.json()
            if(canceled) return
            setContent(body)
        }
        setContent(null)
        doFetch()
        return ()=>{
            canceled=true
        }
         
     }, [uri])

     return content
}