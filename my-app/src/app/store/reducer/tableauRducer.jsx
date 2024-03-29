const INITIALSTATE = {
  tableauName: [
    {
      id: 0,
      name: 'planning familial',
      lists: [
        {
          id: 1,
          name: "a faire",
          task: [
            {
              id: 1,
              name: "bla bla",
            },
          ],
        },
        {
          id: 2,
          name: "en cours",
          task: [
            {
              id: 1,
              name: "bla bla",
            },
            {
              id: 2,
              name: "blo blo",
            },
          ],
        },
      ],
    },
  ],
};

function TableauReducer(state = INITIALSTATE, action) {
  switch (action.type) {
    case "ADDTABLEAU": {
      return {
        ...state,
        tableauName: action.payload,
      };
    }
    case "ADDLIST": {
      return {
        ...state,
        ListName: action.payload,
      };
    }
      case "ADDTASK": {
        return {
          ...state,
          taskName: action.payload,
        };
    }
    default:
      return state;
  }
}

export default TableauReducer;
