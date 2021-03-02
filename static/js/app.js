$(document).ready(function() {
    //Add List Funtion
    function addList(inputName) {

        $(".todo__all-list").append("<div class='todo__single-list'></div>");
        let $singleList = $(".todo__single-list:last");
        $singleList.append("<input class='todo__checkbox' type='checkbox'>");
        $singleList.append("<input class='todo__input' type='text' disabled=true></input>");
        $(".todo__single-list:last .todo__input").val(inputName);
        saveLocalTodo(inputName);
        $singleList.append("<button class='todo__complate-btn'><i class='fa fa-check'></i></buttton>");
        $singleList.append("<button class='todo__edit-btn'><i class='fa fa-edit'></i></buttton>");
        $singleList.append("<button class='todo__delete-btn'><i class='fa fa-trash'></i></buttton>");

        location.reload();
    }


    //Show all data LocalStorage
    function showLocalTodo() {

        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        for (let index = 0; index < todos.length; index++) {

            $(".todo__all-list").append("<div class='todo__single-list'></div>");
            let $singleList = $(".todo__single-list:last");
            $singleList.append("<input class='todo__checkbox' type='checkbox'>");
            $singleList.append("<input class='todo__input' type='text' disabled=true></input>");
            $(".todo__single-list:last .todo__input").val(todos[index]);
            $singleList.append("<button class='todo__complate-btn'><i class='fa fa-check'></i></buttton>");
            $singleList.append("<button class='todo__edit-btn'><i class='fa fa-edit'></i></buttton>");
            $singleList.append("<button class='todo__delete-btn'><i class='fa fa-trash'></i></buttton>");

            $(".todo__delete-btn").click(function() {
                const inputName = $(this).parent().find('.todo__input').val();
                $(this).parent().addClass('todo__single-list_fall');
                removeLocalTodo(inputName);
                $(this).parent().one('transitionend', function() {
                    $(this).remove();
                });

            });


            $(".todo__complate-btn").click(function() {
                $(this).parent().addClass('todo__single-list_complated');
            });
            $(".todo__complate-btn").dblclick(function() {
                $(this).parent().removeClass('todo__single-list_complated');
            });

            $(".todo__edit-btn").click(function() {
                const inputName = $(this).parent().find('.todo__input').val();
                var userName = prompt("Enter : ", inputName);
                if (userName === "") {
                    alert("Empty edit value.....");
                } else {
                    $(this).parent().find('.todo__input').val(userName);
                }
                editLocalTodo(inputName, userName);
            });

            $("#filter").change(function() {
                filterTodo(event);
            });

            $('.todo__checkbox').click(function() {
                checkSelectAll(todo__alllist)
            });

            $('.todo__check-checkall').click(function() {
                selectAll(inputcheckbox)
            });

            $(".todo__filter-checkall").change(function() {
                checked(todo__filtercheckall)
            });
        }

    }

    //Add data LocalStorage
    function saveLocalTodo(inputName) {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        todos.push(inputName);
        localStorage.setItem('todos', JSON.stringify(todos));

    }

    //Remove data LocalStorage
    function removeLocalTodo(inputName) {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.splice(todos.indexOf(inputName), 1);
        localStorage.setItem('todos', JSON.stringify(todos));

    }

    //Edit data LocalStorage
    function editLocalTodo(inputName, userName) {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.splice(todos.indexOf(inputName), 1, userName);
        localStorage.setItem('todos', JSON.stringify(todos));
    }



    $('#insert').click(function() {
        let inputName = $('#inputbox').val();
        if (inputbox === "") {
            event.preventDefault();
            alert("Please enter your name ...");
        } else {
            event.preventDefault();
            addList(inputName);
            $('#inputbox').val('');
        }
    });

    $(document).ready(showLocalTodo);

});

var todo__alllist = document.querySelector('.todo__all-list');
var todo__filtercheckall = document.querySelector('.todo__filter-checkall');
var inputcheckbox = document.getElementById('input-checkbox');

//Filter data complate and uncomplate
function filterTodo(e) {
    const todos = todo__alllist.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'complated':
                if (todo.classList.contains('todo__single-list_complated')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncomplated':
                if (!todo.classList.contains('todo__single-list_complated')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });

}
//Checkbox to all data delete/compalte/uncompalte
function checked(item) {
    let cmtbybox = todo__alllist.childNodes;
    switch (item.value) {
        case 'delete':
            cmtbybox.forEach(item => {
                if (item.childNodes[0].checked) {
                    item.classList.add("todo__single-list_fall");
                    inputcheckbox.checked = false;
                    removeLocalTodo(item);
                    item.addEventListener('transitionend', function() {
                        item.remove();
                    });
                }
                todo__filtercheckall.value = "";
            });
            break;
        case 'completed':
            cmtbybox.forEach(item => {
                if (item.childNodes[0].checked) {
                    if (item.classList.contains("todo__single-list_complated")) {
                        item.children[0].checked = false;
                        inputcheckbox.checked = false;
                    } else {
                        item.classList.toggle("todo__single-list_complated");
                        item.children[0].checked = false;
                        inputcheckbox.checked = false;
                    }
                }
                todo__filtercheckall.value = "";
            });
            break;
        case 'uncomplated':
            cmtbybox.forEach(item => {
                if (item.childNodes[0].checked) {
                    if (!item.classList.contains("todo__single-list_complated")) {
                        item.children[0].checked = false;
                        inputcheckbox.checked = false;
                    } else {
                        item.classList.toggle("todo__single-list_complated");
                        item.children[0].checked = false;
                        inputcheckbox.checked = false;
                    }
                }
                todo__filtercheckall.value = "";
            });
            break;
    }
}

//Select all checkbox
function selectAll(item) {

    let selectbox = todo__alllist.childNodes;
    if (selectbox.length === 0) {
        item.checked = false
        alert("No Data Available...");
    } else {
        if (item.checked) {
            selectbox.forEach(item => {
                item.children[0].checked = true;
            })
        }
        if (item.checked === false) {
            selectbox.forEach(item => {
                item.children[0].checked = false;
            })
        }
    }

}

//check all check box select 
function checkSelectAll(item) {
    let selectbox = item.childNodes;
    let count = 0;
    selectbox.forEach(item => {
        if (item.children[0].checked === true) {
            count++
        }
    });
    if (selectbox.length == count) {
        inputcheckbox.checked = true;
    } else {
        inputcheckbox.checked = false;
    }
}

// const openModal = document.querySelector('.open-modal');
// const closeModal = document.querySelector('.close-modal');
// const apply = document.querySelector('.apply');
// const dialog = document.querySelector('dialog');
// const input = document.querySelector('input');
// const output = document.querySelector('output');

// input.addEventListener('change', (e) => {
//     apply.value = e.target.value;
// });

// openModal.addEventListener('click', () => {
//     dialog.showModal();
// });

// dialog.addEventListener('close', () => {
//     output.value = dialog.returnValue;
// });