import { Link } from "react-router-dom";
import { useDeleteTableByUserMutation,useModifyTableByUserMutation } from "../../store/api/api";
import { removeTable } from "../../store/reducer/userSlice";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";

import React , {useState}from "react";

import { BsFillTrash2Fill, BsPencilFill } from "react-icons/bs";

function Titles({ names, index, className, tableId, userId }) {
  const dispatch = useDispatch();
  const [deleteTableMutation] = useDeleteTableByUserMutation();
  const [modifyTableByUser] = useModifyTableByUserMutation();

  //modifcation du nom de tableau
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState("");
  const [value, setValue] = useState("");

  // const getContentUserQuery = useGetContentByUserQuery();

  // modifyTableByUser: builder.mutation({
  //   query: (id) => ({
  //     url: `tables/${id}`,
  //     method: "PATCH",
  //     body: { name: body.name },
  //   }),
  const handleTitleChange = (e) => {
    setInput(e.target.value);
    console.log(input);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
  };



async function handleModifyTable() { 
  try {
    console.log("je rentre dans mon handleModifyTable", tableId);
    const result = await modifyTableByUser({ tableId, });
    if (result) {
      console.log("result", result.data);
      dispatch(modifyTableByUser(result.data));
    }
  } catch (error) {
    console.error(error);
  }
}

  async function handlDeleteTable() {
    try {
      // au click je recupere l'id du tableaupour le delete en bdd
      const result = await deleteTableMutation(tableId);
      if (result) {
        dispatch(removeTable(tableId));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Link to={`/decks/${tableId}`} >
        <div key={index}>
          {names}
          <button className="titles__button">
            <BsPencilFill onClick={handleModifyTable}/>
            <BsFillTrash2Fill onClick={handlDeleteTable} />
          </button>
        </div>
      </Link>
    </>
  );
}

export default React.memo(Titles);
