import Collection from "./Collection";
import useCollections from "../hooks/useCollections";


const ListCollection = () => {

  const { collections } = useCollections()

  return (
    <>
        { collections.length ? 
        (
            <>
                <h2 className="font-black text-3xl text-center">Collection list</h2>

                <p className="text-xl mt-5 mb-10 text-center">
                    Manage your {''}
                    <span className="text-indigo-600 font-bold">Collections</span>
                </p>

                {collections.map( collection => (
                    <Collection //recorriendo array
                        key={collection._id}
                        paciente={collection}
                    />
                ))}
            </>
        ) : 
        (
            <>
                <h2 className="font-black text-3xl text-center">No collections</h2>

                <p className="text-xl mt-5 mb-10 text-center">
                    Start adding collections {''}
                    <span className="text-indigo-600 font-bold">and will appear hear</span>
                </p>
            </>
        )}
    </>
)
};

export default ListCollection;
