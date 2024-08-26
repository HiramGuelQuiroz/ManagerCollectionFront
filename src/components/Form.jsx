import { useState, useEffect } from 'react'
import Alert from './Alert';
import useCollections from '../hooks/useCollections';

const Form = () => {

    const [name, setName] = useState('')
    const [text, setText] = useState('')
    const [id, setId]= useState(null)

    const [alert, setAlert] = useState({})

    const { saveCollection, collection } = useCollections()

    useEffect(() => {
      if(collection?.name){
        setName(collection.name)
        setText(collection.text)
        setId(collection._id)
      }
    }, [collection])

    const handleSubmit = e => {
      e.preventDefault()

      if([name, text].includes('')) {
        setAlert({
          msg: 'All fields are required',
          error: true
        })
        return;
      }

      saveCollection({name, text, id})
      setAlert({
        msg: 'Save correctly'
      })

      setName('')
      setText('')
      setId('')
    }

    const { msg } = alert
    
    return (
        <>
          <h2 className="font-black text-3xl text-center">Manager Collection</h2>
  
          <p className="text-xl mt-5 mb-10 text-center">
              Add your collections and {''}
              <span className="text-indigo-600 font-bold">Manage them</span>
          </p>

        <form
          className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
          onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <label 
                  htmlFor="name" 
                  className="text-gray-700 uppercase font-bold"
                
                >Collection Name</label>
                <input 
                  id="name"
                  type="text"
                  placeholder="Collection Name"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
            </div>
  
            <div className="mb-5">
                <label 
                  htmlFor="text" 
                  className="text-gray-700 uppercase font-bold"
                >Collection description</label>
                <textarea 
                  id="text"
                  placeholder="Describe the collection"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={text}
                  onChange={e => setText(e.target.value)}
                />
            </div>
  
              <input
                  type="submit"
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                  value={ id ? 'Save Changes' : 'Add Collection'}
  
              />
        </form>
  
        {msg && <Alert alert={alert} />}
  
  
        </>
    )
  };
  
  export default Form;