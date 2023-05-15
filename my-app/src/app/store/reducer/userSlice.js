import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
//je push le nouveau tableau dans user
    addTable: (state, action) => {
      state.user.table.push(action.payload);
    },
    //je supprime une table 
    removeTable: (state, action) => {
      const TableId = action.payload;
      state.user.table = state.user.table.filter(
        (table) => table.id !== TableId
      );
    },

    addList: (state, action) => {
      console.log("mon action", action.payload);
      // Trouver l'index du tableau avec l'ID spécifié
      const tableIndex = state.user.table.findIndex(
        (t) => t.id === action.payload.table_id
      );
      if (tableIndex !== -1) {
        // Ajouter la nouvelle liste à la copie du tableau
        const updatedTable = {
          ...state.user.table[tableIndex],
          list: [...state.user.table[tableIndex].list, action.payload],
        };

        // Remplacer l'ancien tableau par le nouveau dans l'état
        state.user.table[tableIndex] = updatedTable;
        console.log("mon state apres mon submit", state.user.table[tableIndex]);
      }
    },
    //je supprime une liste 
    removeList: (state, action) => {
      const listId = action.payload;
      //je retrouve l'index de la table a laquelle je supprime une liste 
      const tableIndex = state.user.table.findIndex(
        (t) => t.id === action.payload.table_id
      );
      //je supprime la liste de la table
      state.user.table[tableIndex].list = state.user.table[tableIndex].list.filter((list) => list.id !== listId);
     
    },
    //je modifie la liste dans le tableau apres changement d'une des valeurs
    modifyList: (state, action) => {
      console.log("mon action", action.payload);
    
      const tableIndex = state.user.table.findIndex(
        (t) => t.id === action.payload.table_id
      );
      if (tableIndex !== -1) {
        const listIndex = state.user.table[tableIndex].list.findIndex(
          (l) => l.id === action.payload.id
        );
    
        if (listIndex !== -1) {
          // Si la liste existe déjà, la remplacer par la nouvelle liste
          state.user.table[tableIndex].list[listIndex] = action.payload;
        } else {
          // Si la liste n'existe pas, l'ajouter à la fin du tableau
          state.user.table[tableIndex].list.push(action.payload);
        }
    
        console.log("mon state apres mon submit", state.user.table[tableIndex]);
      }
    },
    
  },
      

});

export const { setUser, addTable, removeTable, addList, removeList, modifyList } = userSlice.actions;

export default userSlice.reducer;
