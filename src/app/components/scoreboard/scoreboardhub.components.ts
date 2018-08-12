/**
 * Internal
 */
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
/**
 * Environment
 */
import { environment } from '../../../environments/environment';

export class ScoreboardHub {

  public conn: HubConnection;
  public gameId: string;

  private uri = environment.baseUri + 'hub/scoreboard';

  constructor(gameId) {
    this.conn = new HubConnectionBuilder()
    .withUrl(this.uri + '?gameId=' + gameId)
    .build();
    this.gameId = gameId;
  }

  public async startHub() {
    if (this.conn) {
      await this.conn.start().catch(e => console.log(e));
    }
  }

  public onAddRound(handler) {
    this.conn.on('updateScoreBoard', handler);
  }

  public onDeleteRound(handler) {
    this.conn.on('deleteLastRound', handler);
  }

  public changeGame(gameId) {
    this.conn.stop();
    this.conn = new HubConnectionBuilder()
    .withUrl(this.uri + '?gameId=' + gameId)
    .build();
    this.gameId = gameId;
    this.startHub();
  }
}
