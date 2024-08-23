import useCollections from "../hooks/useCollections";

const Collection = ({collection}) => {

    const { setEdit, deleteCollection  } = useCollections()

    const { name, text, _id} = collection

  return (
      <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
          <p className="font-bold uppercase text-indigo-700 my-2">Name: {''}
              <span className="font-normal normal-case text-black">{name}</span>
          </p>
          
          <p className="font-bold uppercase text-indigo-700 my-2">Descripcion: {''}
              <span className="font-normal normal-case text-black">{text}</span>
          </p>

          <div className="flex justify-between my-5">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold  rounded-lg"
                    onClick={() => setEdit(collection)}
                >Edit</button>

                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold  rounded-lg"
                    onClick={() => deleteCollection(_id)}
                >Delete</button>
          </div>
            

          
      </div>
  );
};

export default Collection;