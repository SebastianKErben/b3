'use strict';

const runApp = () => {
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
            const preventDefault = (event) => event.preventDefault();
        
            items.forEach(item => {
                item.addEventListener('dragstart', dragStart);
                item.addEventListener('dragend', dragEnd);
                item.addEventListener('touchstart', preventDefault, false);
                item.addEventListener('touchend', preventDefault,false);
                item.addEventListener('touchcancel', preventDefault, false);
                item.addEventListener('touchleave', preventDefault, false);
                item.addEventListener('touchmove', preventDefault, false);
            });
        }
        
        
        const items = document.querySelectorAll('.bingo-item');
        applyDragBehaviourToItems(items);
    }
    
    createDroppableItems();
}

runApp();
