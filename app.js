'use strict';

const runApp = () => {
    document.querySelector('#js-ver').innerHTML = '0.31';

    const createDropzones = () => {
        const applyDropzoneBehaviourToDropzones = (dropzones) => {
            const highlightDropzone = (event) => {
                event.preventDefault();
                event.target.classList.add('highlight');
            }
            
            const unhighlightDropzone = (event) => event.target.classList.remove('highlight');
        
            const drop = (event) => {
                event.preventDefault();
                unhighlightDropzone(event);
        
                if (event.target.classList.contains('bingo-item')) {
                    return;
                }
        
                const id = event.dataTransfer.getData('text/plain');
                event.dataTransfer.clearData();
            
                const draggable = document.getElementById(id);
                event.target.appendChild(draggable);
                
                const hiddens = draggable.querySelectorAll('.hide');
                hiddens.forEach(hidden => hidden.classList.remove('.hide'));
            }
        
            dropzones.forEach(dropzone => {
                dropzone.addEventListener('dragenter', highlightDropzone);
                dropzone.addEventListener('dragover', highlightDropzone);
                dropzone.addEventListener('dragleave', unhighlightDropzone);
                dropzone.addEventListener('drop', drop);
            });
        }
        
        const dropzones = document.querySelectorAll('.dropzone');
        applyDropzoneBehaviourToDropzones(dropzones);
    }
    
    createDropzones();
    
    const createDroppableItems = () => {
        const applyDragBehaviourToItems = (items) => {
            const hideDescription = (element) => element.firstElementChild?.classList.add('hide');
        
            const dragStart = (event) => {
                event.dataTransfer.setData('text/plain', event.target.id);
                hideDescription(event.target);
            }
        
            const showDescription = (element) => element.firstElementChild?.classList.remove('hide');
            const dragEnd = (event) => showDescription(event.target);
        
            items.forEach(item => {
                item.addEventListener('dragstart', dragStart);
                item.addEventListener('dragend', dragEnd);
                item.addEventListener('touchstart', () => {}, false);
                item.addEventListener('touchend', () => {},false);
                item.addEventListener('touchcancel', () => {}, false);
                item.addEventListener('touchleave', () => {}, false);
                item.addEventListener('touchmove', () => {}, false);
            });
        }
        
        
        const items = document.querySelectorAll('.bingo-item');
        applyDragBehaviourToItems(items);
    }
    
    createDroppableItems();
}

runApp();
