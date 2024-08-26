import { useContext } from "react"
import CollectionsContext from "../context/CollectionsProvider"

const useCollections = () => {
    return useContext(CollectionsContext)
}

export default useCollections