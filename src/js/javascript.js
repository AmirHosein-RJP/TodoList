const input = document.querySelector('.input>div>input')
const btn = document.querySelector('.input>div>i')
const todoUL = document.querySelector('.todolist>div>ul')
const total = document.getElementsByClassName('total')[0]
const completed = document.getElementsByClassName('completed')[0]
const pending = document.getElementsByClassName('pending')[0]

let date = new Date()
date = date.getDate() + '/' + (date.getMonth() + 1)


let num = 0
let pendingNum = 0
let completedNum = 0

total.innerText = num + ' total,'

btn.addEventListener('click', () => {
    if(input.value != ''){
        num++
        pendingNum++
        total.innerText = pendingNum + ' total,'
        pending.innerText = num + ' pending'
        let todoLI = document.createElement('li')
        todoLI.innerHTML = `
            <span class="num" data-number="${num}" >${num}</span>
            
            <span class="task" data-taskClicked="off" data-edit="off">
            <span class="value" onmouseenter="taskenter(this)" onmouseleave="taskleave(this)" onclick="taskclick(this)" >${input.value}</span>
            </span>
            
            <span class="others">
                <span class="date">${date}</span>
                <span class="tick">
                    <i class="fa-solid fa-check" onclick="taskStatus(this)" data-clicked="off"></i>
                </span>
                <span class="delete">
                    <i class="fa-solid fa-trash-can delete" onclick="deleteLI(this)" ></i>
                </span>
            </span> 
        `
        todoUL.appendChild(todoLI)
        input.value = null
        input.focus()
    }  
})

input.addEventListener('keypress', (inp)=>{
    if(inp.key === "Enter"){
        btn.click()
        
        
    }
})

const deleteLI = (x) => {   
    
    let numIT = x.parentElement.parentElement.previousElementSibling.previousElementSibling.innerHTML
    let statusclk = x.parentElement.previousElementSibling.children[0].getAttribute('data-clicked')
    
    const li = document.querySelectorAll('.todolist>div>ul>li')
    li.forEach((s) => {   
        let value = parseFloat(s.children[0].innerText)
        if( value > numIT){
            value--

            s.children[0].innerHTML = value
        }
    })
    if(statusclk == 'off'){
        pendingNum--
    }
    else if(statusclk == 'on'){
        completedNum--
    }
    num--
    total.innerText = num + ' total,'
    pending.innerText = pendingNum + ' pending'
    completed.innerText = completedNum + ' completed,' 
    x.parentElement.parentElement.parentElement.remove()
}

const taskStatus = (ts) => {
    let clicked = ts.getAttribute('data-clicked') 
    let taskclicked = ts.parentElement.parentElement.previousElementSibling.getAttribute('data-taskClicked')
    
    
    
        if(clicked == 'off' && taskclicked == 'off'){
            ts.setAttribute('data-clicked', 'on')
            ts.classList.add('clickedhover')
            ts.parentElement.previousElementSibling.style.textDecoration = '2px line-through #33E6CE'
            ts.parentElement.previousElementSibling.style.color = '#5a5e5ec1'
            ts.parentElement.parentElement.previousElementSibling.style.textDecoration = '2px line-through #33E6CE'
            ts.parentElement.parentElement.previousElementSibling.style.color = '#5a5e5ec1'
            pendingNum--
            pending.innerText = pendingNum + ' pending'
            completedNum++
            completed.innerText = completedNum + ' completed,'

        }
        else if(clicked == 'on' && taskclicked == 'off'){
            ts.setAttribute('data-clicked', 'off')
            ts.classList.remove('clickedhover')
            ts.parentElement.previousElementSibling.style.textDecoration = ''
            ts.parentElement.previousElementSibling.style.color = '#5a5e5e'
            ts.parentElement.parentElement.previousElementSibling.style.textDecoration = ''
            ts.parentElement.parentElement.previousElementSibling.style.color = '#5a5e5e' 
            pendingNum++
            pending.innerText = pendingNum + ' pending'
            completedNum--
            completed.innerText = completedNum + ' completed,'
        }
}

const taskenter = (te) => {
    let tickclicked = te.parentElement.nextElementSibling.children[1].children[0].getAttribute('data-clicked')
    console.log('fdsafasdfsadff');
    
    let editclicked = te.parentElement.getAttribute('data-edit')
    
    
    if(tickclicked == 'off' && editclicked != 'on'){
        te.setAttribute('data-value', te.innerText)
        let tlvalue = te.getAttribute('data-value')
        te.innerText = null
        let editor = document.createElement('span')
        editor.innerHTML='edit' + `
        <i class="fa-regular fa-pen-to-square" id="i"></i>
        `
        te.style.color = '#FF3333'
        te.appendChild(editor)

    }


}

const taskleave = (tl) => {
    let tickclicked = tl.parentElement.nextElementSibling.children[1].children[0].getAttribute('data-clicked')
    let editclicked = tl.parentElement.getAttribute('data-edit')

    if(tickclicked == 'off' && editclicked == 'off'){
        tl.innerHTML = null
        let tlvalue = tl.getAttribute('data-value')
        tl.style.color = '#5a5e5e'
        tl.innerHTML = tlvalue
    }



}


const taskclick = (tc) => {
    let tcClicked = tc.parentElement.getAttribute('data-taskClicked')
    
    if(tcClicked == 'off'){
        let value = tc.getAttribute('data-value')
        tc.parentElement.setAttribute('data-value', value)
        let inp = document.createElement('input')
        inp.setAttribute('onkeypress', 'inpclk(this, event)')
        inp.setAttribute('type', 'text')
        inp.setAttribute('placeholder', value)
        tc.parentElement.appendChild(inp)
        tc.parentElement.setAttribute('data-edit', 'on')
        tc.nextElementSibling.focus()
        let btn = document.createElement('button')
        btn.setAttribute('onclick', 'btnclk(this)')
        btn.innerHTML= `
            <i class="fa-solid fa-check""></i>
        `
        tc.parentElement.appendChild(btn)
        tc.parentElement.setAttribute('data-taskClicked', 'on')
        tc.parentElement.style.color = '#5a5e5e'
        tc.remove()
    }     

}


const btnclk = (btn)=>{
    let inpvalue = btn.previousElementSibling.value
    if(inpvalue == ''){
        btn.children[0].style.color = '#FF3333'
        btn.style.border = '1px solid #FF3333'
        btn.style.animation = 'error .3s ease-in-out'
    }
    else{
        let span = document.createElement('span')
        btn.parentElement.appendChild(span)
        span.classList.add('value')
        span.setAttribute('onmouseenter', 'taskenter(this)')
        span.setAttribute('onmouseleave', 'taskleave(this)')
        span.setAttribute('onclick', 'taskclick(this)')
        span.innerHTML = inpvalue
        btn.parentElement.setAttribute('data-taskClicked', 'off')
        btn.parentElement.setAttribute('data-edit', 'off')
        btn.previousElementSibling.remove()
        btn.remove()
    }
}


const inpclk = (e,event)=>{;
    
    if (event.key === "Enter") {
        e.nextElementSibling.click()
    }
    
}


