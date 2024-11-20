import data from './data.json'with{type:'json'};
console.log(data[1].treatedBy)

let commonItems = null;

function updateResultArea(commonItems){
    const resultArea = document.getElementById('result-area');
    //const relatedItems = document.getElementById('related-items');
    resultArea.innerHTML = '';
    //relatedItems.innerHTML = '';
    if(commonItems && commonItems.size >0){
        const list = document.createElement('ul');
        Array.from(commonItems).forEach(item =>{
            const listItem = document.createElement('li');
            listItem.textContent = item;
            list.appendChild(listItem);
        });
        resultArea.appendChild(list);

        findRelatedItems(commonItems);
    }else{
        resultArea.textContent = 'No Common Items';
    }
}

function findRelatedItems(commonItems) {
    const relatedArea = document.getElementById('related-items');
    
    
    // Clear previous content in the related area
    relatedArea.innerHTML = '';

    // A set to store related items
    const relatedItems = new Set();

    // Iterate through the data to find related items
    data.forEach(entry => {
        if (commonItems.has(entry.Magic8ers)) {
            entry.alsoOpens.forEach(item => relatedItems.add(item));
         } 
    });

    if (relatedItems.size > 0) {
        // Create a new unordered list for the related items
        const list = document.createElement('ul');
        Array.from(relatedItems).forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item; // Add text to the list item
            list.appendChild(listItem); // Append the item to the list
        });
        relatedArea.appendChild(list); // Add the list to the related area
    } else {
        relatedArea.textContent = 'No Related Items';
    }
}



function handleButtonClick(button, dataIndex){
    button.clickCount = (button.clickCount + 1) % 3;
    
    if (button.clickCount === 1) {
        button.style.backgroundColor = 'blue';
        
    } else if (button.clickCount === 2) {
       button.style.backgroundColor = 'red';

        const canOpen=new Set(Array.isArray(data[dataIndex].treatedBy) ? data[dataIndex].treatedBy : []);
                if(commonItems == null){
            commonItems = canOpen;
        } else{
            commonItems = new Set([...commonItems].filter(item=>canOpen.has(item)));
        }
        updateResultArea(commonItems);
    }
     else {
        button.style.backgroundColor = '';
        const activeButtons = Array.from(document.querySelectorAll('button')).filter(
            btn=>btn.clickCount ==2
        );

        if (activeButtons.length ==0){
            commonItems= null;
        } else{
            commonItems = activeButtons.reduce((acc,btn)=>{
                const currentCanOpen = new Set(data[btn.dataset.index].treatedBy);
                return new Set([...acc].filter(item=>currentCanOpen.has(item)));
            
            }, new Set(data[activeButtons[0].dataset.index].treatedBy));
        }
        updateResultArea(commonItems);
    }
    console.log(button.clickCount);
}
//pupulating buttons on html

for(let i=0; i<data.length-24 ; i++){
    const buttonName = data[i].name;
    const newButton = document.createElement('button');
    newButton.textContent = buttonName;
    newButton.dataset.index=i;
    const container = document.getElementById('button-container');
    container.appendChild(newButton);

    newButton.clickCount = 0;
    newButton.addEventListener('click', () => handleButtonClick(newButton,i))
    {
       
      };
}


document.getElementById('reset').addEventListener('click', () => {
    // Reset button colors and click count
    document.querySelectorAll('button').forEach(button => {
      button.style.backgroundColor = '';
      button.clickCount = 0;
      const resultArea = document.getElementById('result-area');
    const relatedItems = document.getElementById('related-items');
    resultArea.innerHTML = '';
    relatedItems.innerHTML = '';
    });})