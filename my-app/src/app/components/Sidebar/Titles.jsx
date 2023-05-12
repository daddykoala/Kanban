import { useDeleteTableByUserMutation , useGetContentByUserQuery
  } from '../../store/api/api';
  import { setUser } from '../../store/reducer/userSlice';

  import { useDispatch } from 'react-redux';


import React from 'react';

import { BsFillTrash2Fill,BsPencilFill } from 'react-icons/bs'; 

function Titles({names,index,className, tableId,userId}) {
  console.log(typeof tableId);
  const dispatch = useDispatch();
  const [deleteTableMutation] = useDeleteTableByUserMutation();
  // const getContentUserQuery = useGetContentByUserQuery();

   async function handlDeleteTable(){
    try  {
    // au click je recupere l'id du tableaupour le delete en bdd
    const result= await deleteTableMutation(tableId);
    console.log(result);  
    dispatch(setUser(result.data));

    }catch(error){
      console.error(error);
    } 

    // je dispatch le nouveau user dans le store

//je vais devoir dispatcher le nouveau user dans le store
  }



  return (
    <div key={index} >{names} 
    <span className="titles__button">
      <BsPencilFill/>
      <BsFillTrash2Fill onClick={handlDeleteTable} />

      </span>
      
    </div>
  )
}

export default React.memo(Titles);