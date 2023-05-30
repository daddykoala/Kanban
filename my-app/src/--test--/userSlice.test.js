import { userSlice, setUser, addTable, removeTable, modifyTable,addList,removeList,modifyList, } from '../app/store/reducer/userSlice';

describe('userSlice', () => {
  const initialState = userSlice.user;


  it('should handle setUser', () => {
    const user = { id: '1', name: 'Test User', table: [] };
    const state = userSlice.reducer(initialState, setUser(user));
    expect(state.user).toEqual(user);
  });

  it('should handle addTable', () => {
    const table = { id: '1', name: 'Table 1', list: [] };
    let state = userSlice.reducer(initialState, setUser({ id: '1', name: 'Test User', table: [] }));
    state = userSlice.reducer(state, addTable(table));
    expect(state.user.table).toContainEqual(table);
  });
  
  it('should handle not addTable', () => {
    const table = { id: '1', name: 'Table 1', list: [] };
    let state = userSlice.reducer(initialState, setUser({ id: '1', name: 'Test User', table: [] }));
    state = userSlice.reducer(state, addTable(table));
    expect(state.user.table).toContainEqual(table);
  });

  it('should handle removeTable', () => {
    const table = { id: '1', name: 'Table 1', list: [] };
    let state = userSlice.reducer(initialState, setUser({ id: '1', name: 'Test User', table: [table] }));
    state = userSlice.reducer(state, removeTable('1'));
    expect(state.user.table).not.toContainEqual(table);
});

it('should handle removeTable one table', () => {
    const table1 = { id: '1', name: 'Table 1', list: [] };
    const table2 = { id: '2', name: 'Table 2', list: [] };
    const table3 = { id: '3', name: 'Table 3', list: [] };
    // j'ajoute des tables a mon user
    let state = userSlice.reducer(initialState, setUser({ id: '1', name: 'Test User', table: [table1, table2, table3] }));
    // je supprime une seule table
    state = userSlice.reducer(state, removeTable('2'));
    // Vérifier que la table2 a été supprimée du state
    expect(state.user.table).not.toContainEqual(table2);
    // Vérifier que les autres tables sont toujours présentes dans le state
    expect(state.user.table).toContainEqual(table1);
    expect(state.user.table).toContainEqual(table3);
});

it('should handle modifyTable', () => {
    const initialTable = { id: '1', name: 'Table 1', list: [] };
    const modifiedName = 'Modified Table 1';
    let state = userSlice.reducer(initialState, setUser({ id: '1', name: 'Test User', table: [initialTable] }));
    state = userSlice.reducer(state, modifyTable({id: '1', name: modifiedName}));
    expect(state.user.table[0]).toHaveProperty('name', modifiedName);
  });

  
  it('should handle addList', () => {
      const list = { id: '1', name: 'List 1' };
    const table = { id: '1', name: 'Table 1', list: [list] };
    let state = userSlice.reducer(initialState, setUser({ id: '1', name: 'Test User', table: [table] }));
    state = userSlice.reducer(state, addList({ ...list, table_id: table.id }));
    expect(state.user.table[0].list).toContainEqual(list);
  });

  it('should handle removeList', () => {
    const table = { id: '1', name: 'Table 1', list: [{ id: '1', name: 'List 1' }] };
    let state = userSlice.reducer(initialState, setUser({ id: '1', name: 'Test User', table: [table] }));
    state = userSlice.reducer(state, removeList({ id: '1', tableId: table.id }));
    expect(state.user.table[0].list).not.toContainEqual({ id: '1', name: 'List 1' });
  });


  it('should handlecf modifyList', () => {
    const table = { id: 1, name: 'Table 1', list: [{ id: '1', name: 'List 1' , table_id: 1}] };
    let state = userSlice.reducer(initialState, setUser({ id: '1', name: 'Test User', table: [table] }));
    state = userSlice.reducer(state, modifyList({ id: '1', name: 'Updated List 1', table_id: table.id }));
    expect(state.user.table[0].list).toContainEqual({ id: '1', name: 'Updated List 1',table_id: 1 });
});

 
});
