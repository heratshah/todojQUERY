$(document).ready(function() {
    //Add List Funtion
    function addList(input) {

        $(".todo__all-list").append("<div class='todo__single-list'></div>");

        const jsinglel = $(".todo__single-list:last");

        jsinglel.append("<input class='todo__checkbox' type='checkbox'>");

        jsinglel.append("<input class='todo__input' type='text' disabled=true></input>");

        $(".todo__single-list:last .todo__input").val(input);
        //$(".todo__single-list:last .todo__input").text(input);
        //saveLocalTodo(input);

        jsinglel.append("<button class='todo__complate-btn'><i class='fa fa-check'></i></buttton>");

        jsinglel.append("<button class='todo__edit-btn'><i class='fa fa-edit'></i></buttton>");

        jsinglel.append("<button class='todo__delete-btn'><i class='fa fa-trash'></i></buttton>");


        $(".todo__delete-btn").click(function() {
            $(this).parent().addClass('todo__single-list_fall');
            //let user = $(this).parent().find('.todo__input').val();
            //removeLocalTodo(user);
            $(this).parent().one('transitionend', function() {
                $(this).remove();
            });
        });

        $(".todo__complate-btn").click(function() {
            $(this).parent().addClass('todo__single-list_complated');
            const par = $(this).parent().find('.todo__input').val();
        });
        $(".todo__complate-btn").dblclick(function() {
            $(this).parent().removeClass('todo__single-list_complated');
        });

        $(".todo__edit-btn").click(function() {
            const par = $(this).parent().find('.todo__input').val();
            var user = prompt("Enter : ", par);
            if (user === "") {
                alert("Empty edit value.....");
            } else {
                $(this).parent().find('.todo__input').val(user);
            }
            //editLocalTodo(par);
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



        //location.reload();
    }


    //Edit List Funtion

    //Remove List Funtion

    //Complate List Funtion




    //Show all data LocalStorage
    function showLocalTodo() {

        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        for (let index = todos.length; index > 0; index--) {

            $(".todo__all-list").append("<div class='todo__single-list'></div>");

            const jsinglel = $(".todo__single-list:last");

            jsinglel.append("<input class='todo__checkbox' type='checkbox'>");

            jsinglel.append("<input class='todo__input' type='text' disabled=true></input>");

            $(".todo__single-list:last .todo__input").val(todos[index - 1]);
            //$(".todo__single-list:last .todo__input").text(todos[index - 1]);

            jsinglel.append("<button class='todo__complate-btn'><i class='fa fa-check'></i></buttton>");

            //$(".todo__single-list:last").append("<button class='todo__edit-btn'><i class='fa fa-edit'></i></buttton>");

            jsinglel.append("<button class='todo__delete-btn'><i class='fa fa-trash'></i></buttton>");

            $(".todo__delete-btn").click(function() {
                $(this).parent().addClass('todo__single-list_fall');
                var rem = $(this).parent().children('.todo__input').val();
                console.log(rem);
                //removeLocalTodo(rem);
                $(this).parent().one('transitionend', function() {
                    $(this).remove();
                    location.reload();
                });
            });

            $(".todo__complate-btn").click(function() {
                $(this).parent().addClass('todo__single-list_complated');
                const par = $(this).parent().find('.todo__input').val();
                console.log(par);
            });
            $(".todo__complate-btn").dblclick(function() {
                $(this).parent().removeClass('todo__single-list_complated');
            });

            $(".todo__edit-btn").dblclick(function() {
                $(this).parent().removeClass('todo__single-list_complated');
                const par = $(this).parent().find('.todo__input').val();
                editLocalTodo(par);
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
    function saveLocalTodo(input) {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        todos.push(input);
        localStorage.setItem('todos', JSON.stringify(todos));

    }

    //Remove data LocalStorage
    function removeLocalTodo(input) {

        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        //const todoIndex = todo.children[1].value;
        todos.splice(todos.indexOf(input), 1);
        localStorage.setItem("todos", JSON.stringify(todos));

    }

    //Edit data LocalStorage
    function editLocalTodo(todo) {

        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        //let todoIndex = todo.children[1].value;
        var user = prompt("Enter : ", todo);
        if (user === "") {
            alert("Empty edit value.....");
        } else {
            todos.splice(todos.indexOf(todo), 1, user);
            localStorage.setItem('todos', JSON.stringify(todos));
        }

    }





    $('#insert').click(function() {
        var inputbox = $('#inputbox').val();
        if (inputbox === "") {
            event.preventDefault();
            alert("Please enter your name ...");
        } else {
            event.preventDefault();
            addList(inputbox);
            //alert("Add done ...");
            $('#inputbox').val('');
        }
    });

    //$(document).ready(showLocalTodo);
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
                    item.addEventListener('transitionend', function() {
                        item.remove();
                    });
                }
                todo__filtercheckall.value = "";
            }, this);
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