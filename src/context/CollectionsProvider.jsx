import { createContext, useState, useEffect } from "react"
import axiosClient from "../config/axios"


const CollectionsContext = createContext()

export const CollectionsProvider = ({children}) => {

    const [collections, setCollections] = useState([])
    const [collection, setCollection] = useState({})

    useEffect(() => {
        const getCollections = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axiosClient('/collections', config)
                setCollections(data)

            } catch (error) {
                console.log(error)
            }
        }
        getCollections()
    }, [])

    const saveCollection = async (collection) => {

        const token = localStorage.getItem('token')
        const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

         if(collection.id) {
            try {
                const { data } = await axiosClient.put(`/collections/${collection.id}`, collection, config)

                const updatedCollections = collections.map( collectionState => collectionState._id === data._id ? data : collectionState )
                setCollections(updatedCollections)

            } catch (error) {
                console.log(error)
            }
         } else {

            try {
                const { data } = await axiosClient.post('/collections', collection, config )
                const { createdAt, updatedAt, __v, ...savedCollection} = data//create a new object without __v
                setCollections([savedCollection, ...collections])
            } catch (error) {
                console.log(error.response.data.msg) 
            }
         }
    }

    const setEdit = (collection) => {
        setCollection(collection)
    }

    const deleteCollection = async id => {
        const confirmed = confirm('Really want to delete?')

        if(confirmed) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axiosClient.delete(`/collections/${id}`, config)

                const  UpdateCollections = collections.filter( collectionState => collectionState._id !== id)
                setCollections(UpdateCollections)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return(
        <CollectionsContext.Provider
            value={{
                    collections,
                    saveCollection,
                    setEdit,
                    collection,
                    deleteCollection
            }}
        >
            {children}
        </CollectionsContext.Provider>
    )
}

export default CollectionsContext;