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

    addTable: (state, action) => {
      state.user.table.push(action.payload);
    },
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
  },
});

export const { setUser, addTable, removeTable, addList } = userSlice.actions;

export default userSlice.reducer;
