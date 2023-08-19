let board = document.querySelector('#board');
let screen = document.querySelector('#screen');
let white = 0;
let black = 0;
for(let i = 1; i <= 64; i++){
    let square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('click', () => {
    })
    square.setAttribute('id', i);
    let row = i <= 8 ? 1 : i <= 16 ? 2 : i <= 24 ? 3 : i <= 32 ? 4 : i <= 40 ? 5 : i <= 48 ? 6 : i <= 56 ? 7 : 8;
    square.setAttribute('data-row', row);
    if(row % 2 === 0){
        square.classList.add(i % 2 === 0 ? 'gray' : 'brown')
    }else{
        square.classList.add(i % 2 === 0 ? 'brown' : 'gray')
    }
    if(square.classList[1] === 'brown'){
        square.addEventListener('dragover', dragOver)
        square.addEventListener('drop', dragDrop)
        square.addEventListener('click', drop)
    }
    board.append(square)                          
}
let squares = document.querySelectorAll('.square')
squares.forEach((square) => {
    let row = square.getAttribute('data-row');
    let piece = document.createElement('div')
    piece.classList.add('piece')
    piece.setAttribute('draggable', true)
    if(row <= 3 && square.classList[1] === 'brown'){
        piece.classList.add('black')
        square.append(piece)
    }else if(row >= 6 && square.classList[1] === 'brown'){
        piece.classList.add('white')
        square.append(piece)
    }
})
let selectedPiece;
let target;
let selectedSquareId
let targetSquareId
let pieces = document.querySelectorAll('.piece')
pieces.forEach((piece) => {
    piece.addEventListener('dragstart', dragStart)
    piece.addEventListener('click', () => {
        selectedPiece = piece;
        selectedSquareId = parseInt(selectedPiece.parentNode.id)
    })
})
function dragStart(e){
    selectedPiece = e.target;
    selectedSquareId = parseInt(selectedPiece.parentNode.id)   
}
function dragOver(e){
    e.preventDefault();
}
function dragDrop(e){  
    target = e.target;
    targetSquareId = parseInt(target.id) 
    let result
    if(white <= black){
        result = whitePeaceMove();
    }else if(white > black){
        result = blackPeaceMove();
    }
    
    if(white <= black && selectedPiece.classList[1] === 'white' && whitePeaceMove() === true){
        let row = target.getAttribute('data-row')
        if(row === '1'){
            selectedPiece.classList.add('queen')
        }
        target.append(selectedPiece);
        white++;
        redBackground();
        removeRedBackground('white')
    }else if(white > black && selectedPiece.classList[1] === 'black' && blackPeaceMove() === true){
        let row = target.getAttribute('data-row')
        if(row === '8'){
            selectedPiece.classList.add('queen')
        }
        target.append(selectedPiece)
        black++;
        redBackground();
        removeRedBackground('black')
    }else if(white > black && selectedPiece.classList[1] === 'black' && typeof result === 'number'){
        let row = target.getAttribute('data-row')
        if(row === '8'){
            selectedPiece.classList.add('queen')
        }
        let deletePieace = document.querySelector(`[id='${result}']`)
        console.log(deletePieace.firstChild)
        deletePieace.removeChild(deletePieace.firstChild);
        target.append(selectedPiece)
        black++;
        redBackground();
        removeRedBackground('black')
    }else if(white <= black && selectedPiece.classList[1] === 'white' && typeof result === 'number'){
        let row = target.getAttribute('data-row')
        if(row === '1'){
            selectedPiece.classList.add('queen')
        }
        let deletePieace = document.querySelector(`[id='${result}']`)
        console.log(deletePieace.firstChild)
        deletePieace.removeChild(deletePieace.firstChild);
        target.append(selectedPiece)
        white++;
        redBackground();
        removeRedBackground('white')
    }   
}
function removeRedBackground(arg){
    if(arg === 'white'){
        let whitePieces = document.querySelectorAll('.white');
        whitePieces.forEach((piece) => {
            if(piece.parentNode.classList[2] && piece.parentNode.classList[2] === 'red'){
                piece.parentNode.classList.remove('red')
            }
        })
    }else if(arg === 'black'){
        let blackPieces = document.querySelectorAll('.black');
        blackPieces.forEach((piece) => {
            if(piece.parentNode.classList[2] && piece.parentNode.classList[2] === 'red'){
                piece.parentNode.classList.remove('red')
            }
        })
    }
    let allSquares = document.querySelectorAll('.square');
    allSquares.forEach((square) => {
        if(square.classList[2] && square.classList[2] === 'red' && !square.firstChild){
            square.classList.remove("red");
        }
    })
}
function redBackground(){
    let allBlackPieces = document.querySelectorAll('.black')
    allBlackPieces.forEach((piece) => {
            let pieceId = parseInt(piece.parentNode.id)
            let one = document.querySelector(`[id='${pieceId + 7}']`)
            let two = document.querySelector(`[id='${pieceId + 9}']`)
            let three = document.querySelector(`[id='${pieceId - 7}']`)
            let four = document.querySelector(`[id='${pieceId - 9}']`)
            let five = document.querySelector(`[id='${pieceId + 14}']`);
            let six = document.querySelector(`[id='${pieceId + 18}']`);
            let seven = document.querySelector(`[id='${pieceId - 14}']`);
            let eight = document.querySelector(`[id='${pieceId - 18}']`);

            if(one && five && one.firstChild && !five.firstChild && five.classList[1] === 'brown' && one.firstChild.classList[1] === 'white'){
                piece.parentNode.classList.add('red')
            }else if(two && six && two.firstChild && !six.firstChild && six.classList[1] === 'brown' && two.firstChild.classList[1] === 'white'){
                piece.parentNode.classList.add('red')
            }else if(three && seven && three.firstChild && !seven.firstChild && seven.classList[1] === 'brown' && three.firstChild.classList[1] === 'white'){
                piece.parentNode.classList.add('red')
            }else if(four && eight && four.firstChild && !eight.firstChild && eight.classList[1] === 'brown' && four.firstChild.classList[1] === 'white'){
                piece.parentNode.classList.add('red')
            }        
    })

    let allWhitePieces = document.querySelectorAll('.white');
    allWhitePieces.forEach((piece) => {
        let pieceId = parseInt(piece.parentNode.id)
            let one = document.querySelector(`[id='${pieceId - 7}']`)
            let two = document.querySelector(`[id='${pieceId - 9}']`)
            let three = document.querySelector(`[id='${pieceId + 7}']`)
            let four = document.querySelector(`[id='${pieceId + 9}']`)
            let five = document.querySelector(`[id='${pieceId - 14}']`);
            let six = document.querySelector(`[id='${pieceId - 18}']`);
            let seven = document.querySelector(`[id='${pieceId + 14}']`);
            let eight = document.querySelector(`[id='${pieceId + 18}']`);

            if(one && five && one.firstChild && !five.firstChild && five.classList[1] === 'brown' && one.firstChild.classList[1] === 'black'){
                piece.parentNode.classList.add('red')
            }else if(two && six && two.firstChild && !six.firstChild && six.classList[1] === 'brown' && two.firstChild.classList[1] === 'black'){
                piece.parentNode.classList.add('red')
            }else if(three && seven && three.firstChild && !seven.firstChild && seven.classList[1] === 'brown' && three.firstChild.classList[1] === 'black'){
                piece.parentNode.classList.add('red')
            }else if(four && eight && four.firstChild && !eight.firstChild && eight.classList[1] === 'brown' && four.firstChild.classList[1] === 'black'){
                piece.parentNode.classList.add('red')
            }   
    })
} 
function blackPeaceMove(){
    if(selectedPiece.classList[1] === 'white'){
        return
    }
    let one = document.querySelector(`[id='${selectedSquareId + 7}']`)
    let two = document.querySelector(`[id='${selectedSquareId + 9}']`)
    let three = document.querySelector(`[id='${selectedSquareId - 7}']`)
    let four = document.querySelector(`[id='${selectedSquareId - 9}']`) 
    if(selectedPiece.classList[2] === 'queen' && !target.firstChild && target.classList[1] === 'brown'){
        if(selectedSquareId + 9 === targetSquareId || selectedSquareId + 7 === targetSquareId || selectedSquareId - 9 === targetSquareId || selectedSquareId - 7 === targetSquareId){
            return true;
        }
    
    }
    if(!target.firstChild && target.classList[1] === 'brown'){
        if(selectedSquareId + 9 === targetSquareId || selectedSquareId + 7 === targetSquareId){
            return true;
        }else if(selectedSquareId + 18 === targetSquareId && two.firstChild){
            return parseInt(two.id)
        }else if(selectedSquareId + 14 === targetSquareId && one.firstChild){
            return parseInt(one.id);
        }else if(selectedSquareId - 18 === targetSquareId && four.firstChild){
            return parseInt(four.id)
        }else if(selectedSquareId - 14 === targetSquareId && three.firstChild){
            return parseInt(three.id)
        }
    }
}
function whitePeaceMove(){
    if(selectedPiece.classList[1] === 'black'){
        return;
    }
    let one = document.querySelector(`[id='${selectedSquareId - 7}']`)
    let two = document.querySelector(`[id='${selectedSquareId - 9}']`)
    let three = document.querySelector(`[id='${selectedSquareId + 7}']`)
    let four = document.querySelector(`[id='${selectedSquareId + 9}']`)
    if(selectedPiece.classList[2] === 'queen' && !target.firstChild && target.classList[1] === 'brown'){
        if(selectedSquareId + 9 === targetSquareId || selectedSquareId + 7 === targetSquareId || selectedSquareId - 9 === targetSquareId || selectedSquareId - 7 === targetSquareId){
            return true;
        }
    }
    if(selectedSquareId - 9 === targetSquareId || selectedSquareId - 7 === targetSquareId){
        return true;
    }else if(selectedSquareId - 18 === targetSquareId && two.firstChild){
        return parseInt(two.id)
    }else if(selectedSquareId - 14 === targetSquareId && one.firstChild){
        return parseInt(one.id)
    }else if(selectedSquareId + 18 === targetSquareId && four.firstChild){
        return parseInt(four.id)
    }else if(selectedSquareId + 14 === targetSquareId && three.firstChild){
        return parseInt(three.id)
    }
}
function drop(e){
    target = e.target;
    targetSquareId = parseInt(target.id) 
    let result
    if(white <= black){
        result = whitePeaceMove();
    }else if(white > black){
        result = blackPeaceMove();
    }
    
    if(white <= black && selectedPiece.classList[1] === 'white' && whitePeaceMove() === true){
        let row = target.getAttribute('data-row')
        if(row === '1'){
            selectedPiece.classList.add('queen')
        }
        target.append(selectedPiece);
        white++;
        redBackground();
        removeRedBackground('white')
    }else if(white > black && selectedPiece.classList[1] === 'black' && blackPeaceMove() === true){
        let row = target.getAttribute('data-row')
        if(row === '8'){
            selectedPiece.classList.add('queen')
        }
        target.append(selectedPiece)
        black++;
        redBackground();
        removeRedBackground('black')
    }else if(white > black && selectedPiece.classList[1] === 'black' && typeof result === 'number'){
        let row = target.getAttribute('data-row')
        if(row === '8'){
            selectedPiece.classList.add('queen')
        }
        let deletePieace = document.querySelector(`[id='${result}']`)
        console.log(deletePieace.firstChild)
        deletePieace.removeChild(deletePieace.firstChild);
        target.append(selectedPiece)
        black++;
        redBackground();
        removeRedBackground('black')
    }else if(white <= black && selectedPiece.classList[1] === 'white' && typeof result === 'number'){
        let row = target.getAttribute('data-row')
        if(row === '1'){
            selectedPiece.classList.add('queen')
        }
        let deletePieace = document.querySelector(`[id='${result}']`)
        console.log(deletePieace.firstChild)
        deletePieace.removeChild(deletePieace.firstChild);
        target.append(selectedPiece)
        white++;
        redBackground();
        removeRedBackground('white')
    }   
}
function screenText(){
    let blackPiece = document.querySelectorAll('.black');
    let whitePiece = document.querySelectorAll('.white')
    if(blackPiece.length === 0){
        screen.innerText = 'white wins'
    }else if(whitePiece.length === 0){
        screen.innerText = 'black wins'
    }else if(white <=  black){
        screen.innerText = 'whites turn'
    }else if(white > black){
        screen.innerText = 'blacks turn'
    }
}
setInterval(screenText, 100)
