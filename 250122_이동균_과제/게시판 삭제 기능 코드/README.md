```
type TDeleteBoardAction = {
    boardId: string;
}

deleteBoard: (state, { payload }: PayloadAction<TDeleteBoardAction>) => {
            state.boardArray = state.boardArray.filter(
                board => board.boardId !== payload.boardId
            )
        },
```