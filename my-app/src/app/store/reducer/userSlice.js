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
      // localStorage.setItem("user", JSON.stringify(state.user));
    },
    //je push le nouveau tableau dans user
    addTable: (state, action) => {
      console.log("actionlist",action.payload);
      let table = action.payload.hasOwnProperty('list') ? action.payload : {...action.payload, list: []};

      // if (state.user.table.length === 0) {
      //   state.user.table.push({ list: [] });
      // // state.user.table.push(action.payload);const 
      // }

      state.user.table.push(table);
      // localStorage.setItem("user", JSON.stringify(state.user));
    },
    //je supprime une table
    removeTable: (state, action) => {
      const TableId = action.payload;
      state.user.table = state.user.table.filter(
        (table) => table.id !== TableId
      );
      // localStorage.setItem("user", JSON.stringify(state.user));
    },
    modifyTable: (state, action) => {
      //modifier le m du tableau avec l'id spécifié
      const tableIndex = state.user.table.findIndex(
        (t) => t.id === action.payload.id
      );
      //si un element corepond a l'id je lui donne le name
      if (tableIndex !== -1) {
        const updatedTable = {
          ...state.user.table[tableIndex],
          name: action.payload.name,
        };
        // Remplacer l'ancien tableau par le nouveau dans l'état
        state.user.table[tableIndex] = updatedTable;
        // localStorage.setItem("user", JSON.stringify(state.user));
      }
    },

    addList: (state, action) => {
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
        // localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    //je supprime une liste
    removeList: (state, action) => {
      console.log(action);
      const listId = action.payload.id;
      console.log("je passe bien ici ", action.payload);

      const tableIndex = state.user.table.findIndex(
        (t) => t.id === parseInt(action.payload.table_id)
      );

      // Check that the tableIndex is not -1 and that the table at the index exists
      if (tableIndex !== -1 && state.user.table[tableIndex]) {
        state.user.table[tableIndex].list = state.user.table[
          tableIndex
        ].list.filter((e) => e.id !== listId);
        // localStorage.setItem('user', JSON.stringify(state.user));
      } else {
        console.error("Table not found");
      }
    },

    //je modifie la liste dans le tableau apres changement d'une des valeurs
    modifyList: (state, action) => {
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
          localStorage.setItem("user", JSON.stringify(state.user));
        } else {
          // Si la liste n'existe pas, l'ajouter à la fin du tableau
          state.user.table[tableIndex].list.push(action.payload);
        }
      }
    },
    addCard: (state, action) => {
      console.log("je passe bien ici ", action.payload);

      //trouve la table qui possede list_id
      for (let elem = 0; elem < state.user.table.length; elem++) {
        const table = state.user.table[elem];

        const listIndex = table.list.findIndex(
          (l) => l.id === action.payload.list_id
        );

        if (listIndex !== -1) {
          //je dois créer card = []   si elle n'existe pas
          if (!table.list[listIndex].card) {
            table.list[listIndex].card = [];
          }

          table.list[listIndex].card.push(action.payload);
          // localStorage.setItem('user', JSON.stringify(state.user));
          break;
        }
      }
    },
  },
});
export const {
  setUser,
  addTable,
  removeTable,
  addList,
  removeList,
  modifyList,
  modifyTable,
  addCard,
} = userSlice.actions;
export default userSlice.reducer;
      