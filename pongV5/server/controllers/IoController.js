const CLIENTS = 'clients' ;
export default class IOController {
    #io ; 
    #clients ; 
    constructor(io){
        this.#io = io ; 
        this.#clients = [];
    }
    connection(socket){
        if (this.#clients.length == 0 ) {
            socket.emit("first") ; 
            socket.join(CLIENTS) ;
            this.#clients.push(socket) ;
            this.welcome(socket) ; 
        }
        else if (this.#clients.length == 1 ) {
            socket.join(CLIENTS) ;
            this.#clients.push(socket) ;
            this.welcome(socket) ;
            this.#io.emit("start") ;
        }
        else if (this.#clients.length == 2 ) {
            socket.join(CLIENTS) ;
            this.#clients.push(socket) ;
            this.leave(socket);
        } 
        this.socketHandler(socket) ; 
    }
    socketHandler(socket){
        socket.on('disconnect' , ()=> this.stopgame()) ;  // stop the opponent too  ; 
            socket.on("firstup" , ()=> {this.#clients[1].emit("up")}) ; 
            socket.on("secondup" , ()=>{this.#clients[0].emit("up")}); 
            socket.on("firstdown" , ()=>{this.#clients[1].emit("down")}) ; 
            socket.on("seconddown" , ()=>{this.#clients[0].emit("down")}); 
            socket.on("firststop" , ()=>{this.#clients[1].emit("stop")}) ; 
            socket.on("secondstop" , ()=>{this.#clients[0].emit("stop")}) ;
            socket.on("startgame" , () => {this.#io.emit('start'); } ) ;
            socket.on("signalballtouched" , cords => this.#io.emit("updateball" , cords)) ;
        
    }
    welcome(socket){
        console.log(`connection with id ${socket.id} at ${new Date().toLocaleTimeString()}  and list size is ${this.#clients.length}`);
        
      }
    stopgame(){
        this.#clients.forEach(item => item.disconnect) ; 
        this.#clients.forEach(item => item.emit('redirect' , "./disconnect.html")) ; 
        this.#clients = [] ; 
    }
    leave(socket) {
        socket.emit("redirect" , './disconnect.html') ; 
        socket.disconnect() ; 
        for( var i = 0; i < this.#clients.length; i++){ 
                                   
            if ( this.#clients[i] === socket) { 
                this.#clients.splice(i, 1); 
                i--; 
            }
        }
        console.log("delete called") ; 
        console.log(`size is ${this.#clients.length}`)
  }
}