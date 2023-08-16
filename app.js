let board = document.querySelector('#board');

for(let i = 1; i <= 64; i++){
    let sqware = document.createElement('div');
    sqware.setAttribute('id', i);
    sqware.classList.add('sqware');

    let piece = document.createElement('div')
    piece.classList.add('piece')
    piece.setAttribute('draggable', true)
    row = Math.floor((64 - i) / 8) + 1;
    sqware.setAttribute('row', row)
    if(row % 2 === 0){
        sqware.classList.add(i % 2 === 1 ? 'gray' : 'brown')
    }else{
        sqware.classList.add(i % 2 === 1 ? 'brown' : 'gray')
    }

    if(sqware.classList[1] === 'brown'){
        if(i <= 24){
            sqware.append(piece)
            piece.classList.add('black')
        }else if(i > 40){
            sqware.append(piece)
            piece.classList.add('white')
        }
        
    }

    sqware.addEventListener('drop', dragDrop)
    sqware.addEventListener('dragover', dragOver)

    board.append(sqware)
}


let pieces = document.querySelectorAll('.piece')


pieces.forEach((piece) => {
    piece.addEventListener('dragstart', dragStart)
    piece.addEventListener('dragover', dragOver)
})

let selectedPiece

function dragStart (e) {
    selectedPiece =  e.target
}

function dragOver (e) {
    e.preventDefault();
    
}

let white = 0;
let black = 0;



function dragDrop (e) {
    
    if(selectedPiece.classList[1] === 'black'){
        if(white <= black){
            return;
        }
    }else if(selectedPiece.classList[1] === 'white'){
        if(white > black){
            return;
        }
    }

    console.log(selectedPiece.classList[1])

        
    

    let sqware;
    let startId = parseInt(selectedPiece.parentNode.id)
    let endId 
    let row
    let startRow = parseInt(selectedPiece.parentNode.getAttribute('row'));
    
    if(e.target.classList[0] === 'piece'){
        sqware = e.target.parentNode;
        endId = parseInt(e.target.parentNode.id);
        row = e.target.parentNode.getAttribute('row')
    }else{
        sqware = e.target;
        endId = parseInt(e.target.id);
        row = parseInt(e.target.getAttribute('row'))   
    }
    
    
    if(selectedPiece.classList[1] === 'black'){
        if(endId === startId + 9 || endId === startId + 7){
            if(row === startRow - 1 && !sqware.firstChild){
                e.target.append(selectedPiece)
                black++;
            }        
        }
        if(endId === startId + 18 && !sqware.firstChild){
            
            let number = startId + 9;
            
            let sqwareCheck = document.querySelector(`[id='${number}']`)

            if(sqwareCheck.firstChild){
                e.target.append(selectedPiece);
                sqwareCheck.removeChild(sqwareCheck.firstChild);
                black++;
            }
            
        }
        if(endId === startId + 14 && !sqware.firstChild){
            let number = startId + 7;

            let sqwareCheck = document.querySelector(`[id='${number}']`);

            if(sqwareCheck.firstChild){
                e.target.append(selectedPiece);
                sqwareCheck.removeChild(sqwareCheck.firstChild)
                black++;
            }
        }




        

    }else if(selectedPiece.classList[1] === 'white'){
        if(endId === startId - 9 || endId === startId - 7){
            if(row === startRow + 1 && !sqware.firstChild){
                e.target.append(selectedPiece)
                white++;
            }
            
        }
        if(endId === startId - 18 && !sqware.firstChild){
            let number = startId - 9;
            let sqwareCheck = document.querySelector(`[id='${number}']`);
            if(sqwareCheck.firstChild){
                e.target.append(selectedPiece);
                sqwareCheck.removeChild(sqwareCheck.firstChild)
                white++;
               }
        }
        if(endId === startId - 14){
                
            let number = startId - 7
            console.log(number)
            let sqwareCheck = document.querySelector(`[id='${number}']`)
            console.log(sqwareCheck)
            if(sqwareCheck.firstChild){
                e.target.append(selectedPiece);
                sqwareCheck.removeChild(sqwareCheck.firstChild)
                white++;
            }
        
        }
        
        
    }
    
    
}

function whosTurn(arg1, arg2){
    let whosTurn = document.querySelector('#whos-turn')
    if(white > black){
        whosTurn.innerText = 'blacks turn';
    }else{
        whosTurn.innerText = 'whites turn';
    }
}

setInterval(whosTurn, 100)