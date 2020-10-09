
export interface IGameBoard {
  tile1: ITileSpace,
  tile2: ITileSpace,
  tile3: ITileSpace,
  tile4: ITileSpace,
  tile5: ITileSpace,
  tile6: ITileSpace,
  tile7: ITileSpace,
  tile8: ITileSpace,
  tile9: ITileSpace,

}

export interface ITileSpace {
  id: number,
  player: string,
  isTaken: boolean,
}