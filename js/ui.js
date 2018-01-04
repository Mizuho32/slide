function movestart(t){
  console.log(t);
  var view = t.parentNode.parentNode.parentNode.parentNode;
  var vbrect = view.getBoundingClientRect();
  //var bbrect = document.body.getBoundingClientRect(); 
  var ev = window.event;

  var init_view =   {x:vbrect.left, y:vbrect.top};
  //var init_view =   {x:vbrect.left - bbrect.left, y:vbrect.top - bbrect.top};
  /*var init_view = {
                    x:parseInt(view.style.left.slice(0, -2)),
                    y:parseInt(view.style.top.slice(0, -2)) };
                    // Element.style is empty
  */
  var init_mouse =  {x:ev.clientX, y:ev.clientY};

  document.onmousemove = () => {
    var dx = event.clientX - init_mouse.x;
    var dy = event.clientY - init_mouse.y;
    console.log(`(${[dx,dy]}), ${[init_view.x,init_view.y]}`);
    view.style.top = `${init_view.y + dy}px`;
    view.style.left = `${init_view.x + dx}px`;
  };
  document.onmouseup   = () => {
    document.onmousemove = null;
  };
};

function edit(t) {
  let ui = t.parentNode.parentNode;
  let tarea = document.createElement("textarea");
  ui.appendChild(tarea);
  share.ws.send("read");

  let tmp = share.ws.onmessage;
  share.ws.onmessage = (msg) => {
    console.log(msg);
    tarea.value = msg.data;
    share.ws.onmessage = tmp;
  };

}
