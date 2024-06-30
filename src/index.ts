import "./modal.css";
import "./radio.css";
import "./style.css";
import MicroModal from 'micromodal';


// type interface  
interface ProjectData {
    amount: number;
    number_of_backer: number;
    target: number;
    days_left?: number | null
}

const totalElement = document.querySelector('#total') as HTMLSpanElement
const targetElement = document.querySelector('#target') as HTMLSpanElement
const backerElement = document.querySelector('#backer') as HTMLSpanElement
const days_leftElement = document.querySelector('#days_left') as HTMLSpanElement

// initial project data

const data: ProjectData = {
    amount: 200000,
    number_of_backer: 4000,
    target: 600000,
    days_left: 50
}

function increment_backer() {
    data.number_of_backer = + 1
    // return data.number_of_backer
}

function addBacking(amount: number){
    // this function will get called when the backing as been completed
    data.amount += amount;

}

function progress_bar() {
    const progress_bar = document.querySelector('.progress > div') as HTMLDivElement;

    let progress = (data.amount / data.target) * 100;

    progress_bar.style.width = progress + '%';
}

function updateHtml(){
    // this function will be clled when the user updte or mke  bcking
    progress_bar()
    totalElement.innerHTML = data.amount.toString()
    backerElement.innerHTML = data.number_of_backer.toString()
}

function pledge_input(parent: HTMLElement) {
    const divWrapper = document.createElement('div') as HTMLDivElement;
    divWrapper.classList.add('extra-content');
    divWrapper.innerHTML = `
      
        <span>Enter your pledge</span>

       <div class='pledge--item_flex'>
            <div class="input-with-icon">
            <input type='text'class='extra-content--input_field' placeholder=''>
            <i class="fas fa-usd"></i>
       </div>
        <button class='button button--cyan' type="submit" id='continue'>Continue</button>
       
    `;

    parent.appendChild(divWrapper);

    // Prevent click events on the input field from bubbling up to the parent
    divWrapper.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation();

        const _target = e.target as HTMLButtonElement

        if (_target.id == 'continue') {

            e.preventDefault()

            const input = document.querySelector('.extra-content--input_field') as HTMLInputElement
            if (input.value == "") {
                input.style.border = '1px red solid';
                return
            }

            addBacking(Number(input.value));
            // increase number of backers
            increment_backer()

            updateHtml()

            MicroModal.close('modal-1');
            MicroModal.show('modal-2')
        }
        // console.log(e.target)
    });
}


// naviation script
const navigationButton: HTMLButtonElement = document.querySelector('.menu')

navigationButton.addEventListener('click', e => {
    const navItems: HTMLUListElement = document.querySelector('.navigation--group')
    navItems.classList.toggle('active')
})


const pledgeOptions: NodeListOf<HTMLDivElement> = document.querySelectorAll('.modal--pledge_item')

// add event to all pledgeOptions
pledgeOptions.forEach(pledgeOption => {
    pledgeOption.addEventListener('click', (e: MouseEvent) => {
        // e.stopPropagation();

        // console.log(e.target)

        // console.log("click pledge", e.currentTarget)
        // add border to the clicked elee
        const elem = e.currentTarget as HTMLElement

        // remove from others 
        pledgeOptions.forEach(pledgeOption => pledgeOption.style.border = '1px gray solid')
        // remove extra
        pledgeOptions.forEach(pledgeOption => {
            // parent
            const parent = pledgeOption
            const child = pledgeOption.querySelector('.extra-content')
            // console.log(child)
            if (child) {
                parent.removeChild(child)
            }
            // pledgeOption.removeChild(document.querySelector('.extra-content')).remove()
        })

        // add to current
        elem.style.border = '1px hsl(176, 50%, 47%) solid';

        // display the input field
        pledge_input(elem)

        // Access the radio button within the current target
        const radioButton = elem.querySelector('input[type="radio"]') as HTMLInputElement;

        // Check if the radio button exists
        if (radioButton) {
            // Do something with the radio button
            radioButton.checked = true; // For example, check the radio button
        }
    })
})

MicroModal.init({
    onShow: modal => console.info(`${modal.id} is shown`), // [1]
    onClose: modal => console.info(`${modal.id} is hidden`), // [2]
    openClass: 'is-open', // [5]
});

// close the final modal

const finishBtn = document.querySelector('#finishBtn') as HTMLButtonElement

finishBtn.addEventListener('click', (e: MouseEvent) => {
    console.log('click on the got it button')
    e.stopPropagation();

    MicroModal.close('modal-2')
})


// TODO: chnge to domcontent loded
window.addEventListener('load', (e: Event) => {
    totalElement.innerHTML = `$${data.amount.toString()}`
    backerElement.innerHTML = `${data.number_of_backer.toString()}`
    days_leftElement.innerHTML = `${data.days_left.toString()}`
    targetElement.innerHTML = `$${data.target.toString()}`
})