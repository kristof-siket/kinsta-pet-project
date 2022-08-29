import  {useState, useEffect} from 'react'

export const useFetch = (url:string) => {

    const [data, setData] = useState(null) 
/*     const [data, setData] = useState<[] | [] | {[key:string]:any}>({}) */
    const [isPending, SetIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        const abortCont = new AbortController(); //to stop the fetch in the background when we change the router

        setTimeout(() => {
            fetch(url, {signal: abortCont.signal})
                .then(res => {
                    if(!res.ok){
                        throw Error('could not fetch the data for that resource')
                    }
                    return res.json()
                })
                .then ((data) =>{
                    setData(data)
                    SetIsPending(false)
                    setError(null)
                })
                .catch(err=>{
                    if (err.name === 'AbortError') {
                        console.log("fetch aborted")
                    } else{
                        SetIsPending(false)
                        setError(err.message)
                    }
                })
        }, 1000)
    
        return () => abortCont.abort()
      }, [url])

      return { data, isPending, error}
}

export default useFetch


