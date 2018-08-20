/**
 * Internal
 */
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
/**
 * Environment
 */
import { environment } from '../../../environments/environment';
import { ScoreBoardService } from '../../../core/services/score-board.service';

export class ScoreboardHub {

  public conn: HubConnection;
  public gameId: string;

  private uri = environment.baseUri + 'hub/scoreboard';
  private scoreBoardService: ScoreBoardService;

  constructor(gameId, scoreBoardService) {    
    this.gameId = gameId;
    this.scoreBoardService = scoreBoardService;    
    this.createConnectionWithGameId(gameId);
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

    public onAddRounds(handler) {
    console.log('onAddRounds called');
    this.conn.on('addRounds', handler);
  }

  public onDeleteRound(handler) {
    this.conn.on('deleteLastRound', handler);
  }

  private createConnectionWithGameId(gameId: string) {
    let url = this.uri + '?gameId=' + gameId;

    if(this.scoreBoardService.lastRound != null)
      url = url + "&lastRound=" + this.scoreBoardService.lastRound.roundNumber; 

    if (this.scoreBoardService.roundList.length == 0)
      url = url + "&lastRound=0";    

    this.conn = new HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(LogLevel.Trace)      
      .build();

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
