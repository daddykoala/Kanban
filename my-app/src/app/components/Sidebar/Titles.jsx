import { Link } from "react-router-dom";
import { useDeleteTableByUserMutation } from "../../store/api/api";
import { removeTable } from "../../store/reducer/userSlice";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";

import React from "react";

import { BsFillTrash2Fill, BsPencilFill } from "react-icons/bs";

function Titles({ names, index, className, tableId, userId }) {
  const dispatch = useDispatch();
  const [deleteTableMutation] = useDeleteTableByUserMutation();
  // const getContentUserQuery = useGetContentByUserQuery();

  // modifyTableByUser: builder.mutation({
  //   query: (id) => ({
  //     url: `tables/${id}`,
  //     method: "PATCH",
  //     body: { name: body.name },
  //   }),



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
            <BsPencilFill />
            <BsFillTrash2Fill onClick={handlDeleteTable} />
          </button>
        </div>
      </Link>
    </>
  );
}

export default React.memo(Titles);
