document.addEventListener('DOMContentLoaded', () => {
  
  // Connect to websocket
  var socket = io.connect('http://127.0.0.1:5000');

  // When connected, configure buttons
  socket.on('connect', () => {
    
    // Each button should emit a "submit vote" event
    document.querySelectorAll('button').forEach(button => {
      button.onclick = () => {
        const selection = button.dataset.vote;
        socket.emit('submit vote', {'selection': selection});
      };
    });
  });

  // When a new vote is announced, add to the unordered list
  socket.on('vote totals', data => {
    document.querySelector('#yes').innerHTML = data.yes;
    document.querySelector('#no').innerHTML = data.no;
    document.querySelector('#maybe').innerHTML = data.maybe;
  });
});