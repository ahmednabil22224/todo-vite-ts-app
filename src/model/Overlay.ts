// ------------------Create overLay--------------------
const OverLay= () => {
    if(document.querySelector(".overlay")) console.log("ahmed nabil");
    const overLayDiv= document.createElement('div') as HTMLDivElement;
    overLayDiv.className= 'overlay';
    
    const messageDiv= document.createElement('div') as HTMLDivElement;
    messageDiv.className= 'message';
    messageDiv.innerHTML=  `
                                <div>Are you sure to update item?</div>
                                <input class='update-input' type='text' value=""/>
                                <div>
                                    <button class="yes">Yes</button>
                                    <button class="no">No</button>
                                </div>

                            `

    overLayDiv.appendChild(messageDiv);
    document.getElementById('app')?.appendChild(overLayDiv);
}
    

export default OverLay;