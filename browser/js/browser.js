const submitBtn = document.querySelector('#submit-btn');
const todosDiv = document.querySelector('.todos');


const outputToDos = (data) => {
    todosDiv.innerHTML = '';

    if (!data.length) {
        todosDiv.innerHTML = '<p>No ToDos Added Yet.</p>'
    };


    data.forEach((currObj, currIndex) => {
        const html = `
            <div class="todo">
                <h3>${currObj.text}</h3>
                <button data-id="${currObj.id}">Delete</button>
            </div>
        `;
        todosDiv.insertAdjacentHTML('beforeend', html);
    });
};

const getTodos = () => {
    fetch('/api/todos')
        .then(res => res.json())
        .then(todos => {
            outputToDos(todos);
        });
};

const addTodo = (event) => {
    const input = document.querySelector('input[name="todo"]');
    event.preventDefault();
    const value = input.value;
    const data = {
        text: value
    }


    fetch('/api/todos', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(todos => {
            input.value = '';
            outputToDos(todos);
        });
};


const deleteTodo = (e) => {
    const el = e.target;

    if (el.tagName === 'BUTTON') {
        const id = el.dataset.id;
        const data = {
            id: parseInt(id)
        }
        fetch('api/todos', {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(todosArr => outputToDos(todosArr));
    }
}


getTodos();

submitBtn.addEventListener('click', addTodo);
todosDiv.addEventListener('click', deleteTodo);