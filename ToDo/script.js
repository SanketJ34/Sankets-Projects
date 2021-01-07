/***
 * Check if local storage exists, 
 * if Yes, then render the list
 * if No, then create a local storage
 */
document.addEventListener('DOMContentLoaded', () => {
    if(!localStorage.getItem('list')) {
        localStorage.setItem('list','[]');
    } else {
        const items = JSON.parse(localStorage.getItem('list'));
        
        items.forEach((text) => {           
            const item = 
            document.createElement('li');
            item.className = `${text}`;
            item.innerHTML = `<input type="checkbox" id="done" style="background-color: transparent">${text}<button class="delete"><i class="fas fa-trash-alt"></i></button>`

            document.querySelector('.todo-list').appendChild(item);

            attachEventListener(item);
            
        });
    }
})
//Date Feature
let date = document.querySelector(".date")
    today = new Date().toLocaleDateString();

date.textContent = today; 
//Adding items to list
document.querySelector('.submit').addEventListener('click',(e) => {
    e.preventDefault();

    const listItem = document.querySelector('.input').value

    const obj = JSON.parse(localStorage.getItem('list'));

    obj.push(listItem);

    localStorage.setItem('list', JSON.stringify(obj));

    const item = document.createElement('li');
    item.className = `${listItem}`;        
    item.innerHTML = `<input type="checkbox" id="done" style="background-color: transparent">${listItem}<button class="delete"><i class="fas fa-trash-alt"></i></button>`

    document.querySelector('.todo-list').appendChild(item);
    document.querySelector('.input').value = "";
    
    attachEventListener(item);
})

const attachEventListener = (item) => {
    //Delete Item from list
    const removeBtn = item.querySelector('.delete');
        removeBtn.addEventListener('click', (e) => {
        console.log("deleted",e.path[2].className);
        console.log("item", item);

        document.querySelector('.todo-list').removeChild(e.path[2]);

        let todoItems = JSON.parse(localStorage.getItem("list"));
        todoItems.forEach((item) => {
            if (item === e.path[2].className) {
                const newTodoItems = todoItems.filter(
                    (item) => item != e.path[2].className
                );
                localStorage.setItem("list", JSON.stringify(newTodoItems));
            }
        })
    })
    // Mark item as done
    const doneBtn = item.querySelector('#done');
    doneBtn.addEventListener('change', (e) => {
        console.log(e);
        if (e.path[1].style.textDecoration != "line-through") {
            e.path[1].style.textDecoration = "line-through"
        } else {
            e.path[1].style.textDecoration = ""
        }
    })
    //Clear whole list
    const deleteALL = document.querySelector('.clear');
    deleteALL.addEventListener('click', (e) => {
        
        localStorage.removeItem("list");
        document.querySelector('.todo-list').innerHTML = '';

    })
}

