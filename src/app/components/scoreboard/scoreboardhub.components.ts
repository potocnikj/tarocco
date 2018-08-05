/**
 * Internal
 */
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
/**
 * Environment
 */
import { environment } from '../../../environments/environment';

export class ScoreboardHub {

  public conn: HubConnection;
  public gameId: string;

  private uri = environment.baseUri + 'hub/scoreboard';

  constructor(gameId) {    
    this.createConnectionWithGameId(gameId);
    this.gameId = gameId;
  }

  public async startHub() {
    if (this.conn) {
      await this.conn.start().catch(e =>{
         setTimeout(x => {
           this.startHub();
         },5000)
      });
    }
  }

  public onAddRound(handler) {
    console.log('onAddRound called');
    this.conn.on('updateScoreBoard', handler);
  }

  public onDeleteRound(handler) {
    this.conn.on('deleteLastRound', handler);
  }

  private createConnectionWithGameId(gameId: string) {
    this.conn = new HubConnectionBuilder()
      .withUrl(this.uri + '?gameId=' + gameId)
      .configureLogging(LogLevel.Trace)      
      .build();

      this.conn.serverTimeoutInMilliseconds = 10000;

      this.conn.onclose(error => {
        this.startHub();
      })
  
  }

  public changeGame(gameId) {
    this.conn.stop();
    this.createConnectionWithGameId(gameId);
    this.gameId = gameId;
    this.startHub();
  }
}
