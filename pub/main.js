

const playwaitdiv=document.getElementById('playerwait');
playwaitdiv.style.display="none";
const gamediv=document.getElementById('realdgamedivid');
        gamediv.style.display="none";
 const socket=io();
 var turn=1;
var igencode="";
var tt;
var oppe;
var mynamei="";
var mysym="";
 const stbtnshow=false;
function submitcode(){
    const player=2;
    const p2name= prompt('Enter Your Name');
    
    if(p2name==null || p2name=="" ){
        alert('please enter name')
            }else{
  mysym="O";
                const incode=document.getElementById('codeinput').value;
                igencode=incode;
                socket.emit('new-user-joined',{codes: incode,name:p2name});
                const playwaitdiv=document.getElementById('playerwait');
                playwaitdiv.style.display="block";
                const gendiv=document.getElementById('genratediv');
                gendiv.style.display="none";
                document.getElementById('firstpayname').innerText=p2name;
                const stbtn=document.getElementById('stbtn');
                stbtn.style.display="none";
                document.getElementById('genetcode').innerText="wait Oppents to Start";


            }



}
function startma(){
    console.log(mysym);
    if(mysym=="X"){
        socket.emit('stbtnclick',{codes: igencode,name:mynamei}) ;
        startgame(mysym);
     

    }

}

socket.on('iclickinst',data =>{
if(data.codes==igencode){
    startgame(mysym);
}
})
function startgame(sym){
    const gamediv=document.getElementById('realdgamedivid');
    gamediv.style.display="block";
    const playwaitdiv=document.getElementById('playerwait');
playwaitdiv.style.display="none";
}
function Generatecode(){
    const player=1;
    const p1name= prompt('Enter Your Name');
    if(p1name==null || p1name==""){
alert('please enter name')
    }else{
       mysym="X";
    const code =p1name+moment(new Date()).format('mmss');
    igencode=code;
    console.log(code);
    mynamei=p1name;
 
    document.getElementById('genetcode').innerText=code;
    const playwaitdiv=document.getElementById('playerwait');
    playwaitdiv.style.display="block";
    const gendiv=document.getElementById('genratediv');
    gendiv.style.display="none";
    document.getElementById('firstpayname').innerText=p1name;
    const stbtn=document.getElementById('stbtn');
    stbtn.style.display="none";
}
}

socket.on('user-joined', data=>{
    console.log(data.codes+'  '+igencode)
if(data.codes==igencode)  {
    socket.emit('igetyourdata',{codes: igencode,name:mynamei});
    const oppentsn=data.name;
    document.getElementById('secondpayname').innerText=oppentsn;
    const stbtn=document.getElementById('stbtn');
    stbtn.style.display="block";
}
})

socket.on('icall-user-joined', data=>{
    console.log(data.codes+'  '+igencode+'  '+data.name);
    if(data.codes==igencode)  {
    const oppentsn=data.name;
    document.getElementById('secondpayname').innerText=oppentsn;

    }

})
function fixsetclick(num,value,id){
   if(value==""|| value==null){
  const curenin=document.getElementById(id);
  if(mysym=="X"){
 tt=1;
  }else{
     tt=0;
  }

  
  if(turn%2==tt){
    socket.emit('turnupdate',{codes: igencode,name:mynamei,id:id,num:num});
    curenin.value=mysym;
    curenin.innerText=mysym;
    checkwin();
  
    
  }else{
    alert("Not Your Turn");
  }

   }
}

socket.on('iturncom',data =>{
    console.log(data);
    if(data.codes==igencode){
    const curenins=document.getElementById(data.id);
 if(curenins.value==""|| curenins.value==null){
  
  if(mysym=="X"){
 tt=0;
 oppe="O";
  }else{
     tt=1;
     oppe="X";
  }

  
  if(turn%2==tt){
    
    curenins.value=oppe;
    curenins.innerText=oppe;
    checkwin();
   
    
  }else{
    alert("Not Your Turn");
  }

   } 
}

})

function checkwin(){
c1=document.getElementById('btn1').value;
c2=document.getElementById('btn2').value;
c3=document.getElementById('btn3').value;
c4=document.getElementById('btn4').value;
c5=document.getElementById('btn5').value;
c6=document.getElementById('btn6').value;
c7=document.getElementById('btn7').value;
c8=document.getElementById('btn8').value;
c9=document.getElementById('btn9').value;

if(c1+c2+c3=="XXX"){
alert('X win the match');
}else if(c4+c5+c6=="XXX"){
    alert('X win the match');
}else if(c7+c8+c9=="XXX"){
    alert('X win the match');
}else if(c1+c4+c7=="XXX"){
    alert('X win the match');
}else if(c2+c5+c8=="XXX"){
    alert('X win the match');
}else if(c3+c6+c9=="XXX"){
    alert('X win the match');
}else if(c7+c5+c3=="XXX"){
    alert('X win the match');
}else if(c1+c5+c9=="XXX"){
    alert('X win the match');
}else if(c1+c2+c3=="OOO"){
    alert('O win the match');
}else if(c4+c5+c6=="OOO"){
    alert('O win the match');
}else if(c7+c8+c9=="OOO"){
    alert('O win the match');
}else if(c1+c4+c7=="OOO"){
    alert('O win the match');
}else if(c2+c5+c8=="OOO"){
    alert('O win the match');
}else if(c3+c6+c9=="OOO"){
    alert('O win the match');
}else if(c7+c5+c3=="OOO"){
    alert('O win the match');
}else if(c1+c5+c9=="OOO"){
    alert('O win the match');
}
turn++;

}